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

function TemplatesListPage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  async function handleRemoveTemplate(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this template?",
    );
    if (!confirmed) return;

    setIsLoading(true);

    await removeTemplate(id)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        console.error(error);
        setError("Unable to load templates");
        setIsLoading(false);
      });

    setTemplates((prev) => prev.filter((template) => template.id !== id));
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
                <IconButton onClick={() => handleRemoveTemplate(template.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default TemplatesListPage;
