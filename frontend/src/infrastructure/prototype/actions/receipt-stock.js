export function receiveIntoStock(state, receipt) {
  const procurementPlans = state.procurementPlans.map((plan) => {
    if (receipt.type !== "Mua sắm" || !receipt.referenceNo || plan.contractNo !== receipt.referenceNo) return plan;
    const items = plan.items.map((item) => {
      const received = (receipt.items || []).find((row) => row.code === item.code);
      return received ? { ...item, importedQuantity: (item.importedQuantity || 0) + (received.actualQuantity || 0) } : item;
    });
    return { ...plan, items };
  });
  const lots = [...state.lots];
  (receipt.items || []).forEach((item, index) => {
    const date = new Date().toISOString().slice(0, 10);
    const lotCode = `LOT-${date.replace(/-/g, "")}-${String(lots.length + index + 1).padStart(3, "0")}`;
    lots.push({
      lotCode,
      materialCode: item.code,
      materialName: item.name,
      importDate: date,
      sourceDoc: `${receipt.id} (${receipt.referenceNo})`,
      condition: item.condition || "Mới",
      warehouse: item.warehouse || receipt.warehouse || "Kho A",
      initialQuantity: item.actualQuantity,
      availableQuantity: item.actualQuantity,
      unitPrice: item.unitPrice || 0,
      unit: item.unit,
    });
  });
  return { procurementPlans, lots };
}
