import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function AppsListPage() {
  const navigate = useNavigate();

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
          Apps1
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/apps/new")}
        >
          New app
        </Button>
      </Box>

      {/* AppsTable goes here next */}
    </Box>
  );
}

export default AppsListPage;
