/**
 * PROTOTYPE — Dữ liệu mẫu danh mục, người dùng, nhóm quyền và định mức
 */

export const INITIAL_WAREHOUSES = [
  {
    code: "Kho A",
    name: "Kho Vật tư Chính Mức +35",
    dimension: "80m x 25m",
    area: 2000,
    locationCount: 24,
    functionDesc: "Lưu trữ gỗ lò, sắt thép, kim khí tổng hợp",
    department: "Phòng Cơ điện – Vận tải",
    manager: "Nguyễn Văn Nam",
  },
  {
    code: "Kho B",
    name: "Kho Phụ tùng & Tiếp nhận Thu hồi",
    dimension: "50m x 20m",
    area: 1000,
    locationCount: 16,
    functionDesc: "Tiếp nhận thu hồi, phụ tùng cơ điện, bãi chứa chờ đánh giá",
    department: "Phòng Cơ điện – Vận tải",
    manager: "Trần Văn Hùng",
  },
  {
    code: "Kho C",
    name: "Kho Thiết bị & Phế liệu Mỏ",
    dimension: "40m x 20m",
    area: 800,
    locationCount: 10,
    functionDesc: "Chứa thiết bị dự phòng lớn, khu gom phế liệu tiêu huỷ",
    department: "Phòng Cơ điện – Vận tải",
    manager: "Lê Văn Tiến",
  },
];

export const INITIAL_LOCATIONS = [
  { warehouseCode: "Kho A", locationCode: "KHOANG-A1", name: "Khoang A1 - Gỗ lò", desc: "Khu vực xếp gỗ chèn lò", materialCount: 8 },
  { warehouseCode: "Kho A", locationCode: "KHOANG-A2", name: "Khoang A2 - Cọc chống", desc: "Khu vực xếp cọc chống bạch đàn", materialCount: 6 },
  { warehouseCode: "Kho B", locationCode: "KHOANG-B1", name: "Khoang B1 - Chờ kiểm định", desc: "Vật tư thu hồi chờ đánh giá chất lượng", materialCount: 4 },
];

export const INITIAL_SUPPLIERS = [
  {
    code: "NCC-01",
    name: "Công ty CP Lâm sản & Vật tư Than Mỏ",
    address: "Số 12 Lê Thánh Tông, TP Hạ Long, Quảng Ninh",
    phone: "0203.3825.999",
    deliveryContact: "Nguyễn Đình Thắng (0912.345.678)",
  },
  {
    code: "NCC-02",
    name: "Công ty TNHH Cơ khí & Thiết bị Mỏ Quảng Ninh",
    address: "KCN Cái Lân, TP Hạ Long, Quảng Ninh",
    phone: "0203.3638.123",
    deliveryContact: "Vũ Mạnh Hùng (0988.765.432)",
  },
];

export const INITIAL_WORKSHOPS = [
  { code: "PX-KT1", name: "Phân xưởng Khai thác 1", manager: "Trần Văn Hùng", area: "Khu vỉa 14 mức -150", shifts: "3 ca (24/24)" },
  { code: "PX-KT2", name: "Phân xưởng Khai thác 2", manager: "Phạm Văn Đông", area: "Khu vỉa 11 mức -200", shifts: "3 ca (24/24)" },
  { code: "PX-CD", name: "Phân xưởng Cơ điện Vận tải Lò", manager: "Đỗ Quốc Việt", area: "Mặt bằng trung tâm", shifts: "3 ca + Hành chính" },
];

export const INITIAL_USERS = [
  {
    id: "usr-01",
    username: "an.nv",
    fullName: "Nguyễn Văn An",
    roleId: "role-tp",
    roleName: "Trưởng phòng Cơ điện – Vận tải",
    department: "Phòng Cơ điện – Vận tải",
    status: "Hoạt động",
  },
  {
    id: "usr-02",
    username: "binh.pv",
    fullName: "Phạm Văn Bình",
    roleId: "role-kh",
    roleName: "Nhân viên Kế hoạch mua sắm",
    department: "Phòng Kế hoạch",
    status: "Hoạt động",
  },
  {
    id: "usr-03",
    username: "nam.nv",
    fullName: "Nguyễn Văn Nam",
    roleId: "role-tk",
    roleName: "Thủ kho vật tư chính",
    department: "Kho A",
    status: "Hoạt động",
  },
  {
    id: "usr-04",
    username: "hung.tv",
    fullName: "Trần Văn Hùng",
    roleId: "role-px",
    roleName: "Quản đốc Phân xưởng Khai thác 1",
    department: "Phân xưởng Khai thác 1",
    status: "Hoạt động",
  },
];

export const INITIAL_ROLES = [
  {
    id: "role-tp",
    name: "Trưởng phòng Cơ điện – Vận tải",
    desc: "Phê duyệt cuối phiếu xuất kho, dự trù, giải trình kiểm kê và thanh lý",
    permissions: {
      receipt: ["view", "approve"],
      issue: ["view", "approve"],
      plan: ["view", "approve"],
      recovery: ["view", "approve"],
      audit: ["view", "approve"],
      admin: ["view", "edit"],
    },
  },
  {
    id: "role-tk",
    name: "Thủ kho",
    desc: "Xác nhận phiếu nhập, xuất hàng vật lý, lập phiếu kiểm kê và xuất phế liệu",
    permissions: {
      receipt: ["view", "create", "edit"],
      issue: ["view", "create"],
      plan: ["view"],
      recovery: ["view", "create"],
      audit: ["view", "create"],
      admin: ["view"],
    },
  },
  {
    id: "role-kh",
    name: "Nhân viên Kế hoạch",
    desc: "Lập hồ sơ dự trù mua sắm, theo dõi tiến độ giao hàng",
    permissions: {
      receipt: ["view"],
      issue: ["view"],
      plan: ["view", "create", "edit"],
      recovery: ["view"],
      audit: ["view"],
      admin: ["view"],
    },
  },
  {
    id: "role-px",
    name: "Đại diện Phân xưởng",
    desc: "Tạo yêu cầu xuất, nhận hàng tại kho, báo cáo sử dụng và lập phiếu thu hồi",
    permissions: {
      receipt: ["view"],
      issue: ["view", "create"],
      plan: ["view"],
      recovery: ["view", "create"],
      audit: ["view"],
      admin: ["view"],
    },
  },
];

export const INITIAL_TECHNICAL_NORMS = [
  {
    code: "GL-001",
    name: "Gỗ chèn lò (L=2,3-:-2,5m, fi 5,5:-12cm); gỗ bạch đàn rừng trồng",
    unit: "Mét",
    normValue: null,
    calcBasis: "1 mét lò đào than",
    appliedScope: "Lò chợ khấu than vỉa dày",
    note: "Đang chờ phòng Kỹ thuật công nghệ mỏ ban hành định mức chính thức",
  },
  {
    code: "GL-002",
    name: "Gỗ chống lò (L=2,35-:-2,45m, fi 13-:-19cm); gỗ bạch đàn rừng trồng",
    unit: "Mét",
    normValue: null,
    calcBasis: "1 tấn than khai thác",
    appliedScope: "Lò dọc vỉa than",
    note: "Đang chờ số liệu định mức từ Tập đoàn",
  },
  {
    code: "VC-001",
    name: "Ván chèn lò gỗ ép công nghiệp",
    unit: "Tấm",
    normValue: null,
    calcBasis: "1 chu kỳ khấu",
    appliedScope: "Toàn bộ các phân xưởng khai thác",
    note: "Chưa có quy định hạn mức tiêu hao",
  },
];
