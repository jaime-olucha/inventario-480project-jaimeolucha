import type { LoginRequestDTO } from "../../domain/dtos/LoginRequestDTO";
import type { LoginResponseDTO } from "../../domain/dtos/LoginResponseDTO";
import { httpClient } from "../http/httpClient";
import { API_ENDPOINTS } from "./endpoints";
import { HttpMethod } from "../http/types/HttpMethods";

export async function loginApi(data: LoginRequestDTO): Promise<LoginResponseDTO> {

    return httpClient<LoginResponseDTO, LoginRequestDTO>({
        method: HttpMethod.POST,
        path: API_ENDPOINTS.AUTH.LOGIN,
        body: data,
    })
}

