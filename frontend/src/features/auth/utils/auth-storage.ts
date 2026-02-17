const AUTH_STORAGE_KEY = 'is_authenticated';

export const authStorage = {
  setAuthenticated: () => localStorage.setItem(AUTH_STORAGE_KEY, 'true'),
  clearAuthenticated: () => localStorage.removeItem(AUTH_STORAGE_KEY),
  isAuthenticated: () => !!localStorage.getItem(AUTH_STORAGE_KEY),
};
