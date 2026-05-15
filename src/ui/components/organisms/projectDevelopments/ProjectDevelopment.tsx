import { useParams } from "react-router-dom";

export const ProjectDevelopment = () => {
  const { id } = useParams();

  return (
    <section>
      <h1>Detalle del desarrollo</h1>
      <p>ID: {id}</p>
    </section>
  );
};