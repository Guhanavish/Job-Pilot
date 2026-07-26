import { Link } from 'react-router-dom';
import { Zap, Globe, MessageCircle, Send, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">JobPilot</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              AI-powered job search that connects you with opportunities from 7+ platforms simultaneously.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Globe, href: '/', label: 'Website' },
                { Icon: MessageCircle, href: '/about', label: 'About' },
                { Icon: Send, href: '/search', label: 'Search' },
                { Icon: Mail, href: '/about', label: 'Contact' },
              ].map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  to={href}
                  className="p-2 rounded-lg bg-surface-800 text-surface-400 hover:text-white hover:bg-surface-700 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><Link to="/search" className="text-sm hover:text-white transition-colors">AI Search</Link></li>
              <li><Link to="/search?q=remote+jobs" className="text-sm hover:text-white transition-colors">Remote Jobs</Link></li>
              <li><Link to="/search?q=senior+engineer" className="text-sm hover:text-white transition-colors">Senior Roles</Link></li>
              <li><Link to="/search?q=entry+level" className="text-sm hover:text-white transition-colors">Entry Level</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Sources</h4>
            <ul className="space-y-2.5">
              <li><Link to="/search?q=designer" className="text-sm hover:text-white transition-colors">TheMuse</Link></li>
              <li><Link to="/search?q=developer" className="text-sm hover:text-white transition-colors">Remotive</Link></li>
              <li><Link to="/search?q=engineer" className="text-sm hover:text-white transition-colors">RemoteOK</Link></li>
              <li><Link to="/search?q=manager" className="text-sm hover:text-white transition-colors">Jobicy</Link></li>
              <li><Link to="/search?q=data" className="text-sm hover:text-white transition-colors">Arbeitnow</Link></li>
              <li><Link to="/search" className="text-sm hover:text-white transition-colors">Adzuna</Link></li>
              <li><Link to="/search" className="text-sm hover:text-white transition-colors">JobsPipe</Link></li>
              <li><Link to="/search" className="text-sm hover:text-white transition-colors">Greenhouse</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/search" className="text-sm hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-surface-500">&copy; 2026 JobPilot AI. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-surface-600">
            <Link to="/privacy" className="hover:text-surface-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-surface-400 transition-colors">Terms</Link>
            <Link to="/about" className="hover:text-surface-400 transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
