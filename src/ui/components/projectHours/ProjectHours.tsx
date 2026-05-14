import { useParams } from "react-router-dom";

export const ProjectHours = () => {
  const { id } = useParams();

  return (
    <section>
      <h1>Detalle de las horas</h1>
      <p>ID: {id}</p>
    </section>
  );
};