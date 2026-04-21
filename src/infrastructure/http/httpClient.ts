import axios, { type AxiosRequestConfig } from "axios"
import type { HttpRequestOptions } from "./interface/HttpRequestOption";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export async function httpClient<TResponse, TBody = undefined>(options: HttpRequestOptions<TBody>): Promise<TResponse> {

    const { method, path, body, token } = options;

    const axiosConfig: AxiosRequestConfig = {
        method,
        url: path,
        data: body,
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
        }
    }

    try {
        const response = await axiosInstance.request<TResponse>(axiosConfig);
        return response.data;

    } catch (error: any) {
        const status = error.response?.status;
        const message = error.response?.data ?? error.message ?? "Unknown error";

        throw new Error(`HTTP ${status}: ${JSON.stringify(message)}`);
    }
}