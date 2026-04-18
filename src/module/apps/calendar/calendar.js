export const DEFAULT_CALENDAR = Object.freeze({
    day: 1,
    month: 1,
    year: 1,
    hour: 0,
    minute: 0,
});

export function normalizeCalendar(calendar = {}) {
    const day = Math.max(1, Number(calendar.day) || 1);
    const month = Math.max(1, Number(calendar.month) || 1);
    const year = Math.max(1, Number(calendar.year) || 1);
    const hour = Math.min(23, Math.max(0, Number(calendar.hour) || 0));

    return {
        day,
        month,
        year,
        hour,
        minute: 0,
    };
}

export function calendarDayKey(calendar = {}) {
    const normalized = normalizeCalendar(calendar);
    return `${normalized.year}-${String(normalized.month).padStart(2, "0")}-${String(normalized.day).padStart(2, "0")}`;
}

export function formatCalendar(calendar = {}) {
    const normalized = normalizeCalendar(calendar);
    return `${String(normalized.day).padStart(2, "0")}/${String(normalized.month).padStart(2, "0")}/${normalized.year} ${String(normalized.hour).padStart(2, "0")}:00`;
}