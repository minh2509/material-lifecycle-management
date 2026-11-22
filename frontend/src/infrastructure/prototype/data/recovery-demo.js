export const INITIAL_RECOVERIES = [
  {
    id: "PTH-2026-001",
    createdDate: "2026-11-12",
    workshop: "Phân xưởng Khai thác 1",
    content: "Thu hồi gỗ chống lò cũ sau khi kết thúc diện khấu gương 14",
    status: "Duyệt",
    warehouse: "Kho B",
    receiptRef: "PNK-2026-002",
    items: [
      {
        id: "rec-item-1",
        code: "GL-002",
        name: "Gỗ chống lò (L=2,35-:-2,45m, fi 13-:-19cm); gỗ bạch đàn rừng trồng",
        unit: "Mét",
        quantity: 10,
        category: "Cũ",
        reason: "Diện khấu đã kết thúc chu kỳ chống",
        conditionDesc: "Bề mặt trầy xước, nứt đầu 2 cọc, 8 cọc thân còn chắc chắn",
        proposedHandling: "Sửa chữa",
        evaluation: {
          status: "Đã đánh giá",
          evaluator: "KTV Lê Hoàng Long",
          approvedBy: "Nguyễn Văn An",
          reuseQty: 3,
          repairQty: 5,
          scrapQty: 2,
          scrapReason: "Mục ruột quá 50% không thể gia cố",
          unevaluatedQty: 0,
        },
      },
    ],
  },
];

export const INITIAL_REPAIRS = [
  {
    id: "PSC-2026-001",
    recoveryRef: "PTH-2026-001",
    materialCode: "GL-002",
    materialName: "Gỗ chống lò (L=2,35-:-2,45m, fi 13-:-19cm); gỗ bạch đàn rừng trồng",
    repairQty: 5,
    sparePartsUsed: [
      { code: "VC-001", name: "Ván chèn đệm gia cố", qty: 2, unitPrice: 32000, total: 64000 },
    ],
    sparePartsReturned: 0,
    netSparePartsCost: 64000,
    acceptedQty: 4,
    failedQty: 1,
    restoredUnitPrice: 16000,
    status: "Đã nghiệm thu nhập lại",
    date: "2026-11-15",
  },
];

export const INITIAL_SCRAPS = [
  {
    id: "SCRAP-001",
    code: "GL-002",
    name: "Gỗ chống lò phế liệu nứt mục",
    unit: "Mét",
    quantity: 2,
    source: "PTH-2026-001 (Đánh giá kỹ thuật loại)",
    date: "2026-11-13",
    location: "Bãi phế liệu Kho B",
    status: "Chờ thanh lý",
  },
  {
    id: "SCRAP-002",
    code: "VC-001",
    name: "Ván chèn lò vỡ nát mục",
    unit: "Tấm",
    quantity: 15,
    source: "Thu dọn mặt bằng phân xưởng 2",
    date: "2026-11-10",
    location: "Khu phế liệu Kho C",
    status: "Đã xuất xử lý",
  },
];
