import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import type { AuthSession } from "./types/user";

function App() {
  const [session, setSession] = useState<AuthSession | null>(null);
  if (!session) {
    return <LoginForm onSuccess={setSession} />;
  }

  return (
    <>
      <div>
        <h1>CMS</h1>
        <p>Welcome, {session.user.name}</p>
      </div>
    </>
  );
}

export default App;
