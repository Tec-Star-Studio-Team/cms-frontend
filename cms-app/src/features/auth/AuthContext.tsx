import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { authReducer } from "./authReducer";
import { readStoredSession, SESSION_STORAGE_KEY } from "./session";
import { AUTH_UNAUTHORIZED_EVENT } from "./authEvents";
import type { AuthSession } from "./user";

interface AuthContextValue {
  session: AuthSession | null;
  login: (session: AuthSession) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, undefined, () => ({
    session: readStoredSession(),
  }));

  // Keep localStorage in sync with the current session.
  useEffect(() => {
    if (state.session) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state.session));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [state.session]);

  // Automatic logout at the exact expiration moment (already had this).
  useEffect(() => {
    if (!state.session) return;

    const msUntilExpiry =
      new Date(state.session.expiresAt).getTime() - Date.now();

    if (msUntilExpiry <= 0) {
      dispatch({ type: "LOGOUT" });
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch({ type: "LOGOUT" });
    }, msUntilExpiry);

    return () => clearTimeout(timeoutId);
  }, [state.session]);

  // NEW: log out immediately if any API call reports 401 — e.g. the token
  // was revoked server-side before its stated expiration.
  useEffect(() => {
    function handleUnauthorized() {
      dispatch({ type: "LOGOUT" });
    }

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    return () =>
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
  }, []);

  const login = useCallback((session: AuthSession) => {
    dispatch({ type: "LOGIN", payload: session });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  const value = useMemo(
    () => ({ session: state.session, login, logout }),
    [state.session, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
