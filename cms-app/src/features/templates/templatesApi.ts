import { ApiError } from "@/apiError";
import type { Template } from "./types";
import type { TemplateFormValues } from "./templateSchema";
import { apiFetch } from "@/lib/apiFetch";

const API_URL = import.meta.env.VITE_API_URL;

export async function listTemplates(signal?: AbortSignal): Promise<Template[]> {
  const response = await apiFetch(`${API_URL}/templates`, { signal });

  if (!response.ok) {
    throw new ApiError("Unable to load templates", response.status);
  }

  return await response.json();
}

export async function getTemplate(
  id: string,
  signal?: AbortSignal,
): Promise<Template> {
  const response = await apiFetch(`${API_URL}/templates/${id}`, { signal });

  if (!response.ok) {
    throw new ApiError("Template not found", response.status);
  }

  return response.json();
}

export async function createTemplate(
  values: TemplateFormValues,
): Promise<Template> {
  const response = await apiFetch(`${API_URL}/templates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new ApiError("Unable to create template", response.status);
  }

  return await response.json();
}

export async function updateTemplate(
  id: string,
  values: TemplateFormValues,
): Promise<Template> {
  const response = await apiFetch(`${API_URL}/templates/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new ApiError("Unable to update template", response.status);
  }

  return response.json();
}

export async function removeTemplate(id: string): Promise<void> {
  const response = await apiFetch(`${API_URL}/templates/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new ApiError("Unable to delete template", response.status);
  }
}
