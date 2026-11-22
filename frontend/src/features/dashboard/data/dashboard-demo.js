export const INVENTORY_ITEMS = [
  { code: "VT-VB-01", name: "Vòng bi cầu SKF 6205-2Z", unit: "Cái", qtyMain: 45, qtyWorkshop: 12, status: "active" },
  { code: "VT-DT-02", name: "Dầu thủy lực AW-46", unit: "Lít", qtyMain: 120, qtyWorkshop: 35, status: "active" },
  { code: "VT-DC-03", name: "Dây curoa răng B-68", unit: "Sợi", qtyMain: 28, qtyWorkshop: 8, status: "active" },
  { code: "VT-VD-04", name: "Van điều áp khí nén SMC", unit: "Bộ", qtyMain: 14, qtyWorkshop: 6, status: "active" },
  { code: "VT-CD-05", name: "Cáp điện động lực 3x50mm", unit: "Mét", qtyMain: 210, qtyWorkshop: 60, status: "active" },
  { code: "VT-BL-06", name: "Bu lông cường độ cao M16x80", unit: "Bộ", qtyMain: 242, qtyWorkshop: 40, status: "active" },
  { code: "VT-OC-07", name: "Ống dẫn dầu cao áp 1/2\"", unit: "Mét", qtyMain: 65, qtyWorkshop: 18, status: "active" },
  { code: "VT-PL-08", name: "Phớt chắn dầu Viton 45x65", unit: "Cái", qtyMain: 34, qtyWorkshop: 10, status: "active" },
  { code: "VT-CB-09", name: "Cầu dao tự động MCCB 100A", unit: "Cái", qtyMain: 9, qtyWorkshop: 0, status: "active" },
  { code: "VT-RL-10", name: "Rơ-le nhiệt bảo vệ động cơ", unit: "Cái", qtyMain: 16, qtyWorkshop: 0, status: "active" },
  { code: "VT-LG-11", name: "Lọc gió máy nén khí trục vít", unit: "Cái", qtyMain: 11, qtyWorkshop: 0, status: "active" },
  { code: "VT-QT-12", name: "Quạt tản nhiệt tủ điều khiển", unit: "Cái", qtyMain: 18, qtyWorkshop: 0, status: "active" },
  { code: "VT-DC-13", name: "Động cơ điện 3 pha 7.5kW", unit: "Bộ", qtyMain: 3, qtyWorkshop: 2, status: "eval" },
  { code: "VT-AS-14", name: "Cảm biến áp suất đường ống", unit: "Cái", qtyMain: 5, qtyWorkshop: 3, status: "eval" },
  { code: "VT-BT-15", name: "Băng tải cao su chịu nhiệt", unit: "Cuộn", qtyMain: 2, qtyWorkshop: 0, status: "eval" },
  { code: "VT-BH-16", name: "Máy nén khí trục vít 15HP", unit: "Bộ", qtyMain: 1, qtyWorkshop: 1, status: "repair" },
  { code: "VT-TB-17", name: "Tủ biến tần điều khiển tốc độ", unit: "Bộ", qtyMain: 2, qtyWorkshop: 0, status: "repair" },
  { code: "VT-PL-18", name: "Lô trục ép thép hao mòn cũ", unit: "Lô", qtyMain: 1, qtyWorkshop: 1, status: "scrap" },
];

export const MONTHLY_FLOWS = [
  {
    key: "2026-06", label: "T6", full: "Tháng 06/2026", orderName: "Tháng 1 (06/2026)",
    main: { inBuy: 28, inRec: 3, outProd: 18, outFix: 3, recIn: 8, recScrap: 2 },
    workshop: { inBuy: 0, inRec: 1, outProd: 5, outFix: 2, recIn: 3, recScrap: 1 },
  },
  {
    key: "2026-07", label: "T7", full: "Tháng 07/2026", orderName: "Tháng 2 (07/2026)",
    main: { inBuy: 32, inRec: 4, outProd: 19, outFix: 4, recIn: 9, recScrap: 2 },
    workshop: { inBuy: 0, inRec: 2, outProd: 6, outFix: 2, recIn: 3, recScrap: 1 },
  },
  {
    key: "2026-08", label: "T8", full: "Tháng 08/2026", orderName: "Tháng 3 (08/2026)",
    main: { inBuy: 30, inRec: 3, outProd: 21, outFix: 4, recIn: 10, recScrap: 3 },
    workshop: { inBuy: 0, inRec: 2, outProd: 7, outFix: 2, recIn: 4, recScrap: 1 },
  },
  {
    key: "2026-09", label: "T9", full: "Tháng 09/2026", orderName: "Tháng 4 (09/2026)",
    main: { inBuy: 35, inRec: 4, outProd: 18, outFix: 3, recIn: 10, recScrap: 2 },
    workshop: { inBuy: 0, inRec: 2, outProd: 6, outFix: 2, recIn: 4, recScrap: 1 },
  },
  {
    key: "2026-10", label: "T10", full: "Tháng 10/2026", orderName: "Tháng 5 (10/2026)",
    main: { inBuy: 34, inRec: 3, outProd: 20, outFix: 4, recIn: 10, recScrap: 3 },
    workshop: { inBuy: 0, inRec: 2, outProd: 7, outFix: 2, recIn: 5, recScrap: 1 },
  },
  {
    key: "2026-11", label: "T11", full: "Tháng 11/2026", orderName: "Tháng 6 (11/2026)",
    main: { inBuy: 37, inRec: 4, outProd: 22, outFix: 4, recIn: 11, recScrap: 3 },
    workshop: { inBuy: 0, inRec: 2, outProd: 8, outFix: 2, recIn: 5, recScrap: 1 },
  },
];

export const INITIAL_TASK_GROUPS = [
  {
    id: "approval",
    title: "Phiếu chờ phê duyệt",
    desc: "Phiếu xuất kho & dự trù mua sắm chờ ký",
    category: "docs",
    badgeClass: "bg-amber-50 text-amber-700",
    actionLabel: "Phê duyệt",
    items: [
      { id: "a1", code: "PXK-114", text: "Xuất vật tư bảo trì dây chuyền 2", warehouse: "main", period: "2026-11" },
      { id: "a2", code: "PXK-115", text: "Xuất dầu thủy lực phân xưởng cơ khí", warehouse: "workshop", period: "2026-11" },
      { id: "a3", code: "PXK-116", text: "Xuất phụ tùng thay thế định kỳ", warehouse: "main", period: "2026-11" },
      { id: "a4", code: "DTMS-042", text: "Dự trù mua sắm vòng bi SKF quý IV", warehouse: "main", period: "2026-11" },
      { id: "a5", code: "PXK-098", text: "Xuất cáp điện động lực bổ sung T10", warehouse: "main", period: "2026-10" },
      { id: "a6", code: "DTMS-037", text: "Dự trù mua sắm van khí nén T10", warehouse: "workshop", period: "2026-10" },
    ],
  },
  {
    id: "handover",
    title: "Giao nhận chưa xác nhận",
    desc: "Biên bản bàn giao nội bộ chưa ký nhận",
    category: "docs",
    badgeClass: "bg-sky-50 text-sky-700",
    actionLabel: "Xác nhận",
    items: [
      { id: "h1", code: "BBBG-089", text: "Bàn giao 15 bộ van điều áp cho PX Lắp ráp", warehouse: "workshop", period: "2026-11" },
      { id: "h2", code: "BBBG-090", text: "Bàn giao cáp điện động lực 3x50mm Tổ Điện", warehouse: "main", period: "2026-11" },
      { id: "h3", code: "BBBG-074", text: "Bàn giao dây curoa dự phòng T10", warehouse: "workshop", period: "2026-10" },
    ],
  },
  {
    id: "diff",
    title: "Chênh lệch thiếu/hỏng",
    desc: "Kiểm kê phát hiện lệch so với sổ sách",
    category: "docs",
    badgeClass: "bg-rose-50 text-rose-600",
    actionLabel: "Xử lý lệch",
    items: [
      { id: "d1", code: "KK-01", text: "Bu lông M16x80 thiếu 8 bộ so với sổ sách", warehouse: "main", period: "2026-11" },
    ],
  },
  {
    id: "eval",
    title: "Vật tư chờ đánh giá",
    desc: "Thiết bị thu hồi chờ hội đồng phân loại",
    category: "tech",
    badgeClass: "bg-amber-50 text-amber-700",
    actionLabel: "Đánh giá xong",
    items: [
      { id: "e1", code: "VT-DC-13", text: "Động cơ điện 3 pha 7.5kW thu hồi PX1", warehouse: "workshop", period: "2026-11" },
      { id: "e2", code: "VT-AS-14", text: "Cảm biến áp suất đường ống thu hồi PX2", warehouse: "workshop", period: "2026-11" },
      { id: "e3", code: "VT-BT-15", text: "Băng tải cao su chịu nhiệt tại Kho chính", warehouse: "main", period: "2026-11" },
      { id: "e4", code: "VT-BT-15", text: "Đánh giá định kỳ băng tải T10", warehouse: "main", period: "2026-10" },
    ],
  },
  {
    id: "repair",
    title: "Vật tư đang sửa chữa",
    desc: "Bơm hơi & thiết bị cơ điện đang phục hồi",
    category: "tech",
    badgeClass: "bg-primaryLight text-primary",
    actionLabel: "Hoàn tất",
    items: [
      { id: "r1", code: "VT-BH-16", text: "Máy nén khí trục vít 15HP đang thay phớt", warehouse: "workshop", period: "2026-11" },
      { id: "r2", code: "VT-TB-17", text: "Tủ biến tần đang hiệu chuẩn bo mạch", warehouse: "main", period: "2026-11" },
      { id: "r3", code: "VT-BH-16", text: "Bảo dưỡng máy nén khí đợt T10", warehouse: "workshop", period: "2026-10" },
    ],
  },
];
