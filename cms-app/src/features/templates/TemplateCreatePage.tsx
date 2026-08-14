import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TemplateForm from "./TemplateForm";
import { createTemplate } from "./templatesApi";
import type { TemplateFormValues } from "./templateSchema";

function TemplateCreatePage() {
  const navigate = useNavigate();

  async function handleSubmit(values: TemplateFormValues) {
    await createTemplate(values);
    navigate("/templates");
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        New template
      </Typography>

      <TemplateForm onSubmit={handleSubmit} submitLabel="Create" />
    </>
  );
}

export default TemplateCreatePage;
