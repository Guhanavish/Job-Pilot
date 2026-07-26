import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Bookmark, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-50 hover:bg-surface-100 transition-colors"
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
            {(user.name || 'U')[0]}
          </div>
        )}
        <span className="text-sm font-medium text-surface-700 hidden sm:block max-w-[100px] truncate">{user.name}</span>
        <ChevronDown className="w-3.5 h-3.5 text-surface-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-surface-100 shadow-xl shadow-surface-900/10 py-2 z-50">
          <div className="px-4 py-2 border-b border-surface-100">
            <p className="text-sm font-semibold text-surface-900 truncate">{user.name}</p>
            <p className="text-xs text-surface-400 truncate">{user.email}</p>
          </div>
          <Link to="/bookmarks" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 transition-colors">
            <Bookmark className="w-4 h-4 text-surface-400" /> Saved Jobs
          </Link>
          <Link to="/settings" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 hover:bg-surface-50 transition-colors">
            <Settings className="w-4 h-4 text-surface-400" /> Settings
          </Link>
          <div className="border-t border-surface-100 mt-1 pt-1">
            <button onClick={() => { signOut(); setOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
