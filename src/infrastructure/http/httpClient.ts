import type { HttpRequestOptions } from "./interface/HttpRequestOption";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function httpClient<TResponse, TBody = undefined>(options: HttpRequestOptions<TBody>): Promise<TResponse> {

    const { method, path, body, token } = options;

    const response = await fetch(`${API_BASE_URL}${path}`, {
        method, headers: {
            "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status} ${response.statusText}: ${errorText}`)
    }

    if (response.status === 204) {
        return undefined as TResponse;
    }

    return response.json() as Promise<TResponse>
}