import { motion } from 'framer-motion';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { jobTypes, experienceLevels } from '../data/jobs';

const sources = [
  { id: 'TheMuse', name: 'TheMuse' },
  { id: 'Remotive', name: 'Remotive' },
  { id: 'Arbeitnow', name: 'Arbeitnow' },
  { id: 'RemoteOK', name: 'RemoteOK' },
  { id: 'Jobicy', name: 'Jobicy' },
  { id: 'Adzuna', name: 'Adzuna' },
  { id: 'JobsPipe', name: 'JobsPipe' },
  { id: 'Greenhouse', name: 'Greenhouse' },
];

export default function FilterSidebar({ filters, onFilterChange, onReset, resultCount, countries }) {
  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: filters[key] === value ? null : value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full lg:w-72 flex-shrink-0"
    >
      <div className="sticky top-20 bg-white rounded-2xl border border-surface-100 p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary-600" />
            <h3 className="font-semibold text-surface-900">Filters</h3>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-surface-400 hover:text-primary-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        <div className="text-xs text-surface-400 mb-4 font-medium">{resultCount} results found</div>

        <div className="mb-5">
          <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Job Type</h4>
          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => (
              <button
                key={type}
                onClick={() => updateFilter('type', type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.type === type
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                    : 'bg-surface-50 text-surface-600 hover:bg-primary-50 hover:text-primary-700 border border-surface-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Experience</h4>
          <div className="flex flex-wrap gap-2">
            {experienceLevels.map((level) => (
              <button
                key={level}
                onClick={() => updateFilter('experience', level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.experience === level
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                    : 'bg-surface-50 text-surface-600 hover:bg-primary-50 hover:text-primary-700 border border-surface-100'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Work Mode</h4>
          <div className="flex gap-2">
            {[
              { label: 'Remote', value: true },
              { label: 'On-site', value: false },
            ].map(({ label, value }) => (
              <button
                key={label}
                onClick={() => updateFilter('remote', value)}
                className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filters.remote === value
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                    : 'bg-surface-50 text-surface-600 hover:bg-primary-50 hover:text-primary-700 border border-surface-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {countries && countries.length > 1 && (
          <div className="mb-5">
            <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Country</h4>
            <div className="flex flex-wrap gap-2">
              {countries.map(({ country, count }) => (
                <button
                  key={country}
                  onClick={() => updateFilter('country', country)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filters.country === country
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
                      : 'bg-surface-50 text-surface-600 hover:bg-emerald-50 hover:text-emerald-700 border border-surface-100'
                  }`}
                >
                  {country} <span className="opacity-60">({count})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-5">
          <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Source</h4>
          <div className="space-y-1.5">
            {sources.map((source) => (
              <button
                key={source.id}
                onClick={() => updateFilter('source', source.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  filters.source === source.id
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                    : 'text-surface-600 hover:bg-surface-50'
                }`}
              >
                <span>{source.name}</span>
                {filters.source === source.id && <X className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {Object.values(filters).some(v => v !== null) && (
          <div className="pt-4 border-t border-surface-100">
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(filters).map(([key, value]) => {
                if (value === null) return null;
                const label = key === 'remote' ? (value ? 'Remote' : 'On-site') : String(value);
                return (
                  <span key={key} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 text-xs font-medium">
                    {label}
                    <button onClick={() => updateFilter(key, null)} className="hover:text-primary-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
