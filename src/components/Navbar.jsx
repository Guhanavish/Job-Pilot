import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Bookmark } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UserMenu from './UserMenu';
import NotificationPanel from './NotificationPanel';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { user, signOut } = useAuth();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">JobPilot</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/search', label: 'Search Jobs' },
              { to: '/about', label: 'About' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  (isHome && to === '/') || location.pathname === to
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user && (
              <Link
                to="/bookmarks"
                className="p-2 rounded-lg text-surface-500 hover:text-surface-700 hover:bg-surface-100 transition-colors"
              >
                <Bookmark className="w-5 h-5" />
              </Link>
            )}
            <NotificationPanel />
            {user ? <UserMenu /> : (
              <Link
                to="/signin"
                className="ml-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-medium hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
              >
                Sign In
              </Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-surface-200"
          >
            <div className="px-4 py-3 space-y-1">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-100">Home</Link>
              <Link to="/search" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-100">Search Jobs</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-100">About</Link>
              {user && (
                <>
                  <Link to="/bookmarks" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-100">Saved Jobs</Link>
                  <Link to="/settings" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-surface-700 hover:bg-surface-100">Settings</Link>
                </>
              )}
              {user ? (
                <button onClick={() => { signOut(); setIsOpen(false); }} className="w-full mt-2 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-medium">Sign Out</button>
              ) : (
                <Link to="/signin" onClick={() => setIsOpen(false)} className="block w-full mt-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-medium text-center">Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
