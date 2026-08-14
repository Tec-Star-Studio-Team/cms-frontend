import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppForm from "./AppForm";
import { createApp } from "./appsApi";
import type { AppFormValues } from "./appSchema";

function AppCreatePage() {
  const navigate = useNavigate();

  async function handleSubmit(values: AppFormValues) {
    await createApp(values);
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
