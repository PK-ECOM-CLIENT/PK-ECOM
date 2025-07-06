export const convertToAESTWithTimeZone = (utcISOString) => {
  const date = new Date(utcISOString);

  const options = {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short", // Gives "AEST" or "AEDT"
  };

  const formatter = new Intl.DateTimeFormat("en-AU", options);
  return formatter.format(date); // e.g., "06/07/2025, 03:56:30 PM AEST"
};
