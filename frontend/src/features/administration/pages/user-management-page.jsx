import { Button } from "../../../design-system/button/button.jsx";
import { UserPermissionsTable } from "../components/user-permissions-table.jsx";
import { useState } from "react";
import { usePrototypeStore } from "../../../shared/hooks/use-prototype-store.js";
import { PrototypePageHeader } from "../../../shared/components/prototype-page-header.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function UserManagementPage() {
  const { state, store } = usePrototypeStore();
  const [activeTab, setActiveTab] = useState("users");
  const [selectedRole, setSelectedRole] = useState(state.roles?.[0] || null);

  const modules = [
    { key: "receipt", label: "Nhập kho" },
    { key: "issue", label: "Cấp phát sử dụng" },
    { key: "plan", label: "Dự trù mua sắm" },
    { key: "recovery", label: "Thu hồi – Tái sử dụng" },
    { key: "audit", label: "Kiểm kê" },
    { key: "admin", label: "Quản trị hệ thống" },
  ];

  const handleTogglePermission = (modKey, permKey) => {
    if (!selectedRole) return;
    const currentPerms = selectedRole.permissions[modKey] || [];
    let updated;
    if (currentPerms.includes(permKey)) {
      // Nếu bỏ Xem thì tự động bỏ luôn Phê duyệt (BB02 1.2)
      if (permKey === "view") {
        updated = [];
      } else {
        updated = currentPerms.filter((p) => p !== permKey);
      }
    } else {
      // Nếu chọn Phê duyệt thì bắt buộc bật Xem trước (BB02 1.2)
      if (permKey === "approve" && !currentPerms.includes("view")) {
        updated = [...currentPerms, "view", "approve"];
      } else {
        updated = [...currentPerms, permKey];
      }
    }
    const nextPerms = { ...selectedRole.permissions, [modKey]: updated };
    setSelectedRole({ ...selectedRole, permissions: nextPerms });
    store.updateRolePermissions(selectedRole.id, nextPerms);
  };

  return (
    <div className="d-flex flex-column gap-4">
      <PrototypePageHeader
        title="Quản lý người dùng & Phân quyền"
        subtitle="Mô phỏng tài khoản người dùng, nhóm quyền động và ma trận quyền chức năng theo đặc tả BB02"
      />

      <div className="p-3 bg-light rounded border border-outline-variant small text-dark d-flex gap-2">
        <Icon name="info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <strong>Ràng buộc phân quyền (CHỐT BB02 mục 1.2):</strong> Quyền không gán cứng theo chức danh; một người kiêm nhiệm nhiều việc nếu được cấp quyền. Muốn có quyền <strong>Xác nhận / Phê duyệt</strong>, người dùng bắt buộc phải có quyền <strong>Xem</strong> ở cùng phân hệ trước. Cấp cao nhất trên phần mềm là <strong>Trưởng phòng Cơ điện – Vận tải</strong> (không có vai trò Giám đốc).
        </div>
      </div>

      <div className="d-flex gap-2 border-bottom border-outline-variant pb-2">
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "users" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("users")}
        >
          Người dùng ({state.users?.length || 0})
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "roles" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("roles")}
        >
          Nhóm quyền & Ma trận phân quyền ({state.roles?.length || 0})
        </Button>
      </div>

      <UserPermissionsTable activeTab={activeTab} handleTogglePermission={handleTogglePermission} modules={modules} selectedRole={selectedRole} setSelectedRole={setSelectedRole} state={state} />
    </div>
  );
}
