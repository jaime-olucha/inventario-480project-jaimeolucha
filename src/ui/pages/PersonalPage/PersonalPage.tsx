import type { User } from "@/domain/models/User/User";
import type { CreateUserRequest } from "@/domain/models/User/CreateUserRequest";
import { useRepositories } from "@/infrastructure/RepositoryContext/RepositoryContext";
import { useUserStore } from "@/infrastructure/store/user.store";
import { ListFilter, Search, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { CreatePersonalModal } from "./CreatePersonalModal";
import { FilterSelect } from "./FilterSelect";
import { usePersonalFilters, STATUS_OPTIONS, ROLE_OPTIONS } from "../../hooks/usePersonalFilters";
import './PersonalPage.scss';

export const PersonalPage = () => {
  const userStore = useUserStore((store) => store.user);
  const { user: userRepo } = useRepositories();
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { search, setSearch, status, setStatus, role, setRole, filteredUsers } = usePersonalFilters(users);

  useEffect(() => {
    if (!userStore) return;
    userRepo.getAll().then(setUsers);

  }, [userRepo]);

  const handleCreateUser = async (data: CreateUserRequest) => {
    const newUser = await userRepo.createUser(data);
    setUsers((prev) => [...prev, newUser]);
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
        <CreatePersonalModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateUser}
          existingEmails={users.map((u) => u.email)}
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
          Mostrando {filteredUsers.length} de {users.length} persona{users.length !== 1 ? 's' : ''}
        </p>
      </article>
    </section>
  );
};
