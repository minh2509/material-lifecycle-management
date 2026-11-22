export function createDisposalActions({ getSnapshot, commit }) {
  return {
    createDisposalVoucher(dispData) {
      const currentStore = getSnapshot();
      const newId = `PXL-${new Date().getFullYear()}-${String(currentStore.disposals.length + 1).padStart(3, "0")}`;
      const newDisp = {
        ...dispData,
        id: newId,
        date: new Date().toISOString().slice(0, 10),
        status: "Đã duyệt và xuất",
        storekeeper: "Nguyễn Văn Nam",
        approvedBy: "Nguyễn Văn An",
      };

      const scrapIds = (dispData.items || []).map((i) => i.scrapId);
      const updatedScraps = currentStore.scraps.map((s) => (scrapIds.includes(s.id) ? { ...s, status: "Đã xuất xử lý" } : s));

      commit({
        ...currentStore,
        disposals: [newDisp, ...currentStore.disposals],
        scraps: updatedScraps,
      });
      return newDisp;
    },
  };
}
