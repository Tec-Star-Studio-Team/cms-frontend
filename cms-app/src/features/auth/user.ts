export type Role = "admin" | "editor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthSession {
  token: string;
  user: User;
}
