import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import { appSchema, type AppFormValues } from "./appSchema";
import { useTemplates } from "../templates/hooks/useTemplates";

interface AppFormProps {
  defaultValues?: AppFormValues;
  onSubmit: (values: AppFormValues) => Promise<void> | void;
  submitLabel?: string;
}

function AppForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save",
}: AppFormProps) {
  const { templates, isLoading: isLoadingTemplates } = useTemplates();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppFormValues>({
    resolver: zodResolver(appSchema),
    defaultValues: defaultValues ?? { name: "", templateId: "" },
  });

  if (isLoadingTemplates) {
    return <CircularProgress />;
  }

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

      <Controller
        name="templateId"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Template"
            {...field}
            error={Boolean(errors.templateId)}
            helperText={errors.templateId?.message}
            fullWidth
          >
            <MenuItem value="">
              <em>Select a template</em>
            </MenuItem>
            {templates.map((template) => (
              <MenuItem key={template.id} value={template.id}>
                {template.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </Box>
  );
}

export default AppForm;
