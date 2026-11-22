export const INITIAL_ISSUE_REQUESTS = [
  {
    id: "YCX-2026-001",
    requestDate: "2026-11-10",
    workshop: "Phân xưởng Khai thác 1",
    receiver: "Trần Văn Hùng",
    neededTime: "2026-11-11 Ca 1",
    purpose: "Chống chèn lò gương khai thác than vỉa 14",
    status: "Xác nhận",
    items: [
      { code: "GL-001", name: "Gỗ chèn lò", unit: "Mét", requestedQty: 30, issuedQty: 15, condition: "Mới" },
      { code: "GL-002", name: "Gỗ chống lò", unit: "Mét", requestedQty: 20, issuedQty: 0, condition: "Mới" },
    ],
  },
];

export const INITIAL_ISSUES = [
  {
    id: "PXK-2026-001",
    requestRef: "YCX-2026-001",
    issueDate: "2026-11-11",
    content: "Xuất gỗ chèn lò đợt 1 phục vụ ca 1 Phân xưởng Khai thác 1",
    storekeeper: "Nguyễn Văn Nam",
    workshop: "Phân xưởng Khai thác 1",
    receiver: "Trần Văn Hùng",
    shift: "Ca1",
    status: "Đã xuất",
    confirmedBy: "Nguyễn Văn An",
    totalAmount: 675000,
    repairRef: "",
    repairMaterialRef: "",
    items: [
      {
        code: "GL-001",
        name: "Gỗ chèn lò (L=2,3-:-2,5m, fi 5,5:-12cm); gỗ bạch đàn rừng trồng",
        unit: "Mét",
        lotCode: "LOT-20261105-001",
        quantity: 15,
        unitPrice: 45000,
        totalAmount: 675000,
        warehouse: "Kho A",
      },
    ],
  },
];

export const INITIAL_WORKSHOP_BALANCES = [
  {
    workshop: "Phân xưởng Khai thác 1",
    materialCode: "GL-001",
    materialName: "Gỗ chèn lò",
    unit: "Mét",
    receivedQty: 15,
    usedQty: 12,
    returnedConfirmedQty: 0,
    remainingInWorkshop: 3,
    shift: "Ca1",
    date: "2026-11-21",
    isExplosive: false,
  },
];
