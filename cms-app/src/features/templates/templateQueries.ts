import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTemplate,
  getTemplate,
  listTemplates,
  removeTemplate,
  updateTemplate,
} from "./templatesApi";
import type { TemplateFormValues } from "./templateSchema";

export const templateKeys = {
  all: ["templates"] as const,
  lists: () => [...templateKeys.all, "list"] as const,
  detail: (id: string) => [...templateKeys.all, "detail", id] as const,
};

export function useTemplatesQuery() {
  return useQuery({
    queryKey: templateKeys.lists(),
    queryFn: ({ signal }) => listTemplates(signal),
    select: (data) => data.toSorted((a, b) => a.name.localeCompare(b.name)),
  });
}

export function useTemplateQuery(id: string) {
  return useQuery({
    queryKey: templateKeys.detail(id),
    queryFn: ({ signal }) => getTemplate(id, signal),
    enabled: Boolean(id),
  });
}

export function useCreateTemplateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TemplateFormValues) => createTemplate(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templateKeys.lists() });
    },
  });
}

export function useUpdateTemplateMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TemplateFormValues) => updateTemplate(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templateKeys.lists() });
      queryClient.invalidateQueries({ queryKey: templateKeys.detail(id) });
    },
  });
}

export function useRemoveTemplateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: templateKeys.lists() });
    },
  });
}
