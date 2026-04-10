import { useState, useEffect } from "react";

export function useLiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30_000); // update every 30s
    return () => clearInterval(id);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  const timeStr = `${h12}:${minutes.toString().padStart(2, "0")} ${ampm}`;

  const edition = hours < 12 ? "Morning Edition" : hours < 17 ? "Afternoon Edition" : "Final Edition";

  return { timeStr, edition, date: time };
}
