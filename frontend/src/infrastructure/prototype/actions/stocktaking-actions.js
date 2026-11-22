export function createStocktakingActions({ getSnapshot, commit }) {
  return {
    createAuditSession(auditData) {
      const currentStore = getSnapshot();
      const newId = `DKK-${new Date().getFullYear()}-${String(currentStore.audits.length + 1).padStart(2, "0")}`;
      const newAudit = { ...auditData, id: newId, date: new Date().toISOString().slice(0, 10), status: "Chờ phê duyệt giải trình" };
      commit({ ...currentStore, audits: [newAudit, ...currentStore.audits] });
      return newAudit;
    },
    approveAuditAdjustment(auditId, approver = "Nguyễn Văn An") {
      const currentStore = getSnapshot();
      commit({
        ...currentStore,
        audits: currentStore.audits.map((a) => {
          if (a.id === auditId) {
            const updatedItems = a.items.map((it) => ({ ...it, adjusted: true, approvedBy: approver }));
            return { ...a, status: "Đã phê duyệt điều chỉnh", items: updatedItems };
          }
          return a;
        }),
      });
    },
  };
}
