import { issueFromStock } from "./issue-stock.js";

export function createIssuesActions({ getSnapshot, commit }) {
  return {
    createIssueRequest(data) {
      const state = getSnapshot();
      const request = {
        ...data,
        id: `YCX-${new Date().getFullYear()}-${String(state.issueRequests.length + 1).padStart(3, "0")}`,
        requestDate: new Date().toISOString().slice(0, 10),
        status: "Xác nhận",
        items: (data.items || []).map((item) => ({ ...item, issuedQty: 0 })),
      };
      commit({ ...state, issueRequests: [request, ...state.issueRequests] });
      return request;
    },
    createIssue(data, autoApprove = false) {
      const state = getSnapshot();
      const issue = {
        ...data,
        id: `PXK-${new Date().getFullYear()}-${String(state.issues.length + 1).padStart(3, "0")}`,
        issueDate: new Date().toISOString().slice(0, 10),
        status: autoApprove ? "Đã xuất" : "Chờ xuất",
        confirmedBy: autoApprove ? "Nguyễn Văn An" : null,
        totalAmount: (data.items || []).reduce((sum, item) => sum + item.quantity * (item.unitPrice || 0), 0),
      };
      const stock = autoApprove ? issueFromStock(state, issue) : {
        issueRequests: state.issueRequests, lots: state.lots, workshopBalances: [...state.workshopBalances],
      };
      commit({ ...state, ...stock, issues: [issue, ...state.issues] });
      return issue;
    },
    confirmIssue(issueId) {
      const state = getSnapshot();
      const issue = state.issues.find((row) => row.id === issueId);
      if (!issue || issue.status === "Đã xuất") return;
      commit({
        ...state,
        ...issueFromStock(state, issue),
        issues: state.issues.map((row) => row.id === issueId ? { ...row, status: "Đã xuất", confirmedBy: "Nguyễn Văn An" } : row),
      });
    },
    updateWorkshopUsage(workshop, materialCode, usedIncrement) {
      const state = getSnapshot();
      commit({
        ...state,
        workshopBalances: state.workshopBalances.map((balance) => {
          if (balance.workshop !== workshop || balance.materialCode !== materialCode) return balance;
          const usedQty = balance.usedQty + usedIncrement;
          return { ...balance, usedQty, remainingInWorkshop: Math.max(0, balance.receivedQty - usedQty - balance.returnedConfirmedQty) };
        }),
      });
    },
  };
}
