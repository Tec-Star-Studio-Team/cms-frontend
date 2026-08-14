import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppForm from "./AppForm";
import type { AppFormValues } from "./appSchema";
import { useCreateAppMutation } from "./appsQueries";

function AppCreatePage() {
  const navigate = useNavigate();
  const createAppMutation = useCreateAppMutation();

  async function handleSubmit(values: AppFormValues) {
    await createAppMutation.mutateAsync(values);
    navigate("/apps");
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        New app
      </Typography>

      <AppForm onSubmit={handleSubmit} submitLabel="Create" />
    </>
  );
}

export default AppCreatePage;
