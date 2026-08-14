import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./features/auth/LoginForm";
import AppLayout from "./components/layout/AppLayout";
import PlaceholderPage from "./pages/PlaceholderPage";
import type { AuthSession } from "./features/auth/user";
import AppCreatePage from "./features/apps/AppCreatePage";
import AppsListPage from "./features/apps/AppsListPage";
import TemplateCreatePage from "./features/templates/TemplateCreatePage";
import TemplatesListPage from "./features/templates/TemplatesListPage";
import TemplateEditPage from "./features/templates/TemplateEditPage";

function App() {
  const [session, setSession] = useState<AuthSession | null>(null);
  if (!session) {
    return <LoginForm onSuccess={setSession} />;
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<PlaceholderPage title="Dashboard" />} />
        <Route path="/apps" element={<AppsListPage />} />
        <Route path="/apps/new" element={<AppCreatePage />} />
        <Route path="/templates" element={<TemplatesListPage />} />
        <Route path="/templates/new" element={<TemplateCreatePage />} />
        <Route path="/templates/:id/edit" element={<TemplateEditPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
