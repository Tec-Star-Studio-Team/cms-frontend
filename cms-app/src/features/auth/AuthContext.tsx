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
import type { AuthSession } from "./user";

const SESSION_STORAGE_KEY = "cms.session";

function loadStoredSession(): AuthSession | null {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

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
    session: loadStoredSession(),
  }));

  useEffect(() => {
    if (state.session) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state.session));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [state.session]);

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
