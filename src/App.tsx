import { BrowserRouter } from "react-router-dom";
import { useAuthInit } from "./ui/hooks/useAuthInit";
import { AppRoutes } from "./ui/routes/AppRouter";

function App() {
    useAuthInit();
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
