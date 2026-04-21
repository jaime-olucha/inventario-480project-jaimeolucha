import type { HttpMethods } from "../types/HttpMethods";

export interface HttpRequestOptions<TBody> {
    method: HttpMethods;
    path: string;
    body?: TBody;
    token?: string;
}