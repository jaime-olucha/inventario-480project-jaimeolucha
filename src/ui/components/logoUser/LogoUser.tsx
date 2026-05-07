import type { User } from "@/domain/models/User/User";
import { getInitials } from "@/infrastructure/helpers/getInitials";

interface LogoUserProps {
  user?: User;
  className?: string;
}


export const LogoUser = ({ user, className }: LogoUserProps) => {

  if (!user) return;

  const initials = getInitials(user.name) + getInitials(user.surname);

  return (
    <p className={className}>{initials}</p>
  )
}
