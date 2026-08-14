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
import type { App } from "./types";
import { useTemplates } from "../templates/hooks/useTemplates";
import { useAppsQuery, useRemoveAppMutation } from "./appsQueries";
import ConfirmDialog from "@/components/layout/ConfirmDialog";

function AppsListPage() {
  const navigate = useNavigate();
  const { templates } = useTemplates();
  const { data: apps, isLoading, isError } = useAppsQuery();
  const removeAppMutation = useRemoveAppMutation();
  const [appToDelete, setAppToDelete] = useState<App | null>(null);

  function templateName(templateId: string) {
    return (
      templates.find((template) => template.id === templateId)?.name ?? "—"
    );
  }

  async function handleConfirmDelete() {
    if (!appToDelete) return;

    await removeAppMutation.mutateAsync(appToDelete.id);
    setAppToDelete(null);
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !apps) {
    return <Typography color="error">Unable to load apps.</Typography>;
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
          Apps
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/apps/new")}
        >
          New app
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Template</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apps.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.name}</TableCell>
              <TableCell>{templateName(app.templateId)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => navigate(`/apps/${app.id}/edit`)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => setAppToDelete(app)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDialog
        open={appToDelete !== null}
        title="Delete app"
        description={`Are you sure you want to delete "${appToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isConfirming={removeAppMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setAppToDelete(null)}
      />
    </Box>
  );
}

export default AppsListPage;
