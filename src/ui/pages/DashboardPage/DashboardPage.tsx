
import { useUserStore } from "../../store/user.store";
import { User, Mail, SquareArrowRightEnter } from 'lucide-react';
import { SYSTEM_ROLES } from "../../../domain/value-objects/SystemRole";
import { getUserProjectsApi } from "../../../infrastructure/repositories/userRepository";
import { useEffect, useState } from "react";
import type { UserProjects } from "../../../domain/dtos/UserProjectDTO";
import { ROUTES } from "@/ui/routes/routes";
import './DashboardPage.scss';
import logoWhite from "../../assets/logo-480/480dev_white.webp";
import { Link } from "react-router-dom";
import type { TimeEntry } from "@/domain/entities/TimeEntry";
import { getUserTimeEntriesApi } from "@/infrastructure/repositories/timeEntriesRepository";

export const DashboardPage = () => {
  const user = useUserStore((store) => store.user);
  const [projects, setProjects] = useState<UserProjects[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [totalHours, setTotalHours] = useState<number>(0);


  useEffect(() => {
    if (!user) return;

    getUserProjectsApi(user.id).then(setProjects);
    getUserTimeEntriesApi(user.id).then(response => {
      setTimeEntries(response.data)
      setTotalHours(response.total_hours)
    });

  }, [user])


  const getInitials = (name: string = "") => {
    return name?.[0] ?? "";
  }
  const initials = getInitials(user?.name) + getInitials(user?.surname);

  const getRoleBadge = () => {
    if (user?.role == SYSTEM_ROLES.ADMIN) return "Administrador"
  }

  const getWeeklyHours = (entries: TimeEntry[]) => {
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const week = [];

    const today = new Date();
    const currentDay = today.getDay();

    const diffToMonday = currentDay === 0 ? 0 : 1 - currentDay;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    for (let i = 0; i < days.length; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      week.push({
        day: `${days[i]} ${date.getDate()} ${months[date.getMonth()]}`,
        dateISO: date.toISOString().split("T")[0],
        total: 0,
      });
    }

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];

      for (let j = 0; j < week.length; j++) {
        if (entry.date === week[j].dateISO) {
          week[j].total += entry.hour;
        }
      }
    }

    return week;
  };
  const weeklyHours = getWeeklyHours(timeEntries);

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
          {getRoleBadge() && <span className="card_badge">{getRoleBadge()}</span>}
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
                          <p className="info team-members"><User className="iconSvg" />{project.team_members} Miembros</p>
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
