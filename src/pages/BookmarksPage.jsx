import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, Search, ExternalLink, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import JobDetail from '../components/JobDetail';

const sourceColors = {
  TheMuse: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Remotive: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  RemoteOK: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  Jobicy: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Arbeitnow: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Adzuna: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  JobsPipe: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  Greenhouse: { bg: 'bg-lime-50', text: 'text-lime-700', border: 'border-lime-200' },
  direct: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
};

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useAuth();
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-lg">
            <Bookmark className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-surface-900">Saved Jobs</h1>
            <p className="text-sm text-surface-500">{bookmarks.length} job{bookmarks.length !== 1 ? 's' : ''} saved</p>
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-surface-300" />
            </div>
            <h3 className="text-lg font-semibold text-surface-700 mb-2">No saved jobs yet</h3>
            <p className="text-sm text-surface-400 mb-6">Start browsing and save jobs you like.</p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold text-sm hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25"
            >
              <Search className="w-4 h-4" /> Search Jobs
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((job, i) => {
              const sc = sourceColors[job.source] || sourceColors.direct;
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-2xl border border-surface-100 p-5 hover:border-primary-200 transition-all cursor-pointer hover:shadow-md"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-surface-900">{job.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-surface-600 font-medium">{job.company}</span>
                        <span className="text-surface-300">·</span>
                        <span className="text-sm text-surface-500">{job.location}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 text-xs font-medium">{job.type}</span>
                        {job.salary && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold">{job.salary}</span>
                        )}
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${sc.bg} ${sc.text} border ${sc.border}`}>
                          {job.source}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-3 text-xs text-surface-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.posted || 'Recently'}</span>
                        {job.savedAt && <span>Saved {new Date(job.savedAt).toLocaleDateString()}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleBookmark(job); }}
                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {selectedJob && <JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
}
