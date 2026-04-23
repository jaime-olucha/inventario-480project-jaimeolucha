import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage/LoginPage"
import { DashboardPage } from "../pages/DashboardPage/DashboardPage"
import { useAuthStore } from "../store/auth.store"


export const AppRoutes = () => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    isAuthenticated ? <Navigate to="/" /> : <LoginPage />
                }
            />
            <Route
                path="/"
                element={
                    isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />
                }
            />
        </Routes>
    )
}