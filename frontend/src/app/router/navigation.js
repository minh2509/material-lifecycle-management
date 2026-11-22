export const NAVIGATION_GROUPS = [
  {
    id: "overview",
    title: "TỔNG QUAN",
    items: [
      { id: "dashboard", label: "Tổng quan vật tư", path: "/", icon: "dashboard", available: true },
      { id: "detail", label: "Chi tiết tồn kho", path: "/chi-tiet-ton-kho", icon: "search", available: true },
    ],
  },
  {
    id: "operations",
    title: "NGHIỆP VỤ VẬT TƯ",
    items: [
      {
        id: "procurement",
        label: "Mua sắm vật tư",
        path: "/du-tru",
        icon: "assignment",
        available: true,
        relatedPaths: ["/mua-sam", "/dinh-muc", "/ke-hoach-nhu-cau"],
      },
      { id: "receipt", label: "Nhập kho", path: "/nhap-kho", icon: "truck", available: true },
      { id: "issue", label: "Cấp phát sử dụng", path: "/cap-phat", icon: "send", available: true },
      {
        id: "recovery",
        label: "Thu hồi & Thanh lý",
        path: "/thu-hoi",
        icon: "refresh",
        available: true,
        relatedPaths: ["/thanh-ly"],
      },
    ],
  },
  {
    id: "reporting",
    title: "KIỂM KÊ & BÁO CÁO",
    items: [
      { id: "audit", label: "Kiểm kê vật tư", path: "/kiem-ke", icon: "clipboard", available: true },
      { id: "report", label: "Báo cáo vật tư", path: "/bao-cao", icon: "file_text", available: true },
    ],
  },
  {
    id: "system",
    title: "CẤU HÌNH & HỆ THỐNG",
    items: [
      { id: "catalog", label: "Danh mục", path: "/danh-muc", icon: "warehouse", available: true },
      { id: "user-management", label: "Quản lý người dùng", path: "/quan-tri", icon: "tune", available: true },
    ],
  },
];

// Danh mục tất cả 14 phân hệ hỗ trợ tra cứu, breadcrumb và tìm kiếm toàn diện
export const ALL_SYSTEM_MODULES = [
  { id: "dashboard", label: "Tổng quan vật tư", path: "/", icon: "dashboard", available: true },
  { id: "detail", label: "Chi tiết tồn kho", path: "/chi-tiet-ton-kho", icon: "search", available: true },
  { id: "norm", label: "Định mức kỹ thuật", path: "/dinh-muc", icon: "tune", available: true },
  { id: "plan", label: "Kế hoạch nhu cầu", path: "/ke-hoach-nhu-cau", icon: "calendar_today", available: true },
  { id: "procurement-plan", label: "Dự trù mua sắm", path: "/du-tru", icon: "assignment", available: true },
  { id: "procurement-exec", label: "Thực hiện mua sắm", path: "/mua-sam", icon: "shopping_cart", available: true },
  { id: "receipt", label: "Nhập kho", path: "/nhap-kho", icon: "truck", available: true },
  { id: "issue", label: "Cấp phát sử dụng", path: "/cap-phat", icon: "send", available: true },
  { id: "recovery", label: "Thu hồi – Tái sử dụng", path: "/thu-hoi", icon: "refresh", available: true },
  { id: "disposal", label: "Thanh lý vật tư", path: "/thanh-ly", icon: "delete", available: true },
  { id: "catalog", label: "Danh mục", path: "/danh-muc", icon: "warehouse", available: true },
  { id: "audit", label: "Kiểm kê", path: "/kiem-ke", icon: "clipboard", available: true },
  { id: "report", label: "Báo cáo", path: "/bao-cao", icon: "file_text", available: true },
  { id: "user-management", label: "Quản lý người dùng", path: "/quan-tri", icon: "tune", available: true },
];

export const NAVIGATION_ITEMS = NAVIGATION_GROUPS.flatMap((g) => g.items);
