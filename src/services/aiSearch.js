const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

if (!GROQ_API_KEY) {
  console.warn('Missing VITE_GROQ_API_KEY. Add it to .env file.');
}

async function callGroq(systemPrompt, userMessage) {
  if (!GROQ_API_KEY) return null;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.warn('Groq API error:', response.status, err);
      return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.warn('Groq fetch failed:', error);
    return null;
  }
}

export async function parseSearchQuery(userQuery) {
  const systemPrompt = `You are a job search assistant. Parse the user's natural language query into structured search parameters.

Respond ONLY with a valid JSON object (no markdown, no code fences, no extra text) with these exact fields:
{
  "keywords": "1-3 word job title or skill keywords for searching",
  "location": "location if mentioned, otherwise null",
  "remote": true or false or null,
  "experience": "Entry Level" or "Mid Level" or "Senior" or "Lead" or "Executive" or null,
  "salary_min": number or null,
  "job_type": "Full-time" or "Part-time" or "Contract" or "Internship" or null,
  "search_summary": "One sentence describing what the user is looking for"
}

Rules:
- Extract the most important 1-3 word keywords for job search
- "remote" = true if they want remote, false if on-site, null if no preference
- Map experience levels: junior/entry → "Entry Level", senior/sr → "Senior", lead/principal → "Lead"
- salary_min should be a number like 150000 (not a string)
- Return ONLY the JSON object`;

  const result = await callGroq(systemPrompt, `Parse this job search query: "${userQuery}"`);

  if (result) {
    try {
      let text = result.trim();
      text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');
      const parsed = JSON.parse(text);
      return {
        keywords: parsed.keywords || userQuery,
        location: parsed.location || null,
        remote: parsed.remote ?? null,
        experience: parsed.experience || null,
        salaryMin: parsed.salary_min || null,
        jobType: parsed.job_type || null,
        summary: parsed.search_summary || `Searching for: ${userQuery}`,
      };
    } catch (e) {
      console.warn('Groq response parse error:', e);
    }
  }

  return parseSearchQueryFallback(userQuery);
}

export async function generateJobInsights(query, results) {
  if (!results.length) return null;

  const jobSummaries = results.slice(0, 10).map((j, i) =>
    `${i + 1}. ${j.title} at ${j.company} - ${j.location} (${j.remote ? 'Remote' : 'On-site'})${j.salary ? ' - ' + j.salary : ''}`
  ).join('\n');

  const systemPrompt = `You are a job market analyst. Analyze the search results and provide brief, factual insights.
Respond ONLY with a valid JSON object (no markdown, no code fences):
{
  "summary": "One sentence summary",
  "insights": ["insight 1", "insight 2", "insight 3"],
  "recommendation": "One actionable tip"
}
Keep it concise and based on actual data.`;

  const result = await callGroq(systemPrompt,
    `Query: "${query}"\n\nResults:\n${jobSummaries}`
  );

  if (result) {
    try {
      let text = result.trim();
      text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '');
      return JSON.parse(text);
    } catch (e) {
      console.warn('Groq insights parse error:', e);
    }
  }

  return generateInsightsFallback(query, results);
}

function parseSearchQueryFallback(query) {
  const lower = query.toLowerCase();

  let remote = null;
  if (lower.includes('remote')) remote = true;
  if (lower.includes('on-site') || lower.includes('onsite') || lower.includes('office')) remote = false;

  let experience = null;
  if (lower.includes('senior') || lower.includes('sr.') || lower.includes('sr ')) experience = 'Senior';
  if (lower.includes('junior') || lower.includes('entry') || lower.includes('intern')) experience = 'Entry Level';
  if (lower.includes('lead') || lower.includes('principal')) experience = 'Lead';
  if (lower.includes('executive') || lower.includes('director') || lower.includes('vp')) experience = 'Executive';

  const salaryMatch = lower.match(/\$?([\d,]+)k?\b/);
  const salaryMin = salaryMatch ? parseInt(salaryMatch[1].replace(/,/g, '')) * (lower.includes('k') ? 1000 : (parseInt(salaryMatch[1]) < 1000 ? 1000 : 1)) : null;

  let jobType = null;
  if (lower.includes('part-time') || lower.includes('part time')) jobType = 'Part-time';
  if (lower.includes('contract')) jobType = 'Contract';
  if (lower.includes('intern')) jobType = 'Internship';

  const stopWords = new Set(['i', 'want', 'to', 'find', 'a', 'an', 'the', 'job', 'jobs', 'role', 'roles',
    'position', 'positions', 'work', 'looking', 'for', 'search', 'show', 'me', 'get', 'with',
    'that', 'have', 'has', 'and', 'or', 'but', 'is', 'are', 'remote', 'senior', 'junior',
    'entry', 'lead', 'executive', 'part-time', 'contract', 'intern', 'salary', 'pay']);

  const keywords = query.split(/\s+/).filter(w => !stopWords.has(w.toLowerCase()) && w.length > 1).join(' ');

  return {
    keywords: keywords || query,
    location: null,
    remote,
    experience,
    salaryMin,
    jobType,
    summary: `Searching for: ${query}`,
  };
}

function generateInsightsFallback(query, results) {
  const remoteCount = results.filter(r => r.remote).length;
  const withSalary = results.filter(r => r.salary).length;
  const companies = [...new Set(results.map(r => r.company))];

  return {
    summary: `Found ${results.length} positions matching your search.`,
    insights: [
      results.length > 0 ? `${Math.round(remoteCount / results.length * 100)}% offer remote work` : 'No results found',
      withSalary > 0 ? `${withSalary} jobs include salary information` : 'Salary data not available for most listings',
      `From ${companies.length} different companies`,
    ],
    recommendation: results.length > 10
      ? 'Try adding location or experience level to narrow results.'
      : results.length > 0
        ? 'Consider broadening your keywords for more options.'
        : 'Try different or simpler search terms.',
  };
}
