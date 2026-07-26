import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, Brain, Globe, ArrowRight,
  Sparkles, Code, BarChart3, Shield, Rocket, Bookmark, Bell, Moon
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../contexts/AuthContext';

const features = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'AI-Powered Search',
    description: 'Describe your ideal job in natural language. Our AI understands context, skills, and preferences to find perfect matches.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: '8 Job Sources',
    description: 'Aggregated from TheMuse, Remotive, RemoteOK, Jobicy, Arbeitnow, Adzuna, JobsPipe, and Greenhouse. Every listing links directly to the original source.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Bookmark className="w-6 h-6" />,
    title: 'Save & Organize',
    description: 'Create an account to save jobs, set interests, and get notified about matching opportunities.',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Smart Alerts',
    description: 'Set your interests during sign-up and receive job alerts when roles match your preferences.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Apply Directly',
    description: 'Click "Apply Now" and go straight to the employer\'s application page. No middleman.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <Moon className="w-6 h-6" />,
    title: 'Dark Mode',
    description: 'Switch between light and dark themes in your settings for comfortable browsing day or night.',
    gradient: 'from-slate-500 to-slate-700',
  },
];

const aiSuggestions = [
  { text: 'Senior React developer remote', icon: 'code' },
  { text: 'Machine learning engineer $150K+', icon: 'brain' },
  { text: 'Entry level data scientist', icon: 'chart' },
  { text: 'Product manager at startups', icon: 'rocket' },
];

const iconMap = {
  code: <Code className="w-5 h-5" />,
  brain: <Brain className="w-5 h-5" />,
  chart: <BarChart3 className="w-5 h-5" />,
  rocket: <Rocket className="w-5 h-5" />,
};

export default function HomePage() {
  const { user } = useAuth();
  const handleHeroSearch = (searchQuery) => {
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-transparent to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              8 Job Sources · AI-Powered · Free
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-900 leading-[1.1] mb-5"
            >
              Find Your Dream Job
              <br />
              <span className="text-gradient">Powered by AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-surface-500 max-w-xl mx-auto"
            >
              Search across 8 job platforms using natural language. Save favorites, set interests, and get notified when matching roles appear.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <SearchBar large onSearch={handleHeroSearch} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            <span className="text-sm text-surface-400 font-medium">Try:</span>
            {aiSuggestions.map((suggestion) => (
              <Link
                key={suggestion.text}
                to={`/search?q=${encodeURIComponent(suggestion.text)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-surface-100 text-sm text-surface-600 hover:border-primary-200 hover:text-primary-700 hover:shadow-md transition-all group"
              >
                <span className="text-primary-400 group-hover:text-primary-600 transition-colors">
                  {iconMap[suggestion.icon]}
                </span>
                {suggestion.text}
              </Link>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: 'Job Sources', value: '8' },
              { label: 'AI Engine', value: 'Groq' },
              { label: 'Search Mode', value: 'Natural' },
              { label: 'Cost', value: 'Free' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-white/60 border border-surface-100 backdrop-blur-sm">
                <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-surface-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4"
            >
              Why JobPilot?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-surface-500 max-w-lg mx-auto"
            >
              Real jobs, real sources, powered by AI. No fake data, no mock listings.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white border border-surface-100 hover:shadow-xl hover:shadow-primary-500/5 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-primary-50/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">How It Works</h2>
            <p className="text-surface-500">Three simple steps to your next career move</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Describe What You Want', desc: 'Type naturally: "Senior Python developer, remote, $160K+". Groq AI parses your intent.', icon: <Search className="w-6 h-6" /> },
              { step: '02', title: 'Real Results from 8 Sources', desc: 'We fetch real, live job listings from TheMuse, Remotive, RemoteOK, Greenhouse, and more.', icon: <Globe className="w-6 h-6" /> },
              { step: '03', title: 'Save, Track & Apply', desc: 'Sign in to save jobs, set interests for alerts, and apply directly to the employer.', icon: <Bookmark className="w-6 h-6" /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center p-8 rounded-2xl bg-white border border-surface-100"
              >
                <div className="text-6xl font-black text-surface-50 mb-4">{item.step}</div>
                <div className="w-14 h-14 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{item.title}</h3>
                <p className="text-sm text-surface-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-12 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/30 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Find Your Next Role?</h2>
              <p className="text-primary-100 mb-8 max-w-lg mx-auto">
                Search across 8 job platforms with AI. Sign in to save jobs and get notified about matching roles.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-all shadow-xl shadow-primary-900/20 active:scale-[0.98]"
                >
                  Start Searching
                  <ArrowRight className="w-5 h-5" />
                </Link>
                {!user && (
                  <Link
                    to="/signin"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all active:scale-[0.98]"
                  >
                    Sign In Free
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
