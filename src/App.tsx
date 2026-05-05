import { BrowserRouter } from "react-router-dom";
import { useAuthInit } from "./ui/hooks/useAuthInit";
import { AppRoutes } from "./ui/routes/AppRouter";
import { RepositoryProvider } from "./infrastructure/RepositoryContext/RepositoryContext";

function AppWithAuth() {
  useAuthInit();
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function App() {
  return (
    <RepositoryProvider>
      <AppWithAuth />
    </RepositoryProvider>
  );
}

export default App;
