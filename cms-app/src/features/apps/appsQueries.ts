import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createApp,
  getApp,
  listApps,
  listAppsByTemplate,
  removeApp,
  updateApp,
} from "./appsApi";
import type { AppFormValues } from "./appSchema";

export const appKeys = {
  all: ["apps"] as const,
  lists: () => [...appKeys.all, "list"] as const,
  detail: (id: string) => [...appKeys.all, "detail", id] as const,
  byTemplate: (templateId: string) =>
    [...appKeys.all, "byTemplate", templateId] as const,
};

export function useAppsQuery() {
  return useQuery({
    queryKey: appKeys.lists(),
    queryFn: ({ signal }) => listApps(signal),
  });
}

export function useAppQuery(id: string) {
  return useQuery({
    queryKey: appKeys.detail(id),
    queryFn: ({ signal }) => getApp(id, signal),
    enabled: Boolean(id),
  });
}

export function useAppsByTemplateQuery(templateId: string, enabled: boolean) {
  return useQuery({
    queryKey: appKeys.byTemplate(templateId),
    queryFn: ({ signal }) => listAppsByTemplate(templateId, signal),
    enabled,
  });
}

export function useCreateAppMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: AppFormValues) => createApp(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appKeys.all });
    },
  });
}

export function useUpdateAppMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: AppFormValues) => updateApp(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appKeys.all });
    },
  });
}

export function useRemoveAppMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeApp(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appKeys.all });
    },
  });
}
