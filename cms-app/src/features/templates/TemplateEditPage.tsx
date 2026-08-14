import { CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TemplateForm from "./TemplateForm";
import { useTemplateQuery, useUpdateTemplateMutation } from "./templateQueries";
import type { TemplateFormValues } from "./templateSchema";

function TemplateEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: template, isLoading } = useTemplateQuery(id ?? "");
  const updateTemplateMutation = useUpdateTemplateMutation(id ?? "");

  async function handleSubmit(values: TemplateFormValues) {
    if (!id) return;
    await updateTemplateMutation.mutateAsync(values);
    navigate("/templates");
  }

  if (isLoading || !template) {
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
