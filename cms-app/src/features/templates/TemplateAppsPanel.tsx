import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppsByTemplateQuery } from "../apps/appsQueries";

interface TemplateAppsPanelProps {
  templateId: string;
  isExpanded: boolean;
}

function TemplateAppsPanel({ templateId, isExpanded }: TemplateAppsPanelProps) {
  const { data: apps, isLoading } = useAppsByTemplateQuery(
    templateId,
    isExpanded,
  );

  if (isLoading) {
    return <Typography variant="body2">Loading apps...</Typography>;
  }

  const relatedApps = apps ?? [];

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Apps using this template
      </Typography>

      {relatedApps.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No apps linked to this template.
        </Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {relatedApps.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

export default TemplateAppsPanel;
