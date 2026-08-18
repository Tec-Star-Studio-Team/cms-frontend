export type Role = "admin" | "editor";

export interface AuthUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
  expiresAt: string; // ISO 8601 date-time string, e.g. "2026-08-18T18:47:20.000Z"
}

export interface LoginCredentials {
  email: string;
  password: string;
}
