import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Project } from "./types";
import { useProjectsQuery, useRemoveProject } from "./projectQueries";
import ConfirmDialog from "@/components/layout/ConfirmDialog";

function ProjectsListPage() {
  const navigate = useNavigate();
  const { data: projects, isLoading, isError } = useProjectsQuery();
  const removeProjectMutation = useRemoveProject();
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(
    null,
  );

  async function handleConfirmDelete() {
    if (!projectToDelete) return;

    await removeProjectMutation.mutateAsync(projectToDelete.id);
    setProjectToDelete(null);
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !projects) {
    return <Typography color="error">Unable to load projects.</Typography>;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Projects
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/projects/new")}
        >
          New project
        </Button>
      </Box>

      {projects.length === 0 ? (
        <Typography>No projects yet.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => navigate(`/projects/${project.id}/edit`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => setProjectToDelete(project)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ConfirmDialog
        open={projectToDelete !== null}
        title="Delete project"
        description={`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isConfirming={removeProjectMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setProjectToDelete(null)}
      />
    </Box>
  );
}

export default ProjectsListPage;
