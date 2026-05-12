import { useEffect } from "react";
import './Toast.scss';

interface Props {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, type = "success", onClose, duration = 3000 }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`toast toast--${type}`}>
      {message}
    </div>
  );
};
