import { ApiError } from "@/apiError";
import type { AuthSession, LoginCredentials, User } from "./user";

const API_URL = import.meta.env.VITE_API_URL;

interface UserRecord extends User {
  password: string;
}

export async function login({
  email,
  password,
}: LoginCredentials): Promise<AuthSession> {
  const query = new URLSearchParams({ email, password });
  const response = await fetch(`${API_URL}/users?${query.toString()}`);

  if (!response.ok) {
    throw new ApiError("Unable to connect to the server", response.status);
  }

  const matches: UserRecord[] = await response.json();
  const record = matches[0];

  if (!record) {
    throw new ApiError("Invalid email or password", 401);
  }

  const { password: _password, ...user } = record;

  const token = btoa(`${user.id}:${Date.now()}`);

  return { token, user };
}
