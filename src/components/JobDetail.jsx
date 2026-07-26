import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ExternalLink, CheckCircle2, Heart, Share2, Zap, DollarSign, Sparkles, Loader2, FileText } from 'lucide-react';
import { extractSingleJob } from '../services/jobExtractor';
import { useAuth } from '../contexts/AuthContext';

const companyColors = [
  'from-blue-500 to-blue-600', 'from-indigo-500 to-indigo-600',
  'from-slate-500 to-slate-600', 'from-amber-500 to-amber-600',
  'from-cyan-500 to-cyan-600', 'from-red-500 to-red-600',
  'from-green-500 to-green-600', 'from-violet-500 to-violet-600',
  'from-pink-500 to-pink-600', 'from-teal-500 to-teal-600',
];

export default function JobDetail({ job, onClose }) {
  const [extracting, setExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [extractError, setExtractError] = useState(null);
  const { user, toggleBookmark, isSaved } = useAuth();
  const saved = isSaved(job.id);

  if (!job) return null;

  const gradientClass = companyColors[(job.companyId || 0) % companyColors.length];
  const cleanDescription = (job.description || '').replace(/<[^>]*>/g, '').trim();

  const handleExtract = async () => {
    setExtracting(true);
    setExtractError(null);
    setExtractedData(null);

    const rawText = `Title: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location}\nType: ${job.type}\nSalary: ${job.salary || 'Not specified'}\nDescription: ${cleanDescription}\nRequirements: ${(job.requirements || []).join(', ')}\nBenefits: ${(job.benefits || []).join(', ')}`;

    const result = await extractSingleJob(rawText);

    if (result.error) {
      setExtractError(result.error);
    } else {
      setExtractedData(result);
    }
    setExtracting(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-primary-600 to-accent-500 rounded-t-3xl" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative px-6 pt-8 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white shadow-xl flex-shrink-0">
                {job.companyLogo ? (
                  <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white font-bold text-2xl`}>
                    {(job.company || '?')[0]}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{job.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white/80 font-medium">{job.company}</span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/70 text-sm">{job.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 overflow-y-auto max-h-[calc(85vh-200px)]">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-50 text-primary-700 text-sm font-medium">
                <Zap className="w-3.5 h-3.5" /> {job.type}
              </span>
              {job.experience && job.experience !== 'Mid Level' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-400/10 text-accent-600 text-sm font-medium">
                  {job.experience}
                </span>
              )}
              {job.salary && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 text-sm font-semibold">
                  <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                </span>
              )}
              {job.remote && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium">
                  Remote Available
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="text-center p-3 rounded-xl bg-surface-50">
                <Clock className="w-4 h-4 mx-auto text-surface-400 mb-1" />
                <p className="text-xs font-medium text-surface-600">{job.posted}</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-surface-50">
                <ExternalLink className="w-4 h-4 mx-auto text-surface-400 mb-1" />
                <p className="text-xs font-medium text-surface-600 capitalize">via {job.source}</p>
              </div>
            </div>

            {/* AI Extract Button */}
            <div className="mb-6">
              <button
                onClick={handleExtract}
                disabled={extracting}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {extracting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI extracting data...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Clean with AI
                  </>
                )}
              </button>
            </div>

            {extractError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="text-sm text-red-700">Extraction error: {extractError}</p>
              </div>
            )}

            {/* Extracted Data */}
            {extractedData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-violet-600" />
                  <h3 className="text-sm font-semibold text-violet-900 uppercase tracking-wider">AI-Extracted Listing</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-violet-700 w-28 flex-shrink-0">Job Title</span>
                    <span className="text-sm text-surface-800">{extractedData.job_title}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-violet-700 w-28 flex-shrink-0">Company</span>
                    <span className="text-sm text-surface-800">{extractedData.company_name}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-violet-700 w-28 flex-shrink-0">Location</span>
                    <span className="text-sm text-surface-800">{extractedData.location}</span>
                  </div>
                  {extractedData.salary_range && (
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-violet-700 w-28 flex-shrink-0">Salary</span>
                      <span className="text-sm text-surface-800 font-semibold text-amber-700">{extractedData.salary_range}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-violet-700 w-28 flex-shrink-0">Type</span>
                    <span className="text-sm text-surface-800">{extractedData.job_type}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold text-violet-700 w-28 flex-shrink-0">Level</span>
                    <span className="text-sm">{extractedData.experience_level || 'Not specified'}</span>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-violet-200">
                    <span className="text-xs font-semibold text-violet-700 w-28 flex-shrink-0">Summary</span>
                    <p className="text-sm text-surface-600 leading-relaxed">{extractedData.summary}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {!extractedData && !extractError && (
              <>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-3">About the Role</h3>
                  <div className="text-sm text-surface-600 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
                    {cleanDescription}
                  </div>
                </div>

                {job.requirements?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-3">Requirements</h3>
                    <div className="space-y-2">
                      {job.requirements.map((req, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-surface-600">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {job.benefits?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-3">Benefits</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-xs font-medium">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {job.tags?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-surface-900 uppercase tracking-wider mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-surface-100 text-surface-600 text-xs font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="flex gap-3">
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 active:scale-[0.98]"
              >
                Apply Now
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => user && toggleBookmark(job)}
                className={`px-4 py-3 rounded-xl border-2 transition-colors ${
                  saved
                    ? 'border-red-200 bg-red-50 text-red-500'
                    : 'border-surface-200 text-surface-600 hover:border-red-200 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${saved ? 'fill-red-500' : ''}`} />
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: job.title, url: job.applyUrl });
                  } else {
                    navigator.clipboard.writeText(job.applyUrl);
                  }
                }}
                className="px-4 py-3 rounded-xl border-2 border-surface-200 text-surface-600 hover:border-primary-200 hover:text-primary-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
