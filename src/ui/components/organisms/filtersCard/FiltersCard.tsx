import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ListFilter, Search } from "lucide-react";
import { FilterSelect } from "@/ui/components/molecules/filterSelect/FilterSelect";
import { STATUS_OPTIONS } from "@/ui/hooks/useFilters";
import "./FiltersCard.scss";

interface FiltersCardProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  total: number;
  filteredCount: number;
  entityLabel: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  extraFilters?: React.ReactNode;
}

function getScrollParent(el: HTMLElement): HTMLElement {
  let node = el.parentElement;
  while (node) {
    const { overflow, overflowY } = window.getComputedStyle(node);
    if (/auto|scroll/.test(overflow + overflowY)) return node;
    node = node.parentElement;
  }
  return document.documentElement;
}

export const FiltersCard = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  total,
  filteredCount,
  entityLabel,
  searchLabel = "Buscar",
  searchPlaceholder = "Escribe para filtrar...",
  extraFilters,
}: FiltersCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [fixedTop, setFixedTop] = useState(0);
  const [fixedLeft, setFixedLeft] = useState(0);
  const [fixedWidth, setFixedWidth] = useState(0);
  const [naturalHeight, setNaturalHeight] = useState(0);

  useEffect(() => {
    if (!cardRef.current) return;
    const parent = getScrollParent(cardRef.current);

    const measure = () => {
      if (!cardRef.current) return;
      const parentRect = parent.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();
      const pt = parseFloat(getComputedStyle(parent).paddingTop);
      setFixedTop(parentRect.top + pt);
      setFixedLeft(cardRect.left);
      setFixedWidth(cardRect.width);
      setNaturalHeight(cardRef.current.offsetHeight);
    };

    measure();
    window.addEventListener('resize', measure);

    const handleScroll = () => setScrolled(parent.scrollTop > 80);
    parent.addEventListener('scroll', handleScroll);

    return () => {
      parent.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const fixedStyle: CSSProperties | undefined = scrolled ? {
    position: 'fixed',
    top: fixedTop,
    left: fixedLeft,
    width: fixedWidth,
    zIndex: 1000,
  } : undefined;

  return (
    <>
      {scrolled && <div style={{ height: naturalHeight }} />}
      <article
        ref={cardRef}
        className={`filters-card${scrolled ? ' filters-card--scrolled' : ''}`}
        style={fixedStyle}
      >
        <h2 className="filters-card__header">
          <ListFilter className="filters-card__icon" />
          Filtros y Búsqueda
        </h2>
        <div className="filters-card__grid">
          <div className="filter_group">
            <label>{searchLabel}</label>
            <div className="filter_search">
              <Search className="search_icon" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={e => onSearchChange(e.target.value)}
              />
            </div>
          </div>
          <FilterSelect
            label="Estado"
            value={status}
            options={STATUS_OPTIONS}
            onChange={onStatusChange}
          />
          {extraFilters}
        </div>
        <p className="filters-card__results">
          Mostrando {filteredCount} de {total} {entityLabel}{total !== 1 ? 's' : ''}
        </p>
      </article>
    </>
  );
};
