import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import App from "./App.tsx";

const theme = createTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      //staleTime: 10_000,
      staleTime: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
