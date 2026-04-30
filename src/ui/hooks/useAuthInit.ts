import { useEffect } from "react"
import { useAuthStore } from "../store/auth.store"
import { useUserStore } from "../store/user.store"
import { jwtDecode } from "jwt-decode"
import type { JwtPayload } from "./interface/JwtPayload"
import { getUserByIdApi } from "../../infrastructure/repositories/userRepository"

export const useAuthInit = () => {
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    if (!token) return;

    try {
      const decode = jwtDecode<JwtPayload>(token)

      getUserByIdApi(decode.id).then((user) => {
        setUser(user);

      }).catch(() => {
        logout();
      })



    } catch (error) {
      logout()
    }
  }), [token, logout, setUser]
}