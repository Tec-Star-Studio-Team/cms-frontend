import { apiFetch } from "@/lib/apiFetch";
import { ApiError } from "@/apiError";
import type { App } from "./types";
import type { AppFormValues } from "./appSchema";

const API_URL = import.meta.env.VITE_API_URL;

export async function listApps(signal?: AbortSignal): Promise<App[]> {
  const response = await apiFetch(`${API_URL}/apps`, { signal });

  if (!response.ok) {
    throw new ApiError("Unable to load apps", response.status);
  }

  return response.json();
}

export async function getApp(id: string, signal?: AbortSignal): Promise<App> {
  const response = await apiFetch(`${API_URL}/apps/${id}`, { signal });

  if (!response.ok) {
    throw new ApiError("App not found", response.status);
  }

  return response.json();
}

export async function listAppsByTemplate(
  templateId: string,
  signal?: AbortSignal,
): Promise<App[]> {
  const query = new URLSearchParams({ templateId });
  const response = await apiFetch(`${API_URL}/apps?${query.toString()}`, {
    signal,
  });

  if (!response.ok) {
    throw new ApiError(
      "Unable to load apps for this template",
      response.status,
    );
  }

  return response.json();
}

export async function createApp(values: AppFormValues): Promise<App> {
  const response = await apiFetch(`${API_URL}/apps`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new ApiError("Unable to create app", response.status);
  }

  return response.json();
}

export async function updateApp(
  id: string,
  values: AppFormValues,
): Promise<App> {
  const response = await apiFetch(`${API_URL}/apps/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new ApiError("Unable to update app", response.status);
  }

  return response.json();
}

export async function removeApp(id: string): Promise<void> {
  const response = await apiFetch(`${API_URL}/apps/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new ApiError("Unable to delete app", response.status);
  }
}
