import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

function AppLayout() {
  const [sidebarOpen, setSideBarOpen] = useState(true);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSideBarOpen((prev) => !prev)}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default AppLayout;
