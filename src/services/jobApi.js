const THEMUSE_API = 'https://www.themuse.com/api/public/jobs';
const REMOTIVE_API = 'https://remotive.com/api/remote-jobs';
const ARBEITNOW_API = 'https://www.arbeitnow.com/api/job-board-api';
const REMOTEOK_API = 'https://remoteok.com/api';
const JOBICY_API = 'https://jobicy.com/api/v2/remote-jobs';
const ADZUNA_APP_ID = '6bdd0368';
const ADZUNA_API_KEY = '68bede7c14a3874fd8ba2d14a22d22a5';
const ADZUNA_API = 'https://api.adzuna.com/v1/api/jobs';
const JOBSPIPE_API = 'https://api.jobspipe.dev/v1/jobs/search';
const JOBSPIPE_KEY = 'jp_live_IaYeDmeNLyIywIMqlbGZxltFrZOvTwSgALHGguKBuvaMyYoZdlcZAnkpHftxwKTv';
const GREENHOUSE_BOARDS = ['stripe', 'airbnb', 'gitlab', 'dropbox', 'asana'];

export async function searchJobs(query, page = 1) {
  const keywords = extractKeywords(query);

  const [museResults, remotiveResults, arbeitResults, remoteokResults, jobicyResults, adzunaResults, jobspipeResults, greenhouseResults] = await Promise.allSettled([
    fetchTheMuse(keywords, page),
    fetchRemotive(keywords),
    fetchArbeitnow(page),
    fetchRemoteOK(),
    fetchJobicy(keywords),
    fetchAdzuna(keywords, page),
    fetchJobsPipe(keywords),
    fetchGreenhouse(keywords),
  ]);

  let allJobs = [
    ...(museResults.status === 'fulfilled' ? museResults.value : []),
    ...(remotiveResults.status === 'fulfilled' ? remotiveResults.value : []),
    ...(arbeitResults.status === 'fulfilled' ? arbeitResults.value : []),
    ...(remoteokResults.status === 'fulfilled' ? remoteokResults.value : []),
    ...(jobicyResults.status === 'fulfilled' ? jobicyResults.value : []),
    ...(adzunaResults.status === 'fulfilled' ? adzunaResults.value : []),
    ...(jobspipeResults.status === 'fulfilled' ? jobspipeResults.value : []),
    ...(greenhouseResults.status === 'fulfilled' ? greenhouseResults.value : []),
  ];

  allJobs = allJobs.map(job => ({
    ...job,
    _relevance: calculateRelevance(job, keywords),
  }));

  allJobs = allJobs.filter(job => job._relevance > 0);
  allJobs.sort((a, b) => b._relevance - a._relevance);

  return allJobs;
}

function extractKeywords(query) {
  const stopWords = new Set([
    'i', 'want', 'to', 'find', 'a', 'an', 'the', 'job', 'jobs', 'role', 'roles',
    'position', 'positions', 'work', 'looking', 'for', 'search', 'show', 'me',
    'get', 'with', 'that', 'have', 'has', 'and', 'or', 'but', 'is', 'are',
    'was', 'were', 'will', 'be', 'from', 'on', 'in', 'at', 'by', 'of', 'type',
    'remote', 'senior', 'junior', 'entry', 'lead', 'executive', 'part-time',
    'contract', 'intern', 'above', 'over', 'than', 'salary', 'pay',
  ]);

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(w => !stopWords.has(w) && w.length > 1);
}

function calculateRelevance(job, keywords) {
  if (keywords.length === 0) return 1;

  let score = 0;
  const titleLower = (job.title || '').toLowerCase();
  const companyLower = (job.company || '').toLowerCase();
  const descLower = (job.description || '').toLowerCase();
  const tagsLower = (job.tags || []).join(' ').toLowerCase();
  const locationLower = (job.location || '').toLowerCase();

  const queryStr = keywords.join(' ');

  for (const kw of keywords) {
    if (titleLower.includes(kw)) score += 10;
    if (tagsLower.includes(kw)) score += 6;
    if (companyLower.includes(kw)) score += 4;
    if (locationLower.includes(kw)) score += 3;
    if (descLower.includes(kw)) score += 1;
  }

  if (titleLower.includes(queryStr)) score += 20;

  const titleWords = titleLower.split(/\s+/);
  const matchingWords = keywords.filter(k => titleWords.some(tw => tw.includes(k) || k.includes(tw)));
  if (matchingWords.length >= 2) score += 15;
  if (matchingWords.length >= 3) score += 10;

  return score;
}

async function fetchTheMuse(keywords, page) {
  try {
    const query = encodeURIComponent(keywords.join(' '));
    const response = await fetch(`${THEMUSE_API}?page=${page}&page_size=50&query=${query}`);
    if (!response.ok) throw new Error('TheMuse API error');
    const data = await response.json();

    return (data.results || []).map(job => ({
      id: `muse-${job.id}`,
      title: job.name || 'Untitled',
      company: job.company?.name || 'Unknown',
      companyLogo: null,
      location: job.locations?.[0]?.name || 'Not specified',
      country: extractCountry(job.locations?.[0]?.name || ''),
      remote: (job.locations || []).some(l => (l.name || '').toLowerCase().includes('remote')),
      type: mapMuseType(job.type),
      experience: mapMuseLevel(job.levels),
      salary: null,
      posted: formatRelativeDate(job.publication_date),
      description: stripHtml(job.contents || ''),
      requirements: extractRequirements(job.contents || ''),
      benefits: [],
      tags: (job.categories || []).map(c => c.name).filter(Boolean),
      source: 'TheMuse',
      applyUrl: job.refs?.landing_page || `https://www.themuse.com/jobs/${job.id}`,
      sourceUrl: job.refs?.landing_page || `https://www.themuse.com/jobs/${job.id}`,
      companyId: job.company?.id || 0,
    }));
  } catch (e) {
    console.warn('TheMuse fetch failed:', e);
    return [];
  }
}

async function fetchRemotive(keywords) {
  try {
    const query = encodeURIComponent(keywords.join(' '));
    const response = await fetch(`${REMOTIVE_API}?search=${query}&limit=50`);
    if (!response.ok) throw new Error('Remotive API error');
    const data = await response.json();

    return (data.jobs || []).map(job => ({
      id: `remotive-${job.id}`,
      title: job.title || 'Untitled',
      company: job.company_name || 'Unknown',
      companyLogo: job.company_logo_url || job.company_logo || null,
      location: job.candidate_required_location || 'Worldwide',
      country: extractCountry(job.candidate_required_location || ''),
      remote: true,
      type: mapRemotiveType(job.job_type),
      experience: inferExperience(job.title, job.description),
      salary: job.salary || null,
      posted: formatRelativeDate(job.publication_date),
      description: stripHtml(job.description || ''),
      requirements: extractRequirements(job.description || ''),
      benefits: extractBenefits(job.description || ''),
      tags: (job.tags || []).slice(0, 8),
      source: 'Remotive',
      applyUrl: job.url || '#',
      sourceUrl: job.url || '#',
      companyId: hashString(job.company_name || ''),
    }));
  } catch (e) {
    console.warn('Remotive fetch failed:', e);
    return [];
  }
}

async function fetchArbeitnow(page) {
  try {
    const response = await fetch(`${ARBEITNOW_API}?page=${page}`);
    if (!response.ok) throw new Error('Arbeitnow API error');
    const data = await response.json();

    return (data.data || []).map(job => ({
      id: `arbeitnow-${job.slug || job.id}`,
      title: job.title || 'Untitled',
      company: job.company_name || 'Unknown',
      companyLogo: job.company_logo || null,
      location: job.location || 'Not specified',
      country: extractCountry(job.location || ''),
      remote: job.remote || false,
      type: 'Full-time',
      experience: inferExperience(job.title, job.description),
      salary: null,
      posted: formatRelativeDate(job.created_at ? new Date(job.created_at * 1000).toISOString() : null),
      description: stripHtml(job.description || ''),
      requirements: extractRequirements(job.description || ''),
      benefits: [],
      tags: (job.tags || []).slice(0, 8),
      source: 'Arbeitnow',
      applyUrl: job.url || `https://www.arbeitnow.com/jobs/${job.slug}`,
      sourceUrl: job.url || `https://www.arbeitnow.com/jobs/${job.slug}`,
      companyId: hashString(job.company_name || ''),
    }));
  } catch (e) {
    console.warn('Arbeitnow fetch failed:', e);
    return [];
  }
}

async function fetchRemoteOK() {
  try {
    const response = await fetch(REMOTEOK_API);
    if (!response.ok) throw new Error('RemoteOK API error');
    const data = await response.json();

    const jobs = Array.isArray(data) ? data.filter(j => j && j.id) : [];

    return jobs.map(job => ({
      id: `remoteok-${job.id}`,
      title: job.position || 'Untitled',
      company: job.company || 'Unknown',
      companyLogo: job.logo || job.company_logo || null,
      location: job.location || 'Remote',
      country: extractCountry(job.location || ''),
      remote: true,
      type: 'Full-time',
      experience: inferExperience(job.position, job.description),
      salary: job.salary_min && job.salary_max && job.salary_max > 0
        ? `$${Number(job.salary_min).toLocaleString()} - $${Number(job.salary_max).toLocaleString()}`
        : null,
      posted: formatRelativeDate(job.date || job.epoch ? new Date((job.epoch || 0) * 1000).toISOString() : null),
      description: stripHtml(job.description || ''),
      requirements: extractRequirements(job.description || ''),
      benefits: [],
      tags: (job.tags || []).slice(0, 8),
      source: 'RemoteOK',
      applyUrl: job.apply_url || job.url || `https://remoteok.com/remote-jobs/${job.slug}`,
      sourceUrl: job.url || `https://remoteok.com/remote-jobs/${job.slug}`,
      companyId: hashString(job.company || ''),
    }));
  } catch (e) {
    console.warn('RemoteOK fetch failed:', e);
    return [];
  }
}

async function fetchJobicy(keywords) {
  try {
    const query = encodeURIComponent(keywords.join(' '));
    const response = await fetch(`${JOBICY_API}?count=50&search=${query}`);
    if (!response.ok) throw new Error('Jobicy API error');
    const data = await response.json();

    return (data.jobs || []).map(job => ({
      id: `jobicy-${job.id}`,
      title: job.jobTitle || 'Untitled',
      company: job.companyName || 'Unknown',
      companyLogo: job.companyLogo || null,
      location: job.jobGeo || 'Worldwide',
      country: extractCountry(job.jobGeo || ''),
      remote: true,
      type: job.jobType?.[0] || 'Full-time',
      experience: job.jobLevel || inferExperience(job.jobTitle, job.jobDescription),
      salary: job.salaryMin && job.salaryMax
        ? `$${Number(job.salaryMin).toLocaleString()} - $${Number(job.salaryMax).toLocaleString()} ${job.salaryCurrency || 'USD'}/${job.salaryPeriod || 'yearly'}`
        : null,
      posted: formatRelativeDate(job.pubDate),
      description: stripHtml(job.jobDescription || job.jobExcerpt || ''),
      requirements: extractRequirements(job.jobDescription || ''),
      benefits: [],
      tags: (job.jobIndustry || []).slice(0, 6),
      source: 'Jobicy',
      applyUrl: job.url || `https://jobicy.com/jobs/${job.jobSlug}`,
      sourceUrl: job.url || `https://jobicy.com/jobs/${job.jobSlug}`,
      companyId: hashString(job.companyName || ''),
    }));
  } catch (e) {
    console.warn('Jobicy fetch failed:', e);
    return [];
  }
}

async function fetchAdzuna(keywords, page) {
  try {
    const query = encodeURIComponent(keywords.join(' '));
    const url = `${ADZUNA_API}/us/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=50&what=${query}&content-type=application/json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Adzuna API error');
    const data = await response.json();

    return (data.results || []).map(job => ({
      id: `adzuna-${job.id}`,
      title: job.title || 'Untitled',
      company: job.company?.display_name || 'Unknown',
      companyLogo: null,
      location: job.location?.display_name || 'Not specified',
      country: extractCountry(job.location?.display_name || ''),
      remote: (job.location?.display_name || '').toLowerCase().includes('remote'),
      type: mapAdzunaType(job.contract_type, job.contract_time),
      experience: inferExperience(job.title, job.description),
      salary: job.salary_min && job.salary_max
        ? `$${Number(job.salary_min).toLocaleString('en-US', { maximumFractionDigits: 0 })} - $${Number(job.salary_max).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
        : null,
      posted: formatRelativeDate(job.created),
      description: stripHtml(job.description || ''),
      requirements: extractRequirements(job.description || ''),
      benefits: [],
      tags: job.category?.label ? [job.category.label] : [],
      source: 'Adzuna',
      applyUrl: job.redirect_url || '#',
      sourceUrl: job.redirect_url || '#',
      companyId: hashString(job.company?.display_name || ''),
    }));
  } catch (e) {
    console.warn('Adzuna fetch failed:', e);
    return [];
  }
}

async function fetchJobsPipe(keywords) {
  try {
    const body = { job_title_or: keywords, limit: 50 };
    const response = await fetch(JOBSPIPE_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${JOBSPIPE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error('JobsPipe API error');
    const data = await response.json();

    return (data.data || []).map(job => ({
      id: `jobspipe-${job.id}`,
      title: job.job_title || 'Untitled',
      company: job.company || 'Unknown',
      companyLogo: null,
      location: job.short_location || job.location || 'Not specified',
      country: job.country || mapCountryCode(job.country_code) || extractCountry(job.short_location || job.location || ''),
      remote: job.remote === true || job.hybrid === true,
      type: mapJobsPipeType(job.employment_statuses),
      experience: mapJobsPipeSeniority(job.seniority),
      salary: job.salary_string || (job.min_annual_salary_usd && job.max_annual_salary_usd
        ? `$${Number(job.min_annual_salary_usd).toLocaleString('en-US', { maximumFractionDigits: 0 })} - $${Number(job.max_annual_salary_usd).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
        : null),
      posted: formatRelativeDate(job.date_posted),
      description: stripHtml(job.description || ''),
      requirements: extractRequirements(job.description || ''),
      benefits: [],
      tags: (job.technology_slugs || []).slice(0, 8),
      source: 'JobsPipe',
      applyUrl: job.source_url || job.url || '#',
      sourceUrl: job.source_url || job.url || '#',
      companyId: hashString(job.company || ''),
    }));
  } catch (e) {
    console.warn('JobsPipe fetch failed:', e);
    return [];
  }
}

async function fetchGreenhouse(keywords) {
  try {
    const results = await Promise.allSettled(
      GREENHOUSE_BOARDS.map(token =>
        fetch(`https://boards-api.greenhouse.io/v1/boards/${token}/jobs?content=true`)
          .then(r => { if (!r.ok) throw new Error(`${token} failed`); return r.json(); })
          .then(d => (d.jobs || []).slice(0, 10))
      )
    );

    const jobs = [];
    for (const result of results) {
      if (result.status !== 'fulfilled') continue;
      for (const job of result.value) {
        const title = (job.title || '').toLowerCase();
        const kwMatch = keywords.length === 0 || keywords.some(k => title.includes(k));
        if (!kwMatch) continue;

        const locationName = job.location?.name || 'Not specified';
        const office = job.offices?.[0];
        let country = null;
        if (office?.name) {
          country = office.name.length <= 3
            ? mapCountryCode(office.name)
            : office.name;
        }
        if (!country) country = extractCountry(locationName);

        jobs.push({
          id: `greenhouse-${job.internal_job_id || job.id}`,
          title: job.title || 'Untitled',
          company: job.company_name || 'Unknown',
          companyLogo: null,
          location: locationName,
          country,
          remote: locationName.toLowerCase().includes('remote'),
          type: 'Full-time',
          experience: inferExperience(job.title, job.content || ''),
          salary: null,
          posted: formatRelativeDate(job.first_published),
          description: stripHtml(job.content || ''),
          requirements: extractRequirements(job.content || ''),
          benefits: [],
          tags: (job.departments || []).map(d => d.name).filter(Boolean).slice(0, 4),
          source: 'Greenhouse',
          applyUrl: job.absolute_url || '#',
          sourceUrl: job.absolute_url || '#',
          companyId: hashString(job.company_name || ''),
        });
      }
    }
    return jobs;
  } catch (e) {
    console.warn('Greenhouse fetch failed:', e);
    return [];
  }
}

function mapCountryCode(code) {
  if (!code) return null;
  const map = {
    US: 'United States', UK: 'United Kingdom', IN: 'India', CA: 'Canada',
    AU: 'Australia', DE: 'Germany', FR: 'France', SE: 'Sweden', ES: 'Spain',
    NL: 'Netherlands', IE: 'Ireland', SG: 'Singapore', JP: 'Japan',
    CN: 'China', BR: 'Brazil', MX: 'Mexico', IT: 'Italy', CH: 'Switzerland',
    DK: 'Denmark', NO: 'Norway', FI: 'Finland', BE: 'Belgium', AT: 'Austria',
    PL: 'Poland', PT: 'Portugal', NZ: 'New Zealand', KR: 'South Korea',
    AE: 'UAE', IL: 'Israel', HK: 'Hong Kong', ZA: 'South Africa',
  };
  return map[code.toUpperCase()] || null;
}

function extractCountry(location) {
  if (!location) return null;
  const loc = location.toLowerCase().trim();
  if (loc === 'worldwide' || loc === 'anywhere' || loc === 'remote') return 'Remote';

  const countryMap = {
    'united states': 'United States', 'usa': 'United States',
    'united kingdom': 'United Kingdom', 'england': 'United Kingdom',
    'india': 'India', 'canada': 'Canada', 'australia': 'Australia',
    'germany': 'Germany', 'france': 'France', 'sweden': 'Sweden',
    'spain': 'Spain', 'netherlands': 'Netherlands', 'ireland': 'Ireland',
    'singapore': 'Singapore', 'japan': 'Japan', 'china': 'China',
    'brazil': 'Brazil', 'mexico': 'Mexico', 'italy': 'Italy',
    'switzerland': 'Switzerland', 'denmark': 'Denmark', 'norway': 'Norway',
    'finland': 'Finland', 'belgium': 'Belgium', 'austria': 'Austria',
    'poland': 'Poland', 'portugal': 'Portugal', 'new zealand': 'New Zealand',
    'south korea': 'South Korea', 'uae': 'UAE', 'dubai': 'UAE',
    'israel': 'Israel', 'hong kong': 'Hong Kong', 'south africa': 'South Africa',
  };

  for (const [key, country] of Object.entries(countryMap)) {
    if (loc.includes(key)) return country;
  }

  const statePattern = /\b(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NC|ND|NE|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)\b/i;
  if (statePattern.test(loc)) return 'United States';

  return null;
}

function mapJobsPipeType(employmentStatuses) {
  if (!employmentStatuses || !employmentStatuses.length) return 'Full-time';
  const t = employmentStatuses[0].toLowerCase();
  if (t.includes('full')) return 'Full-time';
  if (t.includes('part')) return 'Part-time';
  if (t.includes('contract') || t.includes('temp')) return 'Contract';
  if (t.includes('intern')) return 'Internship';
  return 'Full-time';
}

function mapJobsPipeSeniority(seniority) {
  if (!seniority) return null;
  const s = seniority.toLowerCase();
  if (s.includes('entry') || s.includes('junior')) return 'Entry Level';
  if (s.includes('senior')) return 'Senior';
  if (s.includes('lead') || s.includes('manager')) return 'Lead';
  if (s.includes('executive') || s.includes('director') || s.includes('vp')) return 'Executive';
  return 'Mid Level';
}

function mapMuseType(type) {
  if (!type) return 'Full-time';
  const t = type.toLowerCase();
  if (t.includes('full')) return 'Full-time';
  if (t.includes('part')) return 'Part-time';
  if (t.includes('contract')) return 'Contract';
  if (t.includes('intern')) return 'Internship';
  return 'Full-time';
}

function mapMuseLevel(levels) {
  if (!levels || !levels.length) return null;
  const name = levels[0]?.name?.toLowerCase() || '';
  if (name.includes('entry') || name.includes('junior')) return 'Entry Level';
  if (name.includes('senior')) return 'Senior';
  if (name.includes('lead') || name.includes('manager')) return 'Lead';
  if (name.includes('executive') || name.includes('director')) return 'Executive';
  return 'Mid Level';
}

function mapRemotiveType(type) {
  if (!type) return 'Full-time';
  const t = type.toLowerCase();
  if (t.includes('full')) return 'Full-time';
  if (t.includes('part')) return 'Part-time';
  if (t.includes('contract') || t.includes('freelance')) return 'Contract';
  if (t.includes('intern')) return 'Internship';
  return 'Full-time';
}

function mapAdzunaType(contractType, contractTime) {
  if (!contractTime && !contractType) return 'Full-time';
  const ct = (contractTime || '').toLowerCase();
  const cy = (contractType || '').toLowerCase();
  if (ct.includes('part')) return 'Part-time';
  if (cy.includes('contract') || cy.includes('temp') || cy.includes('permanent')) return 'Contract';
  if (ct.includes('full')) return 'Full-time';
  return 'Full-time';
}

function inferExperience(title, description) {
  const text = `${title || ''} ${description || ''}`.toLowerCase();
  if (text.includes('intern')) return 'Entry Level';
  if (text.includes('junior') || text.includes('entry level')) return 'Entry Level';
  if (text.includes('lead') || text.includes('principal') || text.includes('head of') || text.includes('director')) return 'Lead';
  if (text.includes('executive') || text.includes('vp ') || text.includes('chief')) return 'Executive';
  if (text.includes('senior') || text.includes('sr.') || text.includes('sr ') || text.includes('staff')) return 'Senior';
  return null;
}

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractRequirements(html) {
  const text = stripHtml(html);
  const reqs = [];

  const lines = text.split(/[.\n]/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length > 10 && trimmed.length < 200) {
      const lower = trimmed.toLowerCase();
      if (
        lower.startsWith('experience') ||
        lower.includes(' required') ||
        lower.includes(' proficiency') ||
        lower.includes(' knowledge of') ||
        lower.includes(' familiarity with') ||
        lower.includes(' ability to') ||
        lower.includes(' years of')
      ) {
        reqs.push(trimmed.charAt(0).toUpperCase() + trimmed.slice(1));
      }
    }
  }

  if (reqs.length === 0) {
    const techKeywords = text.match(
      /\b(React|Angular|Vue|Python|Java|JavaScript|TypeScript|Go|Rust|AWS|Azure|GCP|Docker|Kubernetes|SQL|Node\.js|Machine Learning|DevOps|Terraform|Git|CI\/CD|GraphQL|REST|PostgreSQL|MongoDB|Redis|Swift|Kotlin|Flutter|React Native|Next\.js|Django|Flask|TensorFlow|PyTorch|Linux|Figma|Sketch|Adobe|Photoshop|UI|UX|Design)\b/gi
    ) || [];
    const unique = [...new Set(techKeywords)].slice(0, 6);
    unique.forEach(s => reqs.push(`Experience with ${s}`));
  }

  return reqs.slice(0, 8);
}

function extractBenefits(html) {
  const text = stripHtml(html).toLowerCase();
  const benefits = [];
  const keywords = [
    'health insurance', 'dental', 'vision', '401k', 'pto', 'paid time off',
    'vacation', 'remote work', 'flexible', 'stock options', 'equity', 'bonus',
    'learning budget', 'education', 'gym', 'wellness', 'parental leave',
    'unlimited pto', 'professional development', 'relocation', 'equipment'
  ];

  for (const kw of keywords) {
    if (text.includes(kw)) {
      const cap = kw.charAt(0).toUpperCase() + kw.slice(1);
      if (!benefits.includes(cap)) benefits.push(cap);
    }
  }

  return benefits.slice(0, 6);
}

function formatRelativeDate(dateString) {
  if (!dateString) return 'Recently';
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  } catch {
    return 'Recently';
  }
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}
