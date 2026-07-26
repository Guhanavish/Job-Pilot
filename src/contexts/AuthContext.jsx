import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth, provider, hasFirebaseConfig } from '../services/firebase';
import {
  getStoredUser, storeUser, clearUser,
  getBookmarks, addBookmark, removeBookmark, isBookmarked as checkBookmarked,
  updateInterests as storeInterests,
} from '../services/userService';

const AuthContext = createContext();

function generateId() {
  return 'demo-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [bookmarks, setBookmarks] = useState(() => getBookmarks());
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (hasFirebaseConfig && auth && provider) {
      try {
        const { signInWithPopup } = await import('firebase/auth');
        const result = await signInWithPopup(auth, provider);
        const fbUser = {
          uid: result.user.uid,
          name: result.user.displayName || 'User',
          email: result.user.email,
          photoURL: result.user.photoURL,
          interests: [],
          joinDate: new Date().toISOString(),
        };
        storeUser(fbUser);
        setUser(fbUser);
        return fbUser;
      } catch (err) {
        console.warn('Firebase auth failed, falling back to demo:', err);
      }
    }
    const demoUser = {
      uid: generateId(),
      name: 'Demo User',
      email: 'demo@jobpilot.app',
      photoURL: null,
      interests: [],
      joinDate: new Date().toISOString(),
    };
    storeUser(demoUser);
    setUser(demoUser);
    return demoUser;
  }, []);

  const signOut = useCallback(() => {
    if (hasFirebaseConfig && auth) {
      import('firebase/auth').then(({ signOut: fbSignOut }) => fbSignOut(auth)).catch(() => {});
    }
    clearUser();
    setUser(null);
    setBookmarks([]);
    setNotifications([]);
  }, []);

  const toggleBookmark = useCallback((job) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.id === job.id);
      if (exists) {
        removeBookmark(job.id);
        return prev.filter(b => b.id !== job.id);
      }
      const updated = addBookmark(job);
      return updated;
    });
  }, []);

  const isSaved = useCallback((jobId) => {
    return bookmarks.some(b => b.id === jobId);
  }, [bookmarks]);

  const setInterests = useCallback((interests) => {
    if (user) {
      storeInterests(interests);
      setUser(prev => prev ? { ...prev, interests } : null);
    }
  }, [user]);

  const checkJobNotifications = useCallback((jobs) => {
    if (!user || !user.interests || user.interests.length === 0) return;
    const interests = user.interests.map(i => i.toLowerCase());
    const matched = jobs.filter(job => {
      const text = `${job.title} ${job.company} ${(job.tags || []).join(' ')} ${job.description || ''}`.toLowerCase();
      return interests.some(i => text.includes(i));
    });
    setNotifications(matched.slice(0, 5));
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user, bookmarks, notifications,
      signInWithGoogle, signOut, toggleBookmark, isSaved, setInterests, checkJobNotifications,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
