export function createRecoveryActions({ getSnapshot, commit }) {
  return {
    createRecovery(recData) {
      const currentStore = getSnapshot();
      const newId = `PTH-${new Date().getFullYear()}-${String(currentStore.recoveries.length + 1).padStart(3, "0")}`;
      const newRec = { ...recData, id: newId, createdDate: new Date().toISOString().slice(0, 10), status: "Duyệt" };
      commit({ ...currentStore, recoveries: [newRec, ...currentStore.recoveries] });
      return newRec;
    },
    evaluateRecoveryItem(recId, itemId, evalResult) {
      const currentStore = getSnapshot();
      commit({
        ...currentStore,
        recoveries: currentStore.recoveries.map((rec) => {
          if (rec.id === recId) {
            const updatedItems = rec.items.map((it) => {
              if (it.id === itemId) {
                return {
                  ...it,
                  evaluation: {
                    ...it.evaluation,
                    ...evalResult,
                    status: "Đã đánh giá",
                    evaluator: "KTV Lê Hoàng Long",
                    approvedBy: "Nguyễn Văn An",
                  },
                };
              }
              return it;
            });
            return { ...rec, items: updatedItems };
          }
          return rec;
        }),
      });
    },
  };
}
