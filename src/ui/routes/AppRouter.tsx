import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage/LoginPage"
import { DashboardPage } from "../pages/DashboardPage/DashboardPage"
import { useAuthStore } from "../store/auth.store"
import { AppLayout } from "../layouts/AppLayout"


export const AppRoutes = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)


  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        }
      />

      <Route
        path="/"
        element={
          isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  )

}