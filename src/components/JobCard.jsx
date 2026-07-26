import { motion } from 'framer-motion';
import { Clock, Heart, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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
  system: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
};

const companyColors = [
  'from-blue-500 to-blue-600', 'from-indigo-500 to-indigo-600',
  'from-slate-500 to-slate-600', 'from-amber-500 to-amber-600',
  'from-cyan-500 to-cyan-600', 'from-red-500 to-red-600',
  'from-green-500 to-green-600', 'from-violet-500 to-violet-600',
  'from-pink-500 to-pink-600', 'from-teal-500 to-teal-600',
];

export default function JobCard({ job, index = 0, compact = false, onSelect }) {
  const sc = sourceColors[job.source] || sourceColors.direct;
  const gradientClass = companyColors[(job.companyId || 0) % companyColors.length];
  const { user, toggleBookmark, isSaved } = useAuth();
  const saved = isSaved(job.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
      whileHover={{ y: -2 }}
      className="group relative bg-white rounded-2xl border border-surface-100 hover:border-primary-200 p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/5"
      onClick={() => onSelect?.(job)}
    >
      <div className="flex items-start gap-4">
        {/* Company Logo or Initial */}
        <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden shadow-lg">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-full h-full object-contain bg-white"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className={`w-full h-full bg-gradient-to-br ${gradientClass} items-center justify-center text-white font-bold text-lg ${job.companyLogo ? 'hidden' : 'flex'}`}
          >
            {(job.company || '?')[0]}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-surface-900 group-hover:text-primary-700 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-surface-600 font-medium">{job.company}</span>
                <span className="text-surface-300">·</span>
                <span className="text-sm text-surface-500">{job.location}</span>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); if (user) toggleBookmark(job); }}
              className={`p-2 rounded-lg transition-colors ${
                saved
                  ? 'text-red-500 bg-red-50'
                  : 'text-surface-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-red-500' : ''}`} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 text-xs font-medium">
              {job.type}
            </span>
            {job.experience && job.experience !== 'Mid Level' && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-accent-400/10 text-accent-600 text-xs font-medium">
                {job.experience}
              </span>
            )}
            {job.remote && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium">
                Remote
              </span>
            )}
            {job.salary && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold">
                {job.salary}
              </span>
            )}
          </div>

          {!compact && (
            <p className="mt-3 text-sm text-surface-500 line-clamp-2 leading-relaxed">
              {job.description?.replace(/<[^>]*>/g, '').substring(0, 200)}...
            </p>
          )}

          {job.tags?.length > 0 && !compact && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {job.tags.slice(0, 5).map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-surface-50 text-surface-500 text-[11px] font-medium border border-surface-100">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-surface-400">
                <Clock className="w-3.5 h-3.5" />
                {job.posted}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${sc.bg} ${sc.text} border ${sc.border}`}>
                {job.source}
              </span>
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-600 text-white text-[11px] font-medium hover:bg-primary-700 transition-colors opacity-0 group-hover:opacity-100"
              >
                Apply <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
