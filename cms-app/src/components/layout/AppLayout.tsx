import { Suspense, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import ErrorBoundary from "@/components/ErrorBoundary";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <ErrorBoundary
          key={location.pathname}
          fallback={(error, reset) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <Typography variant="h6" color="error">
                Something went wrong
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {error.message}
              </Typography>
              <Button variant="outlined" onClick={reset}>
                Try again
              </Button>
            </Box>
          )}
        >
          <Suspense fallback={<CircularProgress />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </Box>
  );
}

export default AppLayout;
