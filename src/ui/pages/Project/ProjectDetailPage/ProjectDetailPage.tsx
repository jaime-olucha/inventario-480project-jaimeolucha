import ProjectMenuBar, { type ProjectTab } from "@/ui/components/menuItem/ProjectMenuItem";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "@/infrastructure/store/user.store";
import { useRepositories } from "@/infrastructure/RepositoryContext/RepositoryContext";
import { useCallback, useEffect, useState } from "react";
import { ROUTES } from "@/ui/routes/routes";
import type { EntityId } from "@/domain/value-objects/EntityId";
import { ArrowLeft, FolderX, Trash2, UserCheck } from "lucide-react";
import { SYSTEM_ROLES } from "@/domain/value-objects/SystemRole";
import { ConfirmModal } from "@/ui/components/molecules/confirmModal/ConfirmModal";
import { Toast } from "@/ui/components/molecules/toast/Toast";
import './ProjectDetailPage.scss';
import '@/ui/components/molecules/confirmModal/ConfirmModal.scss';
import { getErrorMessage } from "@/infrastructure/helpers/getErrorMessage";
import type { Project } from "@/domain/models/Project/Project";
import { ProjectInfo } from "@/ui/components/projectInfo/ProjectInfo";
import { ProjecTeam } from "@/ui/components/projectTeam/ProjecTeam";
import { ProjectClients } from "@/ui/components/projectClients/ProjectClients";
import { ProjectDevelopment } from "@/ui/components/projectDevelopments/ProjectDevelopment";
import { ProjectHours } from "@/ui/components/projectHours/ProjectHours";

export const ProjectDetailPage = () => {

  const { id } = useParams<{ id: EntityId }>();
  const navigate = useNavigate();
  const userStore = useUserStore((store) => store.user);
  const { project: projectRepo } = useRepositories();
  const [targetProject, setTargetProject] = useState<Project>();
  const [modalActive, setModalActive] = useState<"inactivar" | "activar" | "eliminar" | null>(null);
  const [loadingPatch, setLoadingPatch] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [activeTab, setActiveTab] = useState<ProjectTab>('info');

  const isAdmin = userStore?.role === SYSTEM_ROLES.ADMIN;
  const isMyProfile = userStore?.id === targetProject?.id;

  useEffect(() => {
    if (!id) return;
    projectRepo.getById(id).then(setTargetProject);
  }, [id, projectRepo]);

  const closeToast = useCallback(() => setToast(null), []);


  const handleToggleActive = async () => {
    if (!id || !projectRepo) return;
    const nextValue = !targetProject?.isActive;
    setLoadingPatch(true);
    try {
      await projectRepo.patchActive(id, nextValue);
      setTargetProject((prev) => prev ? { ...prev, isActive: nextValue } : prev);
      setToast({
        message: nextValue ? "Activado correctamente" : "Inactivado correctamente",
        type: "success"
      });

    } catch (err) {
      setToast({
        message: "No se pudo completar la acción. Inténtalo de nuevo.",
        type: "error"
      });

      console.log(err)

    } finally {
      setLoadingPatch(false);
      setModalActive(null);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    setLoadingPatch(true);

    try {
      await projectRepo.deleteProject(id);

      setToast({
        message: "Empleado eliminado correctamente",
        type: "success"
      });
      setTimeout(() => navigate(ROUTES.USER.LIST), 1500);
    } catch (err) {
      setToast({
        message: getErrorMessage(err),
        type: "error"
      });
      console.log(err);

    } finally {
      setLoadingPatch(false);
      setModalActive(null);
    }
  };

  return (
    <section className="project-detail-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      {modalActive && (
        <ConfirmModal
          title={
            modalActive === "inactivar" ? "Inactivar Proyecto"
              : modalActive === "activar" ? "Activar Proyecto"
                : "Eliminar Proyecto"
          }
          message={
            modalActive === "inactivar"
              ? "¿Estás seguro de que deseas inactivar este proyecto? Los datos no se eliminarán."
              : modalActive === "activar"
                ? "¿Estás seguro de que deseas activar a este proyecto?"
                : "¿Estás seguro de que deseas eliminar a este proyecto? Esta acción no se puede deshacer."
          }
          loading={loadingPatch}
          onConfirm={modalActive === "eliminar" ? handleDelete : handleToggleActive}
          onCancel={() => setModalActive(null)}
        />
      )}

      <div className="project-detail-page_header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate(ROUTES.PROJECTS.LIST)} aria-label="Volver">
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
            {targetProject?.isActive ? (
              <button className="btn-action btn-inactivar" onClick={() => setModalActive("inactivar")}>
                <FolderX size={15} /> Inactivar
              </button>
            ) : (
              <button className="btn-action btn-activar" onClick={() => setModalActive("activar")}>
                <UserCheck size={15} /> Activar
              </button>
            )}
            <button className="btn-action btn-eliminar" onClick={() => setModalActive("eliminar")}>
              <Trash2 size={15} /> Eliminar
            </button>
          </div>
        )}
      </div>
      <ProjectMenuBar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="project-detail-page_content">
        {activeTab === 'info' && <ProjectInfo />}
        {activeTab === 'equipo' && <ProjecTeam />}
        {activeTab === 'cliente' && <ProjectClients />}
        {activeTab === 'desarrollo' && <ProjectDevelopment />}
        {activeTab === 'horas' && <ProjectHours />}
      </div>

    </section>
  );
};
