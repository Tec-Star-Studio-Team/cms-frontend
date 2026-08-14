import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
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
import { listTemplates, removeTemplate } from "./templatesApi";
import type { Template } from "./types";
import { CircularProgress } from "@mui/material";
import ConfirmDialog from "@/components/layout/ConfirmDialog";

function TemplatesListPage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    listTemplates(controller.signal)
      .then((data) => {
        setTemplates(data);
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        console.error(error);
        setError("Unable to load templates");
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) return <Alert severity="error">{error}</Alert>;

  async function handleRemoveTemplate() {
    if (!templateToDelete) return;

    setIsLoading(true);
    setIsDeleting(true);

    await removeTemplate(templateToDelete.id)
      .then(() => {
        setIsLoading(false);
        setIsDeleting(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        console.error(error);
        setError("Unable to load templates");
        setIsLoading(false);
        setIsDeleting(false);
      });

    setTemplates((prev) =>
      prev.filter((template) => template.id !== templateToDelete.id),
    );
    setTemplateToDelete(null);
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
          Templates
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/templates/new")}
        >
          New template
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.name}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => navigate(`/templates/${template.id}/edit`)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => setTemplateToDelete(template)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ConfirmDialog
        open={templateToDelete !== null}
        title="Delete template"
        description={`Are you sure you want to delete "${templateToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isConfirming={isDeleting}
        onConfirm={handleRemoveTemplate}
        onCancel={() => setTemplateToDelete(null)}
      />
    </Box>
  );
}

export default TemplatesListPage;
