import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpDown, Grid, List, Bot, Loader2, AlertCircle, Sparkles, ExternalLink } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import JobDetail from '../components/JobDetail';
import FilterSidebar from '../components/FilterSidebar';
import { searchJobs } from '../services/jobApi';
import { parseSearchQuery, generateJobInsights } from '../services/aiSearch';
import { extractJobListings } from '../services/jobExtractor';
import { useAuth } from '../contexts/AuthContext';

const initialFilters = {
  type: null,
  experience: null,
  remote: null,
  source: null,
  country: null,
  location: null,
};

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const { checkJobNotifications } = useAuth();
  const [filters, setFilters] = useState(initialFilters);
  const [selectedJob, setSelectedJob] = useState(null);
  const [sortOrder, setSortOrder] = useState('relevance');
  const [viewMode, setViewMode] = useState('list');
  const [results, setResults] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchMeta, setSearchMeta] = useState(null);
  const [showExtractor, setShowExtractor] = useState(false);
  const [rawText, setRawText] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [extractedJobs, setExtractedJobs] = useState(null);
  const [extractError, setExtractError] = useState(null);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQuery(q);
    }
  }, [searchParams]);

  const executeSearch = useCallback(async (searchQuery) => {
    if (!searchQuery || !searchQuery.trim()) {
      setResults([]);
      setInsights(null);
      setSearchMeta(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parsed = await parseSearchQuery(searchQuery);
      setSearchMeta(parsed);

      let apiQuery = parsed.keywords;
      if (parsed.location) {
        apiQuery += ` in ${parsed.location}`;
      }

      const jobResults = await searchJobs(apiQuery);
      setResults(jobResults);
      checkJobNotifications(jobResults);

      const aiInsights = await generateJobInsights(searchQuery, jobResults);
      setInsights(aiInsights);
    } catch (err) {
      console.error('Search failed:', err);
      setError(err.message || 'Search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const timer = setTimeout(() => {
        executeSearch(query);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [query, executeSearch]);

  const handleSearch = useCallback((newQuery) => {
    setQuery(newQuery);
    setSearchParams(newQuery ? { q: newQuery } : {});
  }, [setSearchParams]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleExtract = useCallback(async () => {
    if (!rawText.trim()) return;
    setExtracting(true);
    setExtractError(null);
    setExtractedJobs(null);
    try {
      const result = await extractJobListings(rawText);
      if (result.error) {
        setExtractError(result.error);
      } else {
        setExtractedJobs(result.jobs);
      }
    } catch (err) {
      setExtractError(err.message);
    }
    setExtracting(false);
  }, [rawText]);

  const countrySummary = results.reduce((acc, job) => {
    const c = job.country || 'Unknown';
    if (!acc[c]) acc[c] = 0;
    acc[c]++;
    return acc;
  }, {});
  const countries = Object.entries(countrySummary)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  const clientFilteredResults = results.filter(job => {
    if (filters.type && job.type !== filters.type) return false;
    if (filters.experience && job.experience !== filters.experience) return false;
    if (filters.remote === true && !job.remote) return false;
    if (filters.remote === false && job.remote) return false;
    if (filters.source && job.source !== filters.source) return false;
    if (filters.country && (job.country || 'Unknown') !== filters.country) return false;
    return true;
  });

  const sortedResults = [...clientFilteredResults].sort((a, b) => {
    switch (sortOrder) {
      case 'salary':
        return (parseSalaryNum(b.salary) - parseSalaryNum(a.salary));
      case 'date':
        return 0;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar initialQuery={query} onSearch={handleSearch} />
          </div>

          {/* AI Parsed Query */}
          {searchMeta && (
            <div className="max-w-4xl mx-auto mb-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50/50 border border-primary-100">
                <Bot className="w-4 h-4 text-primary-500" />
                <span className="text-xs text-primary-600">{searchMeta.summary}</span>
                {searchMeta.remote !== null && (
                  <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-medium">
                    {searchMeta.remote ? 'Remote' : 'On-site'}
                  </span>
                )}
                {searchMeta.experience && (
                  <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-medium">
                    {searchMeta.experience}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* AI Extractor Toggle */}
          <div className="max-w-4xl mx-auto mb-4">
            <button
              onClick={() => setShowExtractor(!showExtractor)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border border-dashed border-surface-300 hover:border-violet-300 hover:bg-violet-50 text-surface-500 hover:text-violet-700"
            >
              <Sparkles className="w-4 h-4" />
              Paste raw job text to extract with AI
            </button>
          </div>

          {showExtractor && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-4xl mx-auto mb-6"
            >
              <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-600" />
                    <h4 className="font-semibold text-violet-900">AI Job Data Extractor</h4>
                  </div>
                  <button onClick={() => setShowExtractor(false)} className="text-xs text-violet-500 hover:text-violet-700">Close</button>
                </div>
                <p className="text-xs text-violet-600 mb-3">
                  Paste raw HTML or text from any job listing. Groq AI will extract structured data and filter out spam/5+yr exp roles.
                </p>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste job listing text or HTML here..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-violet-200 bg-white text-sm text-surface-700 placeholder:text-surface-400 focus:outline-none focus:border-violet-400 resize-none mb-3"
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExtract}
                    disabled={extracting || !rawText.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium text-sm hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {extracting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {extracting ? 'Extracting...' : 'Extract Jobs'}
                  </button>
                  {extractedJobs && (
                    <span className="text-sm text-violet-700 font-medium">{extractedJobs.length} jobs extracted</span>
                  )}
                </div>

                {extractError && (
                  <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200">
                    <p className="text-sm text-red-700">{extractError}</p>
                  </div>
                )}

                {extractedJobs && extractedJobs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-3"
                  >
                    {extractedJobs.map((job, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white border border-violet-200">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="font-semibold text-surface-900">{job.job_title}</h5>
                            <p className="text-xs text-surface-500">{job.company_name} — {job.location}</p>
                          </div>
                          <div className="flex gap-1.5">
                            <span className="px-2 py-0.5 rounded-md bg-violet-100 text-violet-700 text-[10px] font-semibold">{job.job_type}</span>
                            {job.experience_level && (
                              <span className="px-2 py-0.5 rounded-md bg-accent-400/10 text-accent-600 text-[10px] font-semibold">{job.experience_level}</span>
                            )}
                          </div>
                        </div>
                        {job.salary_range && (
                          <p className="text-xs font-semibold text-amber-700 mb-1">{job.salary_range}</p>
                        )}
                        <p className="text-xs text-surface-600 leading-relaxed">{job.summary}</p>
                        {job.apply_link && job.apply_link !== 'null' && (
                          <a
                            href={job.apply_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-primary-600 hover:text-primary-800"
                          >
                            Apply <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* AI Insight Bar */}
          <AnimatePresence>
            {insights && !loading && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="max-w-4xl mx-auto mb-6"
              >
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary-50 to-accent-400/5 border border-primary-100">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary-800 mb-1">{insights.summary}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {insights.insights?.map((insight, i) => (
                        <span key={i} className="text-xs text-primary-600">• {insight}</span>
                      ))}
                    </div>
                    {insights.recommendation && (
                      <p className="text-xs text-primary-500 mt-2 italic">{insights.recommendation}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          {error && (
            <div className="max-w-4xl mx-auto mb-6">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Toolbar */}
          {query && (
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="text-sm text-surface-500">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                    Searching across platforms...
                  </span>
                ) : (
                  <>
                    <span className="font-semibold text-surface-900">{sortedResults.length}</span> real jobs found
                    {query && (
                      <span> for "<span className="text-primary-600 font-medium">{query}</span>"</span>
                    )}
                  </>
                )}
              </div>
              {!loading && sortedResults.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 rounded-lg bg-white border border-surface-200 text-xs font-medium text-surface-600 focus:outline-none focus:border-primary-300 cursor-pointer"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="salary">Salary</option>
                      <option value="date">Date</option>
                    </select>
                    <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-surface-400 pointer-events-none" />
                  </div>
                  <div className="flex rounded-lg border border-surface-200 overflow-hidden">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-surface-400 hover:text-surface-600'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-surface-400 hover:text-surface-600'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={() => setFilters(initialFilters)}
            resultCount={sortedResults.length}
            countries={countries}
          />

          <div className="flex-1 min-w-0">
            {/* Loading State */}
            {loading && (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-surface-700 mb-2">Searching job platforms...</h3>
                <p className="text-sm text-surface-400">AI is analyzing results from LinkedIn, Indeed, Glassdoor and more</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && query && sortedResults.length === 0 && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-surface-300" />
                </div>
                <h3 className="text-lg font-semibold text-surface-700 mb-2">No jobs found</h3>
                <p className="text-sm text-surface-400 max-w-md mx-auto">
                  Try different keywords or a broader search term.
                </p>
              </motion.div>
            )}

            {/* Initial State */}
            {!loading && !query && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-400/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-surface-700 mb-2">Start your job search</h3>
                <p className="text-sm text-surface-400 max-w-md mx-auto">
                  Type a natural language query above. For example: "Senior React developer remote $150K+"
                </p>
              </motion.div>
            )}

            {/* Results */}
            {!loading && sortedResults.length > 0 && (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {sortedResults.map((job, i) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    index={i}
                    compact={viewMode === 'grid'}
                    onSelect={setSelectedJob}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function parseSalaryNum(salaryStr) {
  if (!salaryStr) return 0;
  const match = salaryStr.match(/\$([\d,]+)/);
  return match ? parseInt(match[1].replace(/,/g, '')) : 0;
}
