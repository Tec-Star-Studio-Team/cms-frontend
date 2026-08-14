import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import AppForm from "./AppForm";
import { getApp, updateApp } from "./appsApi";
import type { AppFormValues } from "./appSchema";
import type { App } from "./types";

function AppEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [app, setApp] = useState<App | null>(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    getApp(id, controller.signal)
      .then(setApp)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        console.error(error);
      });

    return () => controller.abort();
  }, [id]);

  async function handleSubmit(values: AppFormValues) {
    if (!id) return;
    await updateApp(id, values);
    navigate("/apps");
  }

  if (!app) {
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
