import type { TimeEntry } from "../../domain/models/User/TimeEntry";

export const getWeeklyHours = (entries: TimeEntry[]) => {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const week = [];

  const today = new Date();
  const currentDay = today.getDay();

  const diffToMonday = currentDay === 0 ? 0 : 1 - currentDay;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  for (let i = 0; i < days.length; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    week.push({
      day: `${days[i]} ${date.getDate()} ${months[date.getMonth()]}`,
      dateISO: date.toISOString().split("T")[0],
      total: 0,
    });
  }

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    for (let j = 0; j < week.length; j++) {
      if (entry.date === week[j].dateISO) {
        week[j].total += entry.hours;
      }
    }
  }
  return week;
};