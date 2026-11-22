export function createProcurementActions({ getSnapshot, commit }) {
  return {
    createProcurementPlan(planData) {
      const currentStore = getSnapshot();
      const newId = `DTMS-${new Date().getFullYear()}-${String(currentStore.procurementPlans.length + 1).padStart(3, "0")}`;
      const newPlan = {
        ...planData,
        id: newId,
        createdDate: new Date().toISOString().slice(0, 10),
        status: "Khởi tạo",
        items: (planData.items || []).map((it) => ({ ...it, importedQuantity: 0 })),
      };
      commit({ ...currentStore, procurementPlans: [newPlan, ...currentStore.procurementPlans] });
      return newPlan;
    },
    approveProcurementPlan(planId, approverName = "Nguyễn Văn An") {
      const currentStore = getSnapshot();
      commit({
        ...currentStore,
        procurementPlans: currentStore.procurementPlans.map((p) =>
          p.id === planId ? { ...p, status: "Duyệt", approver: approverName } : p
        ),
      });
    },
  };
}
