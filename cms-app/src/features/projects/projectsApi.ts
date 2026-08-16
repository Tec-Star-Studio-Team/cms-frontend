import { apiFetch } from "@/lib/apiFetch";
import { ApiError } from "@/apiError";
import type { Project } from "./types";
import type { ProjectFormValues } from "./projectSchema";

const API_URL = import.meta.env.VITE_API_URL;

export async function listProjects(
  signal?: AbortSignal,
): Promise<Project[]> {
  const response = await apiFetch(`${API_URL}/projects`, { signal });

  if (!response.ok) {
    throw new ApiError("Unable to load projects", response.status);
  }

  return response.json();
}

export async function getProject(
  id: string,
  signal?: AbortSignal,
): Promise<Project> {
  const response = await apiFetch(`${API_URL}/projects/${id}`, { signal });

  if (!response.ok) {
    throw new ApiError("Project not found", response.status);
  }

  return response.json();
}

export async function createProject(
  values: ProjectFormValues,
): Promise<Project> {
  const response = await apiFetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new ApiError("Unable to create project", response.status);
  }

  return response.json();
}

export async function updateProject(
  id: string,
  values: ProjectFormValues,
): Promise<Project> {
  const response = await apiFetch(`${API_URL}/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new ApiError("Unable to update project", response.status);
  }

  return response.json();
}

export async function removeProject(id: string): Promise<void> {
  const response = await apiFetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new ApiError("Unable to delete project", response.status);
  }
}
