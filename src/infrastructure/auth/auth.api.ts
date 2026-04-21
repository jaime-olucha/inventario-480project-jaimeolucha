import type { LoginRequestDTO } from "../../domain/dtos/LoginRequestDTO";
import type { LoginResponseDTO } from "../../domain/dtos/LoginResponseDTO";
import { httpClient } from "../http/httpClient";


export async function loginApi(data: LoginRequestDTO): Promise<LoginResponseDTO> {

    return httpClient<LoginResponseDTO, LoginRequestDTO>({
        method: 'POST',
        path: '/login',
        body: data,
    })
}

