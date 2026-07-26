import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, LogIn, Sparkles, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const interestOptions = [
  'Frontend', 'Backend', 'Full Stack', 'DevOps', 'Data Science',
  'Machine Learning', 'Mobile', 'UI/UX Design', 'Product Management',
  'Cloud', 'Cybersecurity', 'AI', 'React', 'Python', 'JavaScript',
  'Remote', 'Startups', 'Enterprise',
];

export default function SignInPage() {
  const { user, signInWithGoogle, setInterests } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [step, setStep] = useState(user ? 'interests' : 'signin');
  const [selected, setSelected] = useState(user?.interests || []);
  const [loading, setLoading] = useState(false);

  if (user && step === 'signin') setStep('interests');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signInWithGoogle();
    setStep('interests');
    setLoading(false);
  };

  const toggleInterest = (item) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleComplete = () => {
    setInterests(selected);
    navigate(from, { replace: true });
  };

  const handleSkip = () => {
    setInterests([]);
    navigate(from, { replace: true });
  };

  if (step === 'interests') {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-white rounded-3xl border border-surface-100 p-8 shadow-xl"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-surface-900 text-center mb-2">What are you looking for?</h2>
          <p className="text-sm text-surface-500 text-center mb-6">
            Select your interests so we can notify you about matching jobs.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {interestOptions.map((item) => (
              <button
                key={item}
                onClick={() => toggleInterest(item)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selected.includes(item)
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                    : 'bg-surface-50 text-surface-600 hover:bg-violet-50 hover:text-violet-700 border border-surface-100'
                }`}
              >
                {selected.includes(item) && <Check className="w-3.5 h-3.5 inline mr-1" />}
                {item}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={handleSkip} className="flex-1 px-5 py-3 rounded-xl border border-surface-200 text-surface-600 text-sm font-medium hover:bg-surface-50 transition-colors">
              Skip
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25 active:scale-[0.98]"
            >
              {selected.length > 0 ? `Save & Continue (${selected.length})` : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl border border-surface-100 p-8 shadow-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center mx-auto mb-5 shadow-lg">
            <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-surface-900 mb-2">Welcome to JobPilot</h1>
          <p className="text-sm text-surface-500 mb-8">
            Sign in to save jobs, get alerts, and personalize your search.
          </p>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border-2 border-surface-200 text-surface-700 font-medium hover:border-primary-200 hover:bg-primary-50 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-surface-300 border-t-primary-600 rounded-full animate-spin" />
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>

          <p className="text-xs text-surface-400 mt-6">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-primary-600 hover:underline">Terms</a> and{' '}
            <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
