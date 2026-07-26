import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function NotificationPanel({ onSearch }) {
  const { user, notifications } = useAuth();
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
      <button onClick={() => setOpen(!open)} className="relative p-2 rounded-lg text-surface-500 hover:text-surface-700 hover:bg-surface-100 transition-colors">
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-surface-100 shadow-xl shadow-surface-900/10 z-50">
          <div className="px-4 py-3 border-b border-surface-100">
            <h4 className="text-sm font-semibold text-surface-900">Job Alerts</h4>
            <p className="text-xs text-surface-400">Based on your interests</p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-xs text-surface-400">No matching jobs yet</p>
                <p className="text-xs text-surface-300 mt-1">Set your interests in settings</p>
              </div>
            ) : (
              notifications.map((job, i) => (
                <Link
                  key={i}
                  to={`/search?q=${encodeURIComponent(job.title)}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 hover:bg-primary-50 transition-colors border-b border-surface-50 last:border-b-0"
                >
                  <p className="text-sm font-medium text-surface-800 line-clamp-1">{job.title}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{job.company} — {job.location}</p>
                </Link>
              ))
            )}
          </div>
          {user.interests && user.interests.length > 0 && (
            <div className="px-4 py-2.5 border-t border-surface-100 bg-surface-50 rounded-b-2xl">
              <div className="flex flex-wrap gap-1">
                {user.interests.map((int, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-primary-100 text-primary-700 text-[10px] font-medium">{int}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
