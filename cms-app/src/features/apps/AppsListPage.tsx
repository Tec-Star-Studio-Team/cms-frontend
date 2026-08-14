import { useEffect, useState } from "react";
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
import { listApps, removeApp } from "./appsApi";
import type { App } from "./types";
import { useTemplates } from "../templates/hooks/useTemplates";
import ConfirmDialog from "@/components/layout/ConfirmDialog";

function AppsListPage() {
  const navigate = useNavigate();
  const { templates } = useTemplates();
  const [apps, setApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appToDelete, setAppToDelete] = useState<App | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    listApps(controller.signal)
      .then((data) => {
        setApps(data);
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        console.error(error);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  function templateName(templateId: string) {
    return (
      templates.find((template) => template.id === templateId)?.name ?? "—"
    );
  }

  async function handleConfirmDelete() {
    if (!appToDelete) return;

    setIsDeleting(true);
    try {
      await removeApp(appToDelete.id);
      setApps((prev) => prev.filter((app) => app.id !== appToDelete.id));
      setAppToDelete(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return <CircularProgress />;
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
        isConfirming={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setAppToDelete(null)}
      />
    </Box>
  );
}

export default AppsListPage;
