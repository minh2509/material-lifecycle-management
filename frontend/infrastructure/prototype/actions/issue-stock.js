function creditWorkshop(balances, issue, item) {
  const index = balances.findIndex((balance) => balance.workshop === issue.workshop && balance.materialCode === item.code);
  if (index >= 0) {
    const balance = balances[index];
    balances[index] = {
      ...balance,
      receivedQty: balance.receivedQty + item.quantity,
      remainingInWorkshop: balance.remainingInWorkshop + item.quantity,
    };
  } else {
    balances.push({
      workshop: issue.workshop,
      materialCode: item.code,
      materialName: item.name,
      unit: item.unit,
      receivedQty: item.quantity,
      usedQty: 0,
      returnedConfirmedQty: 0,
      remainingInWorkshop: item.quantity,
      shift: issue.shift || "Ca1",
      date: new Date().toISOString().slice(0, 10),
      isExplosive: false,
    });
  }
}

export function issueFromStock(state, issue) {
  const issueRequests = issue.requestRef ? state.issueRequests.map((request) => {
    if (request.id !== issue.requestRef) return request;
    const items = request.items.map((item) => {
      const issued = (issue.items || []).filter((row) => row.code === item.code).reduce((sum, row) => sum + row.quantity, 0);
      return { ...item, issuedQty: (item.issuedQty || 0) + issued };
    });
    return { ...request, items };
  }) : state.issueRequests;
  let lots = state.lots;
  const workshopBalances = [...state.workshopBalances];
  (issue.items || []).forEach((item) => {
    lots = lots.map((lot) => lot.lotCode === item.lotCode
      ? { ...lot, availableQuantity: Math.max(0, lot.availableQuantity - item.quantity) } : lot);
    creditWorkshop(workshopBalances, issue, item);
  });
  return { issueRequests, lots, workshopBalances };
}
