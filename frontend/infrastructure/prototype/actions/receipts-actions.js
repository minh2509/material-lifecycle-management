import { receiveIntoStock } from "./receipt-stock.js";

export function createReceiptsActions({ getSnapshot, commit }) {
  return {
    createReceipt(receiptData, autoConfirm = false) {
      const state = getSnapshot();
      const receipt = {
        ...receiptData,
        id: `PNK-${new Date().getFullYear()}-${String(state.receipts.length + 1).padStart(3, "0")}`,
        date: new Date().toISOString().slice(0, 10),
        status: autoConfirm ? "Đã nhập kho" : "Chờ nhập kho",
        confirmedBy: autoConfirm ? "Thủ kho Nguyễn Văn Nam" : null,
      };
      const stock = autoConfirm ? receiveIntoStock(state, receipt)
        : { procurementPlans: state.procurementPlans, lots: [...state.lots] };
      commit({ ...state, ...stock, receipts: [receipt, ...state.receipts] });
      return receipt;
    },
    confirmReceipt(receiptId) {
      const state = getSnapshot();
      const receipt = state.receipts.find((row) => row.id === receiptId);
      if (!receipt || receipt.status === "Đã nhập kho") return;
      commit({
        ...state,
        ...receiveIntoStock(state, receipt),
        receipts: state.receipts.map((row) => row.id === receiptId
          ? { ...row, status: "Đã nhập kho", confirmedBy: "Thủ kho Nguyễn Văn Nam" } : row),
      });
    },
  };
}
