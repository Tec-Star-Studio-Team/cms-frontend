import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
