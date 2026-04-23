import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from '../../store/auth.store'
import type { LoginFormData } from "./loginSchema";
import { loginSchema } from "./loginSchema";
import { loginApi } from "../../../infrastructure/api/auth.api";
import logoWhite from "../../assets/logo-480/480dev_white.webp";
import './LoginPage.scss';


export const LoginPage = () => {
    const setToken = useAuthStore((state) => state.setToken);

    const { register, handleSubmit, formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormData) => {

        try {
            const response = await loginApi(data);
            setToken(response.token);
            console.log(response.token);

        } catch (error) {

            console.error("Login error: ", error);
        }
    }

    return (
        <section className="login-page" >
            <div className="login-page_header">
                <img src={logoWhite} alt="Logo 480DEV" />
                <h1>Gestión de Proyectos</h1>
                <p>Ingresa con tu correo corporativo</p>
            </div>

            <form className="login-page_form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email" className="form_label">Correo Corporativo</label>
                    <input type="email" id="email" className="form_input" placeholder="tu.correo@480.com" {...register("email")} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="form_label">Contraseña</label>
                    <input type="password" id="password" className="form_input" placeholder="****" {...register("password")} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit" className="form_btn" disabled={isSubmitting}>
                    {isSubmitting ? "Entrando..." : "Iniciar Sesión"}
                </button>
            </form>
        </section>
    )
}
