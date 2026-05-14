import { useParams } from "react-router-dom";

export const ProjecTeam = () => {
  const { id } = useParams();

  return (
    <section>
      <h1>Detalle del equipo</h1>
      <p>ID: {id}</p>
    </section>
  );
};