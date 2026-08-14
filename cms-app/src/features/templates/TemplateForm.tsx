import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { templateSchema, type TemplateFormValues } from "./templateSchema";

interface TemplateFormProps {
  defaultValues?: TemplateFormValues;
  onSubmit: (values: TemplateFormValues) => Promise<void> | void;
  submitLabel?: string;
}

function TemplateForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save",
}: TemplateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
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

export default TemplateForm;
