import type { AxiosInstance } from "axios";
import { useAuthStore } from "../store/auth.store";
import { API_ENDPOINTS } from "./types/endpoints";

export function setupAuthInterceptor(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      const is401 = error.response?.status === 401;
      const isRefreshEndpoint = originalRequest?.url?.includes(API_ENDPOINTS.AUTH.REFRESH);
      const alreadyRetried = originalRequest?._retry;

      if (is401 && !isRefreshEndpoint && !alreadyRetried) {
        originalRequest._retry = true;

        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }

        try {
          const { data } = await axiosInstance.post<{ token: string }>(
            API_ENDPOINTS.AUTH.REFRESH,
            { refresh_token: refreshToken }
          );

          useAuthStore.getState().setTokens(data.token, refreshToken);

          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return axiosInstance(originalRequest);

        } catch {
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
}
