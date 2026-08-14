import { CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AppForm from "./AppForm";
import type { AppFormValues } from "./appSchema";
import { useAppQuery, useUpdateAppMutation } from "./appsQueries";

function AppEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: app, isLoading } = useAppQuery(id ?? "");
  const updateAppMutation = useUpdateAppMutation(id ?? "");

  async function handleSubmit(values: AppFormValues) {
    if (!id) return;
    await updateAppMutation.mutateAsync(values);
    navigate("/apps");
  }

  if (isLoading || !app) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit app
      </Typography>

      <AppForm
        defaultValues={{ name: app.name, templateId: app.templateId }}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
      />
    </>
  );
}

export default AppEditPage;
