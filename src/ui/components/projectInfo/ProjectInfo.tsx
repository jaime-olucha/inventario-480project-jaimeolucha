import { useParams } from "react-router-dom";

export const ProjectInfo = () => {
  const { id } = useParams();

  return (
    <section>
      <h1>Detalle del proyecto</h1>
      <p>ID: {id}</p>
    </section>
  );
};