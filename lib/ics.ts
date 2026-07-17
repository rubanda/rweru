type IcsEvent = {
  slug: string;
  title: string;
  description: string;
  dateIso: string;
  location: string;
};

function toIcsDate(dateIso: string, offsetDays = 0) {
  const date = new Date(`${dateIso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + offsetDays);
  return date.toISOString().slice(0, 10).replace(/-/g, "");
}

function escapeIcsText(value: string) {
  return value.replace(/[\\,;]/g, (match) => `\\${match}`).replace(/\n/g, "\\n");
}

export function buildIcsDataUrl(event: IcsEvent) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RweruSynapse//Community Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.slug}@rweru.com`,
    `DTSTART;VALUE=DATE:${toIcsDate(event.dateIso)}`,
    `DTEND;VALUE=DATE:${toIcsDate(event.dateIso, 1)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const icsContent = lines.join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
}
