import { Link } from "react-router-dom";
import { useRepositories } from "@/infrastructure/RepositoryContext/RepositoryContext";
import { useUserStore } from "@/infrastructure/store/user.store";
import { Plus } from "lucide-react";
import { ProjectsCounter } from "@/ui/components/molecules/projectsCounter/ProjectsCounter";
import { useEffect, useState } from "react";
import { FiltersCard } from "@/ui/components/organisms/filtersCard/FiltersCard";
import { usePagination } from "../../hooks/usePagination";
import { PaginationControls } from "../../components/PaginationControls/PaginationControls";
import './ClientPage.scss';
import { LogoUser } from "@/ui/components/logoUser/LogoUser";
import { ROUTES } from "@/ui/routes/routes";
import type { Client } from "@/domain/models/Client/Client";
import { useFilters } from "@/ui/hooks/useFilters";
import type { CreateClientRequest } from "@/domain/models/Client/CreateClientRequest";
import { CreateClientModal } from "./CreateClientModal";

const PAGE_LIMIT = 20;

export const ClientPage = () => {
  const userStore = useUserStore((store) => store.user);
  const { client: clientRepo } = useRepositories();
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProjectCounts, setActiveProjectCounts] = useState<Record<string, number>>({});

  const { page, limit, isFirst, isLast, setIsLast, goNext, goPrev } = usePagination(PAGE_LIMIT);
  const { search, setSearch, status, setStatus, filtered } = useFilters(clients);

  useEffect(() => {
    if (!userStore) return;
    clientRepo.getAll(page, limit).then(result => {
      setClients(result);
      setIsLast(result.length < limit);
    });
  }, [clientRepo, page, limit]);

  useEffect(() => {
    if (clients.length === 0) return;
    clients.forEach(client => {
      clientRepo.getProjects(client.id).then(projects => {
        setActiveProjectCounts(prev => ({
          ...prev,
          [String(client.id)]: projects.filter(p => p.isActive).length,
        }));
      });
    });
  }, [clients]);


  const handleCreateClient = async (data: CreateClientRequest) => {
    await clientRepo.createClient(data);
    const result = await clientRepo.getAll(page, limit);
    setClients(result);
    setIsLast(result.length < limit);
  };

  return (
    <section className="section-page">
      <div className="section-page_header">
        <div className="header_title">
          <h1>Clientes</h1>
          <p className="info">Gestiona los clientes de la empresa</p>
        </div>
        <button className="add_record" onClick={() => setIsModalOpen(true)}>
          <Plus className="iconBtn" /> Nuevo Cliente
        </button>
      </div>

      {isModalOpen && (
        <CreateClientModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateClient}
        />
      )}

      <FiltersCard
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        total={clients.length}
        filteredCount={filtered.length}
        entityLabel="cliente"
        searchLabel="Buscar Cliente"
        searchPlaceholder="Nombre..."

      />

      <ul className="user-list">
        {filtered.map((client) => (
          <li className="li-map" key={client.id}>
            <Link to={ROUTES.USER.BY_ID(client.id)}>
              <article className="card card_user">
                <div>
                  <LogoUser user={client} className="logo-user" />
                </div>
                <div className="card-user_info">
                  <h2 className="card-user_label">{client.name}</h2>
                  <p className="info"><strong>Sector: </strong>{client.sectorName}</p>
                </div>
                <ProjectsCounter count={activeProjectCounts[String(client.id)] ?? 0} />
              </article>
            </Link>
          </li>
        ))}
      </ul>

      <PaginationControls page={page} isFirst={isFirst} isLast={isLast} onPrev={goPrev} onNext={goNext} />
    </section>
  );
};
