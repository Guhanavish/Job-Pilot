const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const EXTRACTION_PROMPT = `You are an expert data extraction AI designed for a job search aggregator. Your role is to analyze raw, messy search results or HTML text and extract precise job listings into a clean, structured JSON format.

INSTRUCTIONS:
1. Review the provided raw input text containing job listings.
2. Extract the key details for every job found.
3. Standardize all data to match the exact JSON schema provided.
4. Filter aggressively: Do NOT include jobs that require more than 5 years of experience, and skip sponsored/spam posts.
5. If a specific field (like salary or company logo) is missing in the text, return "null" for that field rather than inventing information.
6. OUTPUT STRICTLY IN VALID JSON FORMAT. Do not include markdown blocks, introductory greetings, or conversational text.

EXPECTED JSON SCHEMA:
{
  "jobs": [
    {
      "job_title": "String - The official title of the role",
      "company_name": "String - The name of the hiring company",
      "location": "String - City, Country, or 'Remote'",
      "salary_range": "String - E.g., '$80k - $100k' (or null if not stated)",
      "job_type": "String - 'Full-time', 'Part-time', 'Contract', etc.",
      "experience_level": "String - 'Entry-level', 'Mid-level', or 'Senior'",
      "apply_link": "String - URL to the job application",
      "summary": "String - A 2-sentence summary of the main responsibilities"
    }
  ]
}`;

export async function extractJobListings(rawText) {
  if (!GROQ_API_KEY) {
    return { error: 'Groq API key not configured. Add VITE_GROQ_API_KEY to .env' };
  }

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
          { role: 'system', content: EXTRACTION_PROMPT },
          { role: 'user', content: `Extract job listings from this text:\n\n${rawText}` },
        ],
        temperature: 0.1,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return {
        error: `Groq API error (${response.status}): ${err.error?.message || response.statusText}`,
        jobs: [],
      };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    let cleaned = content.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();

    const parsed = JSON.parse(cleaned);

    if (!parsed.jobs || !Array.isArray(parsed.jobs)) {
      return { error: 'Response did not contain a jobs array', raw: cleaned, jobs: [] };
    }

    const filteredJobs = parsed.jobs.filter(job => {
      const title = (job.job_title || '').toLowerCase();
      if (title.includes('sponsor') || title.includes('paid') || title.includes('promoted')) return false;
      const exp = (job.experience_level || '').toLowerCase();
      if (exp.includes('senior') || exp.includes('lead') || exp.includes('principal')) {
        const summary = (job.summary || '').toLowerCase();
        const expMatch = summary.match(/(\d+)\s*(?:\+|\s*to\s*)?\s*years?\s*(?:of\s+)?experience/);
        if (expMatch && parseInt(expMatch[1]) > 5) return false;
      }
      return true;
    });

    return { jobs: filteredJobs, count: filteredJobs.length };
  } catch (error) {
    console.warn('Job extraction failed:', error);
    return { error: error.message, jobs: [] };
  }
}

export async function extractSingleJob(rawText) {
  const result = await extractJobListings(rawText);
  if (result.error) return result;
  return result.jobs?.[0] || { error: 'No job found in the provided text' };
}
