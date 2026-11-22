import { MONTHLY_FLOWS } from "../data/dashboard-demo.js";

export function normalizeWarehouse(selectedWarehouse) {
  if (selectedWarehouse === "kho-chinh" || selectedWarehouse === "warehouse" || selectedWarehouse === "Kho A" || selectedWarehouse === "main") {
    return "main";
  }
  if (selectedWarehouse === "phan-xuong" || selectedWarehouse === "workshop" || selectedWarehouse === "Kho B") {
    return "workshop";
  }
  return "all";
}

export function selectCurrentFlow(periodKey, warehouseKey, isSixMonthMode) {
  const getMonthFlow = (m) => {
    if (warehouseKey === "main") return { ...m.main };
    if (warehouseKey === "workshop") return { ...m.workshop };
    return {
      inBuy: m.main.inBuy + m.workshop.inBuy,
      inRec: m.main.inRec + m.workshop.inRec,
      outProd: m.main.outProd + m.workshop.outProd,
      outFix: m.main.outFix + m.workshop.outFix,
      recIn: m.main.recIn + m.workshop.recIn,
      recScrap: m.main.recScrap + m.workshop.recScrap,
    };
  };

  if (isSixMonthMode) {
    return MONTHLY_FLOWS.reduce(
      (acc, m) => {
        const f = getMonthFlow(m);
        acc.inBuy += f.inBuy;
        acc.inRec += f.inRec;
        acc.outProd += f.outProd;
        acc.outFix += f.outFix;
        acc.recIn += f.recIn;
        acc.recScrap += f.recScrap;
        return acc;
      },
      { inBuy: 0, inRec: 0, outProd: 0, outFix: 0, recIn: 0, recScrap: 0 }
    );
  }

  const found = MONTHLY_FLOWS.find((m) => m.key === periodKey) || MONTHLY_FLOWS[MONTHLY_FLOWS.length - 1];
  return getMonthFlow(found);
}
