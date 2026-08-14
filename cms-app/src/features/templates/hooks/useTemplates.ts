import { useTemplatesQuery } from "../templateQueries";

export function useTemplates() {
  const { data, isLoading } = useTemplatesQuery();
  return { templates: data ?? [], isLoading };
}
