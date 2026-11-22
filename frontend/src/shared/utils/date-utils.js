/**
 * Date and period utilities aligned with Vietnam Time (ICT, UTC+7).
 */

export function getDefaultPeriod() {
  return {
    start: "2026-11-01",
    end: "2026-11-30",
    label: "Tháng 11/2026",
    key: "2026-11",
    monthIndex: 5,
  };
}

export function getAvailablePeriods() {
  return [
    { key: "2026-11", label: "Tháng 11/2026 (Kỳ hiện tại)", start: "2026-11-01", end: "2026-11-30", monthIndex: 5 },
    { key: "2026-10", label: "Tháng 10/2026", start: "2026-10-01", end: "2026-10-31", monthIndex: 4 },
    { key: "2026-09", label: "Tháng 09/2026", start: "2026-09-01", end: "2026-09-30", monthIndex: 3 },
    { key: "2026-08", label: "Tháng 08/2026", start: "2026-08-01", end: "2026-08-31", monthIndex: 2 },
    { key: "2026-07", label: "Tháng 07/2026", start: "2026-07-01", end: "2026-07-31", monthIndex: 1 },
    { key: "2026-06", label: "Tháng 06/2026", start: "2026-06-01", end: "2026-06-30", monthIndex: 0 },
    { key: "2026-Q4", label: "Quý 4/2026", start: "2026-10-01", end: "2026-12-31" },
    { key: "all-6-months", label: "Toàn bộ chu kỳ 6 tháng", start: "2026-06-01", end: "2026-11-30", monthIndex: null },
  ];
}

export function formatDateVN(dateInput) {
  if (!dateInput) return "";
  const parts = String(dateInput).split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateInput;
}

export function isDateWithin(dateStr, startDate, endDate) {
  if (!dateStr) return false;
  if (startDate && dateStr < startDate) return false;
  if (endDate && dateStr > endDate) return false;
  return true;
}
