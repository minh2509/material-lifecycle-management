import { isDateWithin, formatDateVN } from "../../../shared/utils/date-utils.js";

export function calculateMovements(items = [], initialStocks = [], movements = [], warehouse = "all", dateRange = {}) {
  return items.map((item) => {
    // Filter stocks
    const matchedStocks = initialStocks.filter(
      (s) => s.materialCode === item.code && (warehouse === "all" || s.warehouse === warehouse)
    );
    const openingStock = matchedStocks.reduce((sum, s) => sum + s.quantity, 0);

    // Filter movements in period
    const matchedMovements = movements.filter(
      (m) =>
        m.materialCode === item.code &&
        (warehouse === "all" || m.warehouse === warehouse) &&
        isDateWithin(m.date, dateRange.start, dateRange.end)
    );

    const inQty = matchedMovements.filter((m) => m.type === "IN").reduce((sum, m) => sum + m.quantity, 0);
    const outQty = matchedMovements.filter((m) => m.type === "OUT").reduce((sum, m) => sum + m.quantity, 0);
    const closingStock = openingStock + inQty - outQty;

    return {
      ...item,
      openingStock,
      inQty,
      outQty,
      closingStock,
    };
  });
}

export function calculateUnitSummaries(inventoryList = []) {
  const summaries = {
    "Cái": 0,
    "Mét": 0,
    "Bộ": 0,
    "Đôi": 0,
  };

  inventoryList.forEach((item) => {
    const rawUnit = (item.unit || "").trim();
    // Match common unit representations
    let normalized = "Cái";
    if (/^(mét|m)$/i.test(rawUnit)) normalized = "Mét";
    else if (/^bộ$/i.test(rawUnit)) normalized = "Bộ";
    else if (/^đôi$/i.test(rawUnit)) normalized = "Đôi";
    else if (/^cái$/i.test(rawUnit)) normalized = "Cái";

    if (summaries[normalized] !== undefined) {
      summaries[normalized] += item.closingStock;
    }
  });

  return summaries;
}

export function calculateAlerts(allWarehouseInventory = [], thresholds = {}) {
  const alerts = [];

  allWarehouseInventory.forEach((item) => {
    const threshold = thresholds[item.code];
    if (threshold && threshold > 0 && item.closingStock < threshold) {
      const deficit = threshold - item.closingStock;
      const ratio = Math.min(100, Math.round((item.closingStock / threshold) * 100));
      alerts.push({
        ...item,
        totalStock: item.closingStock,
        threshold,
        deficit,
        ratio,
      });
    }
  });

  return alerts;
}

export function calculateDetailList(items = [], initialStocks = [], movements = [], dateRange = {}) {
  const warehouses = ["Kho A", "Kho B", "Kho C"];
  const list = [];

  items.forEach((item) => {
    warehouses.forEach((wh) => {
      const initStock = initialStocks
        .filter((s) => s.materialCode === item.code && s.warehouse === wh)
        .reduce((sum, s) => sum + s.quantity, 0);

      const whMovements = movements.filter(
        (m) => m.materialCode === item.code && m.warehouse === wh && isDateWithin(m.date, dateRange.start, dateRange.end)
      );

      const inQty = whMovements.filter((m) => m.type === "IN").reduce((sum, m) => sum + m.quantity, 0);
      const outQty = whMovements.filter((m) => m.type === "OUT").reduce((sum, m) => sum + m.quantity, 0);
      const stock = initStock + inQty - outQty;

      list.push({
        code: item.code,
        name: item.name,
        group: item.group || "Chưa phân loại",
        unit: (item.unit || "").trim(),
        warehouse: wh,
        quantity: stock,
      });
    });
  });

  return list;
}

export function calculateMonthlyBreakdown(
  materialCode,
  movements = [],
  dateRange = {},
  warehouse = "all",
  asOf = "2026-11-20"
) {
  if (!materialCode || !dateRange.start || !dateRange.end) return [];

  const [startYear, startMonth] = dateRange.start.split("-").map(Number);
  const [endYear, endMonth] = dateRange.end.split("-").map(Number);

  const months = [];
  let curYear = startYear;
  let curMonth = startMonth;

  while (curYear < endYear || (curYear === endYear && curMonth <= endMonth)) {
    const monthKey = `${curYear}-${String(curMonth).padStart(2, "0")}`;
    const daysInMonth = new Date(curYear, curMonth, 0).getDate();
    const monthEndDate = `${curYear}-${String(curMonth).padStart(2, "0")}-${String(daysInMonth).padStart(2, "0")}`;
    const hasCoverage = !asOf || monthKey <= asOf.slice(0, 7);

    let asOfNote = null;
    if (hasCoverage && asOf && monthKey === asOf.slice(0, 7) && asOf < monthEndDate) {
      asOfNote = `Số liệu đến ${formatDateVN(asOf)}`;
    }

    let inQty = 0;
    let outQty = 0;

    if (hasCoverage) {
      const monthMovements = movements.filter((m) => {
        if (m.materialCode !== materialCode) return false;
        if (warehouse !== "all" && m.warehouse !== warehouse) return false;
        if (!m.date.startsWith(monthKey)) return false;
        if (!isDateWithin(m.date, dateRange.start, dateRange.end)) return false;
        if (asOf && m.date > asOf) return false;
        return true;
      });

      inQty = monthMovements.filter((m) => m.type === "IN").reduce((sum, m) => sum + m.quantity, 0);
      outQty = monthMovements.filter((m) => m.type === "OUT").reduce((sum, m) => sum + m.quantity, 0);
    }

    months.push({
      monthKey,
      label: `T${curMonth}/${curYear}`,
      fullLabel: `Tháng ${curMonth}/${curYear}`,
      hasCoverage,
      asOfNote,
      inQty: hasCoverage ? inQty : null,
      outQty: hasCoverage ? outQty : null,
    });

    curMonth++;
    if (curMonth > 12) {
      curMonth = 1;
      curYear++;
    }
  }

  return months;
}
