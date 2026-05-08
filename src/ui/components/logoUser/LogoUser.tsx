import type { Client } from "@/domain/models/Client/Client";
import type { User } from "@/domain/models/User/User";
import { getInitials } from "@/infrastructure/helpers/getInitials";

interface LogoUserProps {
  user?: User | Client;
  className?: string;
}


export const LogoUser = ({ user, className }: LogoUserProps) => {

  if (!user) return;

  const surname = 'surname' in user ? user.surname : undefined;
  const initials = getInitials(user.name, surname);

  return (
    <p className={className}>{initials}</p>
  )
}
