import type { AuthSession } from "./user";

export interface AuthState {
  session: AuthSession | null;
}

export type AuthAction =
  | { type: "LOGIN"; payload: AuthSession }
  | { type: "LOGOUT" };

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { session: action.payload };
    case "LOGOUT":
      return { session: null };
    default: {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  }
}
