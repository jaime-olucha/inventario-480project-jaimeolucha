import type { HttpMethodType } from "../types/HttpMethods";

export interface HttpRequestOptions<TBody> {
    method: HttpMethodType;
    path: string;
    body?: TBody;
    token?: string;
}