import { lazy, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./features/auth/LoginForm";
import AppLayout from "./components/layout/AppLayout";
import { useAuth } from "./features/auth/AuthContext";

const PlaceholderPage = lazy(() => import("./pages/PlaceholderPage"));
const AppsListPage = lazy(() => import("./features/apps/AppsListPage"));
const AppCreatePage = lazy(() => import("./features/apps/AppCreatePage"));
const AppEditPage = lazy(() => import("./features/apps/AppEditPage"));
const TemplatesListPage = lazy(
  () => import("./features/templates/TemplatesListPage"),
);
const TemplateCreatePage = lazy(
  () => import("./features/templates/TemplateCreatePage"),
);
const TemplateEditPage = lazy(
  () => import("./features/templates/TemplateEditPage"),
);
const ProjectsListPage = lazy(
  () => import("./features/projects/ProjectsListPage"),
);
const ProjectCreatePage = lazy(
  () => import("./features/projects/ProjectCreatePage"),
);
const ProjectEditPage = lazy(
  () => import("./features/projects/ProjectEditPage"),
);

function App() {
  const { session, login } = useAuth();

  if (!session) {
    return <LoginForm onSuccess={login} />;
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<PlaceholderPage title="Dashboard" />} />
        <Route path="/apps" element={<AppsListPage />} />
        <Route path="/apps/new" element={<AppCreatePage />} />
        <Route path="/apps/:id/edit" element={<AppEditPage />} />
        <Route path="/templates" element={<TemplatesListPage />} />
        <Route path="/templates/new" element={<TemplateCreatePage />} />
        <Route path="/templates/:id/edit" element={<TemplateEditPage />} />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route path="/projects/new" element={<ProjectCreatePage />} />
        <Route path="/projects/:id/edit" element={<ProjectEditPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
