import { useNavigate, useParams } from "react-router-dom";
import { useRepositories } from "@/infrastructure/RepositoryContext/RepositoryContext";
import { useEffect, useState } from "react";
import type { Client } from "@/domain/models/Client/Client";
import type { EntityId } from "@/domain/value-objects/EntityId";
import { ArrowLeft, UserX } from "lucide-react";
import { ROUTES } from "@/ui/routes/routes";

export const ClientDetailPage = () => {
  const { id } = useParams<{ id: EntityId }>();
  const navigate = useNavigate();
  const { client: clientRepo } = useRepositories();

  const [client, setClient] = useState<Client>();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    clientRepo.getById(id).then(setClient);
  }, [id, clientRepo]);

  const handleInactivar = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      await clientRepo.patchActive(id, false);
      setClient((prev) => prev ? { ...prev, isActive: false } : prev);
      setConfirming(false);
    } catch {
      setError("No se pudo inactivar el cliente. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigate(ROUTES.CLIENTS.LIST)} aria-label="Volver">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1>{client?.name ?? "Detalle de Cliente"}</h1>
            {client && <p>{client.isActive ? "Cliente activo" : "Cliente inactivo"}</p>}
          </div>
        </div>

        {client?.isActive && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {confirming ? (
              <>
                <span style={{ fontSize: 14 }}>¿Confirmas inactivar este cliente?</span>
                <button onClick={() => setConfirming(false)} disabled={loading}>
                  Cancelar
                </button>
                <button onClick={handleInactivar} disabled={loading}>
                  {loading ? "Procesando..." : "Confirmar"}
                </button>
              </>
            ) : (
              <button onClick={() => setConfirming(true)}>
                <UserX size={15} /> Inactivar
              </button>
            )}
          </div>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>ID: {id}</p>
    </section>
  );
};
