
import { Link } from "react-router-dom";
import { useUserStore } from "../../../infrastructure/store/user.store";
import { useRepositories } from "../../../infrastructure/RepositoryContext/RepositoryContext";
import { useEffect, useState } from "react";
import type { UserProject } from "@/domain/models/User/UserProject";
import type { TimeEntry } from "@/domain/models/User/TimeEntry";
import { getInitials } from "@/infrastructure/helpers/getInitials";
import { getWeeklyHours } from "@/infrastructure/helpers/getWeeklyHours";
import { getRoleBadge } from "@/infrastructure/helpers/getRoleBadge";
import { ROUTES } from "@/ui/routes/routes";
import { User, Mail, SquareArrowRightEnter } from 'lucide-react';
import './DashboardPage.scss';

export const DashboardPage = () => {
  const user = useUserStore((store) => store.user);
  const { user: userRepo } = useRepositories();
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  const weeklyHours = getWeeklyHours(timeEntries);
  const totalHours = weeklyHours.reduce((sum, day) => sum + day.total, 0);
  const initials = getInitials(user?.name) + getInitials(user?.surname);
  const roleBadge = getRoleBadge(user?.role);

  useEffect(() => {
    if (!user) return;

    userRepo.getProjects(user.id).then(setProjects);
    userRepo.getTimeEntries(user.id).then(response => {
      setTimeEntries(response.data)
    });

  }, [user, userRepo])


  return (
    <section className="dashboard-page">
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
          {roleBadge && <span className="card_badge">{roleBadge}</span>}
        </article>

        <article className="card">
          <div className="projects-header">
            <div>
              <h2 className="card_header">Tus Proyectos</h2>
              <p className="info">Proyectos en los que estas asignado</p>
            </div>
            <Link to={ROUTES.PROJECTS.LIST} className="btn-see-all">Ver Todos</Link>
          </div>
          <div className="card_container">
            {projects.length === 0 ? (
              <p>No tienes proyectos asignados</p>
            ) : (
              <ul className="projects-list">
                {projects.slice(0, 4).map((project) => (
                  <li className="li-map" key={project.id}>
                    <Link to={ROUTES.PROJECTS.BY_ID(project.id)} >
                      <div className="card">
                        <div className="project-info">
                          <h2 className="card_header">{project.name}</h2>
                          <p className="info">{project.description}</p>
                          <p className="info team-members"><User className="iconSvg" />{project.teamMembers} Miembros</p>
                          <span className="iconSvg icon-into_project"><SquareArrowRightEnter /></span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>

        <article className="card">
          <div className="hours-header">
            <div>
              <h2 className="card_header">Horas Imputadas esta semana</h2>
              <p className="info">Total todas las imputaciones: <strong>{totalHours}h </strong></p>
            </div>
          </div>

          <div className="weekly-hours">
            {weeklyHours.map((day) => (
              <div className="day-column" key={day.day}>
                <span className="day-hours">
                  {day.total > 0 ? `${day.total}h` : "0h"}
                </span>

                <span className="day-label">
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </article>
      </div >
    </section >
  );
};
