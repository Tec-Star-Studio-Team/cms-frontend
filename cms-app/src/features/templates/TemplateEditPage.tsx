import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import TemplateForm from "./TemplateForm";
import { getTemplate, updateTemplate } from "./templatesApi";
import type { TemplateFormValues } from "./templateSchema";
import type { Template } from "./types";

function TemplateEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    getTemplate(id, controller.signal)
      .then(setTemplate)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        console.error(error);
      });

    return () => controller.abort();
  }, [id]);

  async function handleSubmit(values: TemplateFormValues) {
    if (!id) return;
    await updateTemplate(id, values);
    navigate("/templates");
  }

  if (!template) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit template
      </Typography>

      <TemplateForm
        defaultValues={{ name: template.name }}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
      />
    </>
  );
}

export default TemplateEditPage;
