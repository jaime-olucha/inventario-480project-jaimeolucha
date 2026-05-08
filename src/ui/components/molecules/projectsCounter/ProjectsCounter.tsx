import { useEffect, useState } from "react";
import { FolderOpen } from "lucide-react";
import "./ProjectsCounter.scss";

interface ProjectsCounterProps {
  count: number;
}

export const ProjectsCounter = ({ count }: ProjectsCounterProps) => {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (count === 0) {
      setDisplayed(0);
      return;
    }
    const duration = 300;
    const steps = Math.min(count, 20);
    const increment = Math.ceil(count / steps);
    const intervalTime = Math.round(duration / steps);
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + increment, count);
      setDisplayed(current);
      if (current >= count) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="projects-counter">
      <FolderOpen size={14} strokeWidth={1.5} />
      <span className="projects-counter__number">{displayed}</span>
      <span className="projects-counter__label">activos</span>
    </div>
  );
};
