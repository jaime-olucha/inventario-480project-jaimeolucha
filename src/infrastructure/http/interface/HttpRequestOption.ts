import type { HttpMethods } from "../types/httpMethods";

export interface HttpRequestOptions<TBody> {
    method: HttpMethods;
    path: string;
    body?: TBody;
    token?: string;
}