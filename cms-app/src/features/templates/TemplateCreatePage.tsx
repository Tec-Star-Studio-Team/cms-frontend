import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TemplateForm from "./TemplateForm";
import type { TemplateFormValues } from "./templateSchema";
import { useCreateTemplateMutation } from "./templateQueries";

function TemplateCreatePage() {
  const navigate = useNavigate();
  const createTemplateMutation = useCreateTemplateMutation();

  async function handleSubmit(values: TemplateFormValues) {
    await createTemplateMutation.mutateAsync(values);
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
