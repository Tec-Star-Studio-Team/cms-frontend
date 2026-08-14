import { z } from "zod";

export const appSchema = z.object({
  name: z.string().min(3, "Name is required"),
  templateId: z.string().min(1, "Template is required"),
});

export type AppFormValues = z.infer<typeof appSchema>;
