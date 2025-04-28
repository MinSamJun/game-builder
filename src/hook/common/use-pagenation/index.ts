import { useEffect, useState, useMemo } from "react";

export function usePagination<T>(
  data: T[],
  itemsPerPage: number,
  searchTerm: string
) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(
    () => data.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [data, page, itemsPerPage]
  );

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    page,
    setPage,
    paginatedData,
    totalPages,
    nextPage,
    prevPage,
  };
}
