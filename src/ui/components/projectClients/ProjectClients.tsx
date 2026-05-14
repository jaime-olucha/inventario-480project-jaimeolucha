import { useParams } from "react-router-dom";

export const ProjectClients = () => {
  const { id } = useParams();

  return (
    <section>
      <h1>Detalle del clientes</h1>
      <p>ID: {id}</p>
    </section>
  );
};