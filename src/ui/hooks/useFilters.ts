import { useState } from "react";

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'active', label: 'Solo activos' },
  { value: 'inactive', label: 'Solo inactivos' },
] as const;

export type StatusFilter = 'all' | 'active' | 'inactive';

export function useFilters<T extends { name: string; isActive: boolean }>(
  items: T[], extraSearchFn?: (item: T, query: string) => boolean
) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('active');

  const filtered = items.filter(item => {
    const query = search.toLowerCase();

    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      (extraSearchFn ? extraSearchFn(item, query) : false);

    const matchesStatus =
      status === 'all' ||
      (status === 'active' && item.isActive) ||
      (status === 'inactive' && !item.isActive);

    return matchesSearch && matchesStatus;
  });

  return { search, setSearch, status, setStatus, filtered };
}
