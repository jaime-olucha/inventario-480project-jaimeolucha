
import { useUserStore } from "../../store/user.store";
import { User, Mail } from 'lucide-react';
import { SYSTEM_ROLES } from "../../../domain/types/SystemRole";
import { getUserProjectsApi } from "../../../infrastructure/api/userRepository";
import { useEffect, useState } from "react";
import type { UserProjects } from "../../../domain/entities/UserProjects";
import { API_ENDPOINTS } from "../../../infrastructure/api/endpoints";
import './DashboardPage.scss';
import logoWhite from "../../assets/logo-480/480dev_white.webp";
import { Link } from "react-router-dom";

export const DashboardPage = () => {
  const user = useUserStore((s) => s.user);
  const [projects, setProjects] = useState<UserProjects[]>([]);

  useEffect(() => {
    if (!user) return;

    getUserProjectsApi(user.id).then(setProjects);
    console.log(projects);
  }, [user])


  const getInitials = (name: string = "") => {
    return name?.[0] ?? "";
  }

  const getRoleBadge = () => {
    if (user?.role == SYSTEM_ROLES.ADMIN) return "Administrador"
  }

  const initials = getInitials(user?.name) + getInitials(user?.surname);

  return (
    <section className="dashboard-page">
      <div className="aside">
        <img src={logoWhite} alt="Logo 480DEV" />
      </div>
      <div className="content">
        <div className="dashboard-page_header">
          <h1>¡Bienvenid@, {user?.name}!</h1>
          <p className="info">Gestiona tus proyectos y horas de trabajo</p>
        </div>

        <article className="card profile_card">
          <div className="card_logo">
            <h2 className="card_header">Tu Perfil</h2>
            <p className="logo-user">{initials}</p>
          </div>
          <div className="card-user_info">
            <p><User className="iconSvg" /><strong>Name:</strong> {user?.name} {user?.surname}</p>
            <p><Mail className="iconSvg" /><strong>Correo:</strong> {user?.email}</p>
          </div>
          <span className="card_badge">{getRoleBadge()}</span>
        </article>

        <article className="card">
          <div className="projects-header">
            <div>
              <h2 className="card_header">Tus Proyectos</h2>
              <p className="info">Proyectos en los que estas asignado</p>
            </div>
            <Link to={API_ENDPOINTS.PROJECTS.LIST} className="btn-see-all">Ver Todos</Link>
          </div>
          <div className="card_container">
            {projects.length === 0 ? (
              <p>No tienes proyectos asignados</p>
            ) : (
              <ul className="projects-list">
                {projects.slice(0, 4).map((project) => (
                  <li className="li-map" key={project.id}>
                    <Link to={API_ENDPOINTS.PROJECTS.BY_ID(project.id)} >
                      <div className="card">
                        <div className="project-info">
                          <h2 className="card_header">{project.name}</h2>
                          <p className="info">{project.description}</p>
                          <p className="info"><User className="iconSvg" />{project.team_members} Miembros</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      </div>
    </section>

  );
};
