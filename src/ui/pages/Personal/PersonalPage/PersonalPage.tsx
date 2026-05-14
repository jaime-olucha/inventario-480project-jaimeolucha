import { Link } from "react-router-dom";
import type { User } from "@/domain/models/User/User";
import type { CreateUserRequest } from "@/domain/models/User/CreateUserRequest";
import { useRepositories } from "@/infrastructure/RepositoryContext/RepositoryContext";
import { useUserStore } from "@/infrastructure/store/user.store";
import { UserPlus } from "lucide-react";
import { getRoleBadge } from "@/infrastructure/helpers/getRoleBadge";
import { ProjectsCounter } from "@/ui/components/molecules/projectsCounter/ProjectsCounter";
import { useEffect, useRef, useState } from "react";
import { CreatePersonalModal } from "./CreatePersonalModal";
import { FiltersCard } from "@/ui/components/organisms/filtersCard/FiltersCard";
import { FilterSelect } from "@/ui/components/molecules/filterSelect/FilterSelect";
import { usePersonalFilters, ROLE_OPTIONS } from "../../../hooks/usePersonalFilters";
import { usePagination } from "../../../hooks/usePagination";
import { PaginationControls } from "../../../components/PaginationControls/PaginationControls";
import './PersonalPage.scss';
import { LogoUser } from "@/ui/components/logoUser/LogoUser";
import { ROUTES } from "@/ui/routes/routes";

const PAGE_LIMIT = 20;

export const PersonalPage = () => {
  const userStore = useUserStore((store) => store.user);
  const { user: userRepo } = useRepositories();
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProjectCounts, setActiveProjectCounts] = useState<Record<string, number>>({});
  const [showFab, setShowFab] = useState(false);
  const addBtnRef = useRef<HTMLButtonElement>(null);

  const { page, limit, isFirst, isLast, setIsLast, goNext, goPrev } = usePagination(PAGE_LIMIT);
  const { search, setSearch, status, setStatus, role, setRole, filteredUsers } = usePersonalFilters(users);

  useEffect(() => {
    if (!userStore) return;
    userRepo.getAll(page, limit).then(result => {
      setUsers(result);
      setIsLast(result.length < limit);
    });
  }, [userRepo, page, limit]);

  useEffect(() => {
    if (users.length === 0) return;
    users.forEach(user => {
      userRepo.getProjects(user.id).then(projects => {
        setActiveProjectCounts(prev => ({
          ...prev,
          [String(user.id)]: projects.filter(p => p.isActive).length,
        }));
      });
    });
  }, [users]);

  useEffect(() => {
    const btn = addBtnRef.current;
    if (!btn) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFab(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(btn);
    return () => observer.disconnect();
  }, []);

  const handleCreateUser = async (data: CreateUserRequest) => {
    await userRepo.createUser(data);
    const result = await userRepo.getAll(page, limit);
    setUsers(result);
    setIsLast(result.length < limit);
  };

  return (
    <section className="section-page">
      <div className="section-page_header">
        <div className="header_title">
          <h1>Personal</h1>
          <p className="info">Gestiona el personal de la empresa</p>
        </div>
        <button ref={addBtnRef} className="add_record" onClick={() => setIsModalOpen(true)}>
          <UserPlus className="iconBtn" /> Nuevo Personal
        </button>
      </div>

      {isModalOpen && (
        <CreatePersonalModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateUser}
          existingEmails={users.map((user) => user.email)}
        />
      )}

      <FiltersCard
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        total={users.length}
        filteredCount={filteredUsers.length}
        entityLabel="persona"
        searchLabel="Buscar persona"
        searchPlaceholder="Nombre o apellido..."
        extraFilters={
          <FilterSelect label="Tipo de acceso" value={role} options={ROLE_OPTIONS} onChange={setRole} />
        }
      />

      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li className="li-map" key={user.id}>
            <Link to={ROUTES.USER.BY_ID(user.id)}>
              <article className={`card card_user ${!user.isActive ? 'user_disabled' : ''}`}>
                <div>
                  <LogoUser user={user} className="logo-user" />
                </div>
                <div className="card-user_info">
                  <h2 className="card-user_label">
                    {user.name} {user.surname} {getRoleBadge(user.role) && <span className="card_badge">{getRoleBadge(user.role)}</span>}
                    {!user.isActive && <span className="card_badge badge-inactive">INACTIVO</span>}
                  </h2>
                  <p className="info"><strong>Correo: </strong>{user.email}</p>
                </div>
                <ProjectsCounter count={activeProjectCounts[user.id] ?? 0} />
              </article>
            </Link>
          </li>
        ))}
      </ul>

      <PaginationControls page={page} isFirst={isFirst} isLast={isLast} onPrev={goPrev} onNext={goNext} />

      {showFab && (
        <button className="add_record add_record--fab" onClick={() => setIsModalOpen(true)}>
          <UserPlus className="iconBtn" />
        </button>
      )}
    </section>
  );
};
