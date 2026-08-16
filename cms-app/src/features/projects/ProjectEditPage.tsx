import { CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useProjectQuery, useUpdateProject } from "./projectQueries";
import type { ProjectFormValues } from "./projectSchema";

function ProjectEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading } = useProjectQuery(id ?? "");
  const updateProjectMutation = useUpdateProject(id ?? "");

  async function handleSubmit(values: ProjectFormValues) {
    if (!id) return;
    await updateProjectMutation.mutateAsync(values);
    navigate("/projects");
  }

  if (isLoading || !project) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit project
      </Typography>

      <ProjectForm
        defaultValues={{ name: project.name }}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
      />
    </>
  );
}

export default ProjectEditPage;
