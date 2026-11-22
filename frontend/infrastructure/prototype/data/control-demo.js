export const INITIAL_DISPOSALS = [
  {
    id: "PXL-2026-001",
    date: "2026-11-16",
    storekeeper: "Nguyễn Văn Nam",
    approvedBy: "Nguyễn Văn An",
    reason: "Tiêu huỷ rác thải gỗ mục nát bảo đảm an toàn phòng cháy",
    responsibleReceiver: "Đội Vệ sinh môi trường Công ty",
    status: "Đã duyệt và xuất",
    items: [
      { scrapId: "SCRAP-002", code: "VC-001", name: "Ván chèn lò vỡ nát mục", unit: "Tấm", quantity: 15 },
    ],
  },
];

export const INITIAL_AUDITS = [
  {
    id: "DKK-2026-11",
    name: "Đợt kiểm kê định kỳ Tháng 11/2026",
    period: "2026-11",
    date: "2026-11-20",
    warehouse: "Kho A",
    team: "Tổ kiểm kê số 1 (Kế hoạch, Kế toán, Thủ kho)",
    status: "Chờ phê duyệt giải trình",
    items: [
      {
        code: "GL-001",
        name: "Gỗ chèn lò (L=2,3-:-2,5m, fi 5,5:-12cm); gỗ bạch đàn rừng trồng",
        unit: "Mét",
        bookQty: 150,
        actualQty: 148,
        diffQty: -2,
        reasonExplanation: "Hao hụt tự nhiên do nứt vỡ trong quá trình bốc xếp bảo quản",
        adjusted: false,
        approvedBy: null,
      },
      {
        code: "GL-002",
        name: "Gỗ chống lò (L=2,35-:-2,45m, fi 13-:-19cm); gỗ bạch đàn rừng trồng",
        unit: "Mét",
        bookQty: 80,
        actualQty: 80,
        diffQty: 0,
        reasonExplanation: "",
        adjusted: false,
        approvedBy: null,
      },
    ],
  },
];
