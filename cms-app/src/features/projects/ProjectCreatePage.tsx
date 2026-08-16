import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import type { ProjectFormValues } from "./projectSchema";
import { useCreateProject } from "./projectQueries";

function ProjectCreatePage() {
  const navigate = useNavigate();
  const createProjectMutation = useCreateProject();

  async function handleSubmit(values: ProjectFormValues) {
    await createProjectMutation.mutateAsync(values);
    navigate("/projects");
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        New project
      </Typography>

      <ProjectForm onSubmit={handleSubmit} submitLabel="Create" />
    </>
  );
}

export default ProjectCreatePage;
