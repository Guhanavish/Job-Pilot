import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowRight, TrendingUp, Briefcase, Building2, Zap } from 'lucide-react';
const trendingSearches = [
  'AI Engineer', 'React Developer', 'Cloud Architect', 'Data Engineer',
  'Product Designer', 'DevOps Engineer', 'Full Stack Developer', 'Security Analyst'
];

function getLocalSuggestions(q) {
  if (!q || q.length < 2) return [];
  const lower = q.toLowerCase();
  const suggestions = [];
  const roles = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'ML Engineer', 'Product Manager', 'DevOps Engineer', 'UX Designer', 'Cloud Architect', 'Security Engineer', 'QA Engineer'];
  const skills = ['React', 'Python', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'Go', 'Rust', 'Java', 'Swift', 'Kotlin'];

  roles.filter(r => r.toLowerCase().includes(lower)).slice(0, 3).forEach(r => {
    suggestions.push({ type: 'role', text: r, icon: 'briefcase' });
  });
  skills.filter(s => s.toLowerCase().includes(lower)).slice(0, 3).forEach(s => {
    if (!suggestions.find(x => x.text === s)) {
      suggestions.push({ type: 'skill', text: `${s} developer`, icon: 'zap' });
    }
  });
  return suggestions.slice(0, 5);
}

export default function SearchBar({ large = false, initialQuery = '', onSearch }) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length >= 2) {
      setSuggestions(getLocalSuggestions(query));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (text) => {
    setQuery(text);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(text);
    } else {
      navigate(`/search?q=${encodeURIComponent(text)}`);
    }
  };

  const iconMap = {
    briefcase: <Briefcase className="w-4 h-4" />,
    building: <Building2 className="w-4 h-4" />,
    zap: <Zap className="w-4 h-4" />,
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div
          className={`relative flex items-center rounded-2xl border-2 transition-all duration-300 ${
            large ? 'px-6 py-4' : 'px-4 py-3'
          } ${
            isFocused
              ? 'border-primary-400 shadow-xl shadow-primary-500/10 bg-white'
              : 'border-surface-200 bg-white/80 hover:border-surface-300 hover:bg-white'
          }`}
        >
          <Search className={`${large ? 'w-6 h-6' : 'w-5 h-5'} text-surface-400 flex-shrink-0`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { setIsFocused(true); setShowSuggestions(true); }}
            onBlur={() => setIsFocused(false)}
            placeholder="Describe your ideal job in natural language..."
            className={`flex-1 bg-transparent border-none outline-none ml-3 text-surface-900 placeholder:text-surface-400 ${
              large ? 'text-lg' : 'text-base'
            }`}
          />
          <div className="flex items-center gap-2 ml-2">
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-50 text-primary-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">AI</span>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 active:scale-[0.98]"
            >
              {large ? <span className="hidden sm:inline">Search</span> : null}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {showSuggestions && (suggestions.length > 0 || query.length < 2) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl shadow-surface-900/10 border border-surface-100 overflow-hidden z-50"
          >
            {suggestions.length > 0 && (
              <div className="p-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onMouseDown={() => handleSuggestionClick(s.text)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left hover:bg-primary-50 transition-colors group"
                  >
                    <span className="text-primary-500">{iconMap[s.icon] || <Zap className="w-4 h-4" />}</span>
                    <span className="text-sm text-surface-700 group-hover:text-primary-700 font-medium">{s.text}</span>
                    <span className="ml-auto text-xs text-surface-400 capitalize px-2 py-0.5 rounded-full bg-surface-100">{s.type}</span>
                  </button>
                ))}
              </div>
            )}

            {query.length < 2 && (
              <div className="p-4 border-t border-surface-100">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-accent-500" />
                  <span className="text-xs font-semibold text-surface-500 uppercase tracking-wider">Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onMouseDown={() => handleSuggestionClick(term)}
                      className="px-3 py-1.5 rounded-lg bg-surface-50 text-surface-600 text-xs font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors border border-surface-100"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
