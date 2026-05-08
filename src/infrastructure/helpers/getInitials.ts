export const getInitials = (name: string = "", surname?: string): string => {
  if (surname) {
    const nameInitial = name?.[0] ?? "";
    const surnameInitial = surname?.[0] ?? "";
    return (nameInitial + surnameInitial).toUpperCase();
  }

  if (!name) return "";

  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};