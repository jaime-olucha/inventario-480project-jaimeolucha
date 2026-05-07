import { useState } from "react";

export const usePagination = (limit: number) => {
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState(false);

  const isFirst = page === 1;

  const goNext = () => setPage(page => page + 1);
  const goPrev = () => setPage(page => page - 1);
  const reset = () => setPage(1);

  return { page, limit, isFirst, isLast, setIsLast, goNext, goPrev, reset };
};
