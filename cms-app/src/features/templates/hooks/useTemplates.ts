import { useEffect, useState } from "react";
import type { Template } from "../types";
import { listTemplates } from "../templatesApi";
import { combineComparators } from "@/lib/comparator";

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    listTemplates(controller.signal)
      .then((data) => {
        setTemplates(
          data.toSorted(
            combineComparators<Template>((a, b) =>
              a.name.localeCompare(b.name),
            ),
          ),
        );
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        console.error(error);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { templates, isLoading };
}
