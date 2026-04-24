
// import { useAuthStore } from "../../store/auth.store";
import { useUserStore } from "../../store/user.store";
import { User, Mail } from 'lucide-react';
import { SYSTEM_ROLES } from "../../../domain/types/SystemRole";
import { getUserProjectsApi } from "../../../infrastructure/api/userRepository";
import './DashboardPage.scss';
import { useState } from "react";


export const DashboardPage = () => {
    const user = useUserStore((s) => s.user);
    const [projects, setProjects] = useState<UserProject[]>([]);


    const getInitials = (name: string = "") => {
        return name?.[0] ?? "";
    }

    const getRoleBadge = () => {
        if (user?.role == SYSTEM_ROLES.ADMIN) return "Administrador"
    }


    // const token = useAuthStore((s) => s.token);
    const initials = getInitials(user?.name) + getInitials(user?.surname);

    return (
        <section className="dashboard-page">
            <h1 className="dashboard-page_header">¡Bienvenid@, {user?.name}!</h1>
            <p className="dashboard-page_info">Gestiona tus proyectos y horas de trabajo</p>

            <article className="card">
                <p className="card_header">Tu perfil</p>
                <div className="card_logo">
                    <h2 className="logo-user">{initials}</h2>
                </div>
                <div className="card_userInfo">
                    <p><User className="iconSvg" /><strong>Name:</strong> {user?.name} {user?.surname}</p>
                    <p><Mail className="iconSvg" /><strong>Correo:</strong> {user?.email}</p>
                </div>
                <div className="card_badge">{getRoleBadge()}</div>
            </article>

            <article className="card">
                <p className="card_header">Tu perfil</p>
                <div className="card_logo">
                    <h2 className="logo-user">{initials}</h2>
                </div>
                <div className="card_userInfo">
                    <p><User className="iconSvg" /><strong>Name:</strong> {user?.name} {user?.surname}</p>
                    <p><Mail className="iconSvg" /><strong>Correo:</strong> {user?.email}</p>
                </div>
                <div className="card_badge">{getRoleBadge()}</div>
            </article>
        </section>
    );
};
