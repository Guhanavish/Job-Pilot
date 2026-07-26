const USER_KEY = 'jobpilot_user';
const BOOKMARKS_KEY = 'jobpilot_bookmarks';

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function storeUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}

export function getBookmarks() {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function addBookmark(job) {
  const bookmarks = getBookmarks();
  if (!bookmarks.some(b => b.id === job.id)) {
    bookmarks.unshift({ ...job, savedAt: new Date().toISOString() });
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }
  return bookmarks;
}

export function removeBookmark(jobId) {
  const bookmarks = getBookmarks().filter(b => b.id !== jobId);
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  return bookmarks;
}

export function isBookmarked(jobId) {
  return getBookmarks().some(b => b.id === jobId);
}

export function updateInterests(interests) {
  const user = getStoredUser();
  if (user) {
    user.interests = interests;
    storeUser(user);
  }
}

export function getTheme() {
  return localStorage.getItem('jobpilot_theme') || 'light';
}

export function setTheme(theme) {
  localStorage.setItem('jobpilot_theme', theme);
}
