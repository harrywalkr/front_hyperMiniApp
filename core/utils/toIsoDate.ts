/**
 * Converts a given **date** into an **ISO 8601 formatted string**.
 *
 * Supports **Date objects, Unix timestamps, and valid date strings**.
 *
 * @param {Date | number | string} date - The date to convert (Date object, timestamp, or string).
 * @returns {string} The formatted ISO date string (`YYYY-MM-DDTHH:mm:ss.sssZ`).
 * @throws {Error} Throws an error if the input is not a valid date.
 */
export function toIsoDate(date: Date | number | string): string {
  try {
    // If input is already an ISO date string, return it directly
    if (
      typeof date === "string" &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(date)
    ) {
      return date;
    }

    if (date instanceof Date) {
      return date.toISOString();
    }

    if (
      typeof date === "number" ||
      (typeof date === "string" && /^\d+$/.test(date))
    ) {
      // Handle both numeric timestamps and string timestamps
      return new Date(Number(date)).toISOString();
    }

    if (typeof date === "string") {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString();
      }
    }

    return "";
  } catch (error) {
    return "";
  }
}
