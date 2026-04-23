export const HttpMethod = {
    GET: "GET",
    POST: "POST",
    PATCH: "PATCH",
    PUT: "PUT",
    DELETE: "DELETE",

} as const;

export type HttpMethodType = typeof HttpMethod[keyof typeof HttpMethod];
