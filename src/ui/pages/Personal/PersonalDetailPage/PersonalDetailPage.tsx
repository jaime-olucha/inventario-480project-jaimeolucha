
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "@/infrastructure/store/user.store";
import { useRepositories } from "@/infrastructure/RepositoryContext/RepositoryContext";
import { useEffect, useState, useCallback } from "react";
import type { UserProject } from "@/domain/models/User/UserProject";
import { ROUTES } from "@/ui/routes/routes";
import type { User } from "@/domain/models/User/User";
import './PersonalDetailPage.scss';
import { LogoUser } from "@/ui/components/logoUser/LogoUser";
import type { EntityId } from "@/domain/value-objects/EntityId";
import { ArrowLeft, Edit2, FolderKanban, Mail, Trash2, UserCheck, UserX } from "lucide-react";
import { SYSTEM_ROLES } from "@/domain/value-objects/SystemRole";
import { ConfirmModal } from "@/ui/components/molecules/confirmModal/ConfirmModal";
import { Toast } from "@/ui/components/molecules/toast/Toast";
import '@/ui/components/molecules/confirmModal/ConfirmModal.scss';

const PROJECTS_PREVIEW_LIMIT = 2;

export const PersonalDetailPage = () => {
  const { id } = useParams<{ id: EntityId }>();
  const navigate = useNavigate();
  const userStore = useUserStore((store) => store.user);
  const { user: userRepo } = useRepositories();
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [targetUser, setTargetUser] = useState<User>();
  const [showAllActive, setShowAllActive] = useState(false);
  const [showAllInactive, setShowAllInactive] = useState(false);
  const [modalActive, setModalActive] = useState<"inactivar" | "activar" | null>(null);
  const [loadingPatch, setLoadingPatch] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const isAdmin = userStore?.role === SYSTEM_ROLES.ADMIN;
  const isMyProfile = userStore?.id === targetUser?.id;

  const activeProjects = projects.filter((p) => p.isActive);
  const inactiveProjects = projects.filter((p) => !p.isActive);
  const visibleActive = showAllActive ? activeProjects : activeProjects.slice(0, PROJECTS_PREVIEW_LIMIT);
  const visibleInactive = showAllInactive ? inactiveProjects : inactiveProjects.slice(0, PROJECTS_PREVIEW_LIMIT);

  useEffect(() => {
    if (!id) return;
    userRepo.getById(id).then(setTargetUser);
    userRepo.getProjects(id).then(setProjects);
  }, [id, userRepo]);

  const closeToast = useCallback(() => setToast(null), []);

  const handleToggleActive = async () => {
    if (!id || !targetUser) return;
    const nextValue = !targetUser.isActive;
    setLoadingPatch(true);
    try {
      await userRepo.patchActive(id, nextValue);
      setTargetUser((prev) => prev ? { ...prev, isActive: nextValue } : prev);
      setToast({ message: nextValue ? "Activado correctamente" : "Inactivado correctamente", type: "success" });
    } catch (err) {
      setToast({ message: "No se pudo completar la acción. Inténtalo de nuevo.", type: "error" });
      console.log(err)
    } finally {
      setLoadingPatch(false);
      setModalActive(null);
    }
  };

  return (
    <section className="personal-detail-page">

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      {modalActive && (
        <ConfirmModal
          title={modalActive === "inactivar" ? "Inactivar Usuario" : "Activar Usuario"}
          message={
            modalActive === "inactivar"
              ? "¿Estás seguro de que deseas inactivar a este usuario? Los datos no se eliminarán."
              : "¿Estás seguro de que deseas activar a este usuario?"
          }
          confirmLabel={modalActive === "inactivar" ? "Confirmar" : "Confirmar"}
          loading={loadingPatch}
          onConfirm={handleToggleActive}
          onCancel={() => setModalActive(null)}
        />
      )}

      <div className="personal-detail-page_header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate(ROUTES.USER.LIST)} aria-label="Volver">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1>{isMyProfile ? "Mi Perfil" : "Detalle de Personal"}</h1>
            <p className="info">
              {isMyProfile ? "Tu información completa y proyectos" : "Información completa del empleado"}
            </p>
          </div>
        </div>

        {isAdmin && !isMyProfile && (
          <div className="header-actions">
            {targetUser?.isActive ? (
              <button className="btn-action btn-inactivar" onClick={() => setModalActive("inactivar")}>
                <UserX size={15} /> Inactivar
              </button>
            ) : (
              <button className="btn-action btn-activar" onClick={() => setModalActive("activar")}>
                <UserCheck size={15} /> Activar
              </button>
            )}
            <button className="btn-action btn-eliminar">
              <Trash2 size={15} /> Eliminar
            </button>
          </div>
        )}
      </div>

      <article className="card profile-card">
        <div className="profile-card_top">
          <span className="section-label">Información Personal</span>
          {isAdmin && (
            <button className="btn-edit">
              <Edit2 size={14} /> Editar
            </button>
          )}
        </div>
        <div className="profile-card_body">
          <LogoUser user={targetUser} className="logo-user" />
          <div className="card-user_info">
            <h3>{targetUser?.name} {targetUser?.surname}</h3>
            <p className="user-email">
              <Mail size={13} className="iconSvg" />
              {targetUser?.email}
            </p>
          </div>
        </div>
      </article>

      <article className="card projects-card">
        <div className="projects-card_top">
          <FolderKanban size={18} className="iconSvg" />
          <div>
            <h2 className="card_header">Proyectos</h2>
            <p className="info">
              Proyectos en los que {isMyProfile ? "estás asignado" : `${targetUser?.name ?? "el empleado"} ha participado`}
            </p>
          </div>
        </div>

        {projects.length === 0 && (
          <p className="no-projects">No hay proyectos asignados</p>
        )}

        {activeProjects.length > 0 && (
          <div className="projects-group">
            <h3 className="group-label group-label--active">
              Proyectos Activos ({activeProjects.length})
            </h3>
            <ul className="projects-list">
              {visibleActive.map((project) => (
                <li key={project.id} className="project-item">
                  <Link to={ROUTES.PROJECTS.BY_ID(project.id)} className="project-item_inner">
                    <div>
                      <p className="project-name">{project.name}</p>
                      <p className="info project-desc">{project.description}</p>
                    </div>
                    <span className="project-badge">{project.clientName}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {activeProjects.length > PROJECTS_PREVIEW_LIMIT && (
              <button className="btn-toggle" onClick={() => setShowAllActive((v) => !v)}>
                {showAllActive ? "Ver menos" : `Ver más (${activeProjects.length - PROJECTS_PREVIEW_LIMIT} más)`}
              </button>
            )}
          </div>
        )}

        {inactiveProjects.length > 0 && (
          <div className="projects-group">
            <h3 className="group-label group-label--inactive">
              Proyectos Finalizados ({inactiveProjects.length})
            </h3>
            <ul className="projects-list">
              {visibleInactive.map((project) => (
                <li key={project.id} className="project-item project-item--inactive">
                  <div className="project-item_inner">
                    <div>
                      <p className="project-name">{project.name}</p>
                      <p className="info project-desc">{project.description}</p>
                    </div>
                    <span className="project-badge project-badge--inactive">Inactivo</span>
                  </div>
                </li>
              ))}
            </ul>
            {inactiveProjects.length > PROJECTS_PREVIEW_LIMIT && (
              <button className="btn-toggle" onClick={() => setShowAllInactive((view) => !view)}>
                {showAllInactive ? "Ver menos" : `Ver más (${inactiveProjects.length - PROJECTS_PREVIEW_LIMIT} más)`}
              </button>
            )}
          </div>
        )}
      </article>

    </section>
  );
};
