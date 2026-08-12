const TOKEN_KEY = "examprep_1234568790Romit";

/**
 * Wraps localStorage with try/catch since it can throw in some contexts
 * (private browsing, storage disabled, etc). This token is sent as an
 * `Authorization: Bearer` header on every request, alongside the httpOnly
 * cookie - the backend accepts either. This is what makes auth work
 * reliably in the packaged Electron build, where cookie persistence across
 * a file:// origin talking to a remote HTTPS API can be inconsistent.
 */
export const tokenStorage = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (token) => {
    try {
      if (token) localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // ignore - falls back to cookie-only auth
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // ignore
    }
  }
};
