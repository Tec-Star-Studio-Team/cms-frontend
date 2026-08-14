import { z } from "zod";

export const templateSchema = z.object({
  name: z.string().min(3, "Name is required"),
});

export type TemplateFormValues = z.infer<typeof templateSchema>;
