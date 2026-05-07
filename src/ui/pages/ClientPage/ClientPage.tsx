import { Link } from "react-router-dom";
import type { User } from "@/domain/models/User/User";
import type { CreateUserRequest } from "@/domain/models/User/CreateUserRequest";
import { useRepositories } from "@/infrastructure/RepositoryContext/RepositoryContext";
import { useUserStore } from "@/infrastructure/store/user.store";
import { getRoleBadge } from "@/infrastructure/helpers/getRoleBadge";
import { ListFilter, Search, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { FilterSelect } from "../../components/filterSelect/FilterSelect";
import { usePersonalFilters, STATUS_OPTIONS, ROLE_OPTIONS } from "../../hooks/usePersonalFilters";
import { usePagination } from "../../hooks/usePagination";
import { PaginationControls } from "../../components/PaginationControls/PaginationControls";
import './ClientPage.scss';
import { LogoUser } from "@/ui/components/logoUser/LogoUser";
import { ROUTES } from "@/ui/routes/routes";
import { CreateClientModal } from "./CreateClientModal";

const PAGE_LIMIT = 10;

export const ClientPage = () => {
  const userStore = useUserStore((store) => store.user);
  const { client: clientRepo } = useRepositories();
  const [clients, setClient] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { page, limit, isFirst, isLast, setIsLast, goNext, goPrev } = usePagination(PAGE_LIMIT);
  const { search, setSearch, status, setStatus, role, setRole, filteredUsers } = usePersonalFilters(clients);

  useEffect(() => {
    if (!userStore) return;
    clientRepo.getAll(page, limit).then(result => {
      setClient(result);
      setIsLast(result.length < limit);
    });
  }, [clientRepo, page, limit]);

  const handleCreateUser = async (data: CreateUserRequest) => {
    await clientRepo.createUser(data);
    const result = await clientRepo.getAll(page, limit);
    setClient(result);
    setIsLast(result.length < limit);
  };

  return (
    <section className="section-page">
      <div className="section-page_header">
        <div className="header_title">
          <h1>Personal</h1>
          <p className="info">Gestiona el personal de la empresa</p>
        </div>
        <button className="add_record" onClick={() => setIsModalOpen(true)}>
          <UserPlus className="iconBtn" /> Nuevo Personal
        </button>
      </div>

      {isModalOpen && (
        <CreateClientModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateUser}
          existingEmails={clients.map((client) => client.email)}
        />
      )}

      <article className="card">
        <h2 className="card_header"><ListFilter className="iconSvg" />Filtros y Búsqueda</h2>
        <div className="card_filter">
          <div className="filter_group">
            <label>Buscar persona</label>
            <div className="filter_search">
              <Search className="search_icon" />
              <input type="text" placeholder="Nombre, correo, departamento..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <FilterSelect label="Estado del usuario" value={status} options={STATUS_OPTIONS} onChange={setStatus} />
          <FilterSelect label="Tipo de acceso" value={role} options={ROLE_OPTIONS} onChange={setRole} />
        </div>

        <p className="filter_results">
          Mostrando {filteredUsers.length} de {clients.length} persona{clients.length !== 1 ? 's' : ''}
        </p>
      </article>

      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li className="li-map" key={user.id}>
            <Link to={ROUTES.USER.BY_ID(user.id)}>
              <article className="card card_user">
                <div>
                  <LogoUser user={user} className="logo-user" />
                </div>
                <div className="card-user_info">
                  <h2 className="card-user_label">{user.name} {user.surname} {getRoleBadge(user.role) && <span className="card_badge">{getRoleBadge(user.role)}</span>}</h2>
                  <p className="info"><strong>Correo: </strong>{user.email}</p>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>

      <PaginationControls page={page} isFirst={isFirst} isLast={isLast} onPrev={goPrev} onNext={goNext} />
    </section>
  );
};
