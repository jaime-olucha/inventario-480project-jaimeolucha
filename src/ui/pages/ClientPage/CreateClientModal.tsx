import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Building2 } from "lucide-react";
import { useRepositories } from "@/infrastructure/RepositoryContext/RepositoryContext";
import type { Sector } from "@/domain/models/Client/Sector";
import type { CreateClientRequest } from "@/domain/models/Client/CreateClientRequest";
import "./CreateClientModal.scss";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  sectorId: z.string().min(1, "El sector es obligatorio"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onClose: () => void;
  onSubmit: (data: CreateClientRequest) => Promise<void>;
}

export const CreateClientModal = ({ onClose, onSubmit }: Props) => {
  const { sector: sectorRepo } = useRepositories();
  const [sectors, setSectors] = useState<Sector[]>([]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    sectorRepo.getAll().then(setSectors);
  }, [sectorRepo]);

  const handleCreate = async (data: FormValues) => {
    await onSubmit({ name: data.name, sectorId: data.sectorId });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal_header">
          <h2><Building2 className="iconHeader" /> Nuevo Cliente</h2>
          <button type="button" className="modal_close" onClick={onClose}><X size={20} /></button>
        </div>

        <form className="modal_form" onSubmit={handleSubmit(handleCreate)}>
          <div className="form_field">
            <label htmlFor="name">Nombre del cliente</label>
            <input id="name" type="text" placeholder="Nombre de la empresa..." {...register("name")} />
            {errors.name && <span className="form_error">{errors.name.message}</span>}
          </div>

          <div className="form_field">
            <label htmlFor="sectorId">Sector</label>
            <select id="sectorId" {...register("sectorId")}>
              <option value="">Selecciona un sector...</option>
              {sectors.map(sector => (
                <option key={sector.id} value={sector.id}>{sector.name}</option>
              ))}
            </select>
            {errors.sectorId && <span className="form_error">{errors.sectorId.message}</span>}
          </div>

          <div className="modal_actions">
            <button type="button" className="btn_secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn_primary" disabled={isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear cliente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
