import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
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
import TemplateAppsPanel from "./TemplateAppsPanel";
import {
  useTemplatesQuery,
  useRemoveTemplateMutation,
} from "./templateQueries";
import type { Template } from "./types";
import ConfirmDialog from "@/components/layout/ConfirmDialog";

function TemplatesListPage() {
  const navigate = useNavigate();
  const { data: templates, isLoading, isError } = useTemplatesQuery();
  const removeTemplateMutation = useRemoveTemplateMutation();
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(
    null,
  );
  const [expandedTemplateId, setExpandedTemplateId] = useState<string | null>(
    null,
  );

  async function handleConfirmDelete() {
    if (!templateToDelete) return;

    await removeTemplateMutation.mutateAsync(templateToDelete.id);
    setTemplateToDelete(null);
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !templates) {
    return <Typography color="error">Unable to load templates.</Typography>;
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
          {templates.map((template) => {
            const isExpanded = expandedTemplateId === template.id;

            return (
              <Fragment key={template.id}>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() =>
                        setExpandedTemplateId(isExpanded ? null : template.id)
                      }
                    >
                      {template.name}
                    </Button>
                  </TableCell>
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

                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{
                      py: 0,
                      borderBottom: isExpanded ? undefined : "none",
                    }}
                  >
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <TemplateAppsPanel
                        templateId={template.id}
                        isExpanded={isExpanded}
                      />
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>

      <ConfirmDialog
        open={templateToDelete !== null}
        title="Delete template"
        description={`Are you sure you want to delete "${templateToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isConfirming={removeTemplateMutation.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTemplateToDelete(null)}
      />
    </Box>
  );
}

export default TemplatesListPage;
