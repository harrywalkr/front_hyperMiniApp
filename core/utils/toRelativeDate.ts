import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function toRelativeDate(isoDate: string): string {
  const date = dayjs(isoDate);
  const now = dayjs();

  const diffInDays = now.diff(date, "day");

  if (diffInDays >= 2) {
    return date.format("YYYY-MM-DD HH:mm:ss");
  }

  return date.fromNow();
}
