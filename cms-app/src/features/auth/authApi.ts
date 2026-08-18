import { ApiError } from "@/apiError";
import type { AuthSession, LoginCredentials } from "./user";
import { apiFetch } from "@/lib/apiFetch";

const API_URL = import.meta.env.VITE_CMS_API_URL;

interface LoginResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  expiresAt: string;
}

export async function login(
  credentials: LoginCredentials,
): Promise<AuthSession> {
  const response = await apiFetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new ApiError("Invalid email or password", response.status);
  }

  const data: LoginResponse = await response.json();

  return {
    token: data.token,
    expiresAt: data.expiresAt,
    user: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    },
  };
}
