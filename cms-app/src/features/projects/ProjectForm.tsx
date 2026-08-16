import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { projectSchema, type ProjectFormValues } from "./projectSchema";

interface ProjectFormProps {
  defaultValues?: ProjectFormValues;
  onSubmit: (values: ProjectFormValues) => Promise<void> | void;
  submitLabel?: string;
}

function ProjectForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save",
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: defaultValues ?? { name: "" },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}
    >
      <TextField
        label="Name"
        {...register("name")}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        fullWidth
      />

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </Box>
  );
}

export default ProjectForm;
