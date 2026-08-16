import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AppsIcon from "@mui/icons-material/Apps";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useAuth } from "@/features/auth/AuthContext";

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { label: "Apps", icon: <AppsIcon />, path: "/apps" },
  { label: "Templates", icon: <ViewQuiltIcon />, path: "/templates" },
];

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

function Sidebar({ open, onToggle }: SidebarProps) {
  const width = open ? EXPANDED_WIDTH : COLLAPSED_WIDTH;
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        "& .MuiDrawer-paper": {
          width,
          overflowX: "hidden",
          boxSizing: "border-box",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "flex-end" : "center",
            px: 1,
          }}
        >
          <IconButton onClick={onToggle}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>

        <Divider />

        <List>
          {NAV_ITEMS.map((item) => (
            <ListItemButton
              key={item.path}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{ justifyContent: open ? "initial" : "center", px: 2.5 }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ mt: "auto" }}>
          <Divider />
          <List>
            <ListItemButton
              onClick={logout}
              sx={{ justifyContent: open ? "initial" : "center", px: 2.5 }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" />}
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
