import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Settings, Moon, Sun, User, Bell, LogOut, Sparkles, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const interestOptions = [
  'Frontend', 'Backend', 'Full Stack', 'DevOps', 'Data Science',
  'Machine Learning', 'Mobile', 'UI/UX Design', 'Product Management',
  'Cloud', 'Cybersecurity', 'AI', 'React', 'Python', 'JavaScript',
  'Remote', 'Startups', 'Enterprise',
];

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut, setInterests } = useAuth();
  const [selected, setSelected] = useState(user?.interests || []);
  const [saved, setSaved] = useState(false);

  const toggleInterest = (item) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSaveInterests = () => {
    setInterests(selected);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-surface-600 to-surface-700 flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-surface-900">Settings</h1>
            <p className="text-sm text-surface-500">Customize your experience</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Account */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-surface-100 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-surface-900">Account</h2>
            </div>
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                      {(user.name || 'U')[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-surface-900">{user.name}</p>
                    <p className="text-xs text-surface-400">{user.email}</p>
                  </div>
                </div>
                <button onClick={signOut} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              <Link to="/signin" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25">
                Sign In to Your Account
              </Link>
            )}
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-surface-100 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-primary-600" /> : <Sun className="w-5 h-5 text-primary-600" />}
              <h2 className="text-lg font-semibold text-surface-900">Appearance</h2>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
              <div>
                <p className="text-sm font-medium text-surface-700">Dark Mode</p>
                <p className="text-xs text-surface-400">{theme === 'dark' ? 'Dark theme active' : 'Light theme active'}</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative w-14 h-7 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary-600' : 'bg-surface-300'}`}
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${theme === 'dark' ? 'translate-x-8' : 'translate-x-1'}`} />
              </button>
            </div>
          </motion.div>

          {/* Job Interests */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-surface-100 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-surface-900">Job Interests</h2>
            </div>
            <p className="text-sm text-surface-500 mb-4">
              Select topics you're interested in. We'll notify you about matching jobs.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {interestOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleInterest(item)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selected.includes(item)
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25'
                      : 'bg-surface-50 text-surface-600 hover:bg-primary-50 hover:text-primary-700 border border-surface-100'
                  }`}
                >
                  {selected.includes(item) && <Check className="w-3.5 h-3.5 inline mr-1" />}
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={handleSaveInterests}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                saved
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25 hover:from-primary-700 hover:to-primary-800'
              }`}
            >
              {saved ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save Interests'}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
