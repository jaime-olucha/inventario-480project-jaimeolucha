import { useParams } from "react-router-dom";

export const ClientDetailPage = () => {
  const { id } = useParams();

  return (
    <section>
      <h1>Detalle del usuario</h1>
      <p>ID: {id}</p>
    </section>
  );
};
