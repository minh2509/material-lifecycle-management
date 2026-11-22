import { Table } from "../../../design-system/table/table.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Input } from "../../../design-system/input/input.jsx";
import { Badge } from "../../../design-system/badge/badge.jsx";

export function UserPermissionsTable({ activeTab, handleTogglePermission, modules, selectedRole, setSelectedRole, state }) {
  return (
    <div className="stitch-card p-0 overflow-hidden d-flex flex-column">
      {activeTab === "users" ? (
        <div className="table-responsive border-0 rounded-0">
          <Table variant="standard" >
            <thead>
              <tr>
                <th style={{ minWidth: "130px", width: "130px" }}>Tài khoản</th>
                <th style={{ minWidth: "180px" }}>Họ và tên</th>
                <th style={{ minWidth: "220px" }}>Vai trò / Nhóm quyền</th>
                <th style={{ minWidth: "200px" }}>Phòng ban / Đơn vị</th>
                <th style={{ width: "120px" }}>Trạng thái</th>
                <th style={{ width: "140px" }}>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {(state.users || []).map((u) => (
                <tr key={u.id}>
                  <td><span className="code-chip font-mono">{u.username}</span></td>
                  <td className="fw-semibold text-dark small">{u.fullName}</td>
                  <td className="small text-primary fw-medium">{u.roleName}</td>
                  <td className="small text-muted">{u.department}</td>
                  <td>
                    <Badge variant={u.status === "Hoạt động" ? "success" : "neutral"}>{u.status}</Badge>
                  </td>
                  <td className="small text-muted fst-italic">
                    {u.username === "an.nv" ? "Tài khoản demo hiện hành" : "Tài khoản mẫu"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="p-3 d-flex flex-column gap-3">
          <div className="d-flex gap-2 flex-wrap pb-2 border-bottom border-outline-variant">
            {(state.roles || []).map((r) => (
              <Button
                key={r.id}
                type="button"
                className={`btn btn-sm ${selectedRole?.id === r.id ? "btn-primary fw-semibold" : "btn-outline-secondary"}`}
                style={{ borderRadius: "var(--radius-sm)" }}
                onClick={() => setSelectedRole(r)}
              >
                {r.name}
              </Button>
            ))}
          </div>

          {selectedRole && (
            <div className="d-flex flex-column gap-2">
              <div className="small text-muted mb-1">
                Mô tả nhóm quyền: <strong>{selectedRole.desc}</strong>
              </div>
              <div className="table-responsive border-0 rounded-0">
                <Table variant="standard" >
                  <thead>
                    <tr>
                      <th style={{ minWidth: "200px" }}>Phân hệ chức năng</th>
                      <th className="text-center" style={{ width: "100px" }}>Xem</th>
                      <th className="text-center" style={{ width: "100px" }}>Thêm</th>
                      <th className="text-center" style={{ width: "100px" }}>Sửa</th>
                      <th className="text-center" style={{ width: "100px" }}>Xoá</th>
                      <th className="text-center" style={{ width: "160px" }}>Xác nhận / Phê duyệt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((m) => {
                      const perms = selectedRole.permissions?.[m.key] || [];
                      const canView = perms.includes("view");
                      const canApprove = perms.includes("approve");
                      return (
                        <tr key={m.key}>
                          <td className="fw-semibold text-dark small">{m.label}</td>
                          <td className="text-center">
                            <Input variant="native"
                              type="checkbox"
                              className="form-check-input"
                              checked={canView}
                              onChange={() => handleTogglePermission(m.key, "view")}
                            />
                          </td>
                          <td className="text-center">
                            <Input variant="native"
                              type="checkbox"
                              className="form-check-input"
                              checked={perms.includes("create")}
                              onChange={() => handleTogglePermission(m.key, "create")}
                            />
                          </td>
                          <td className="text-center">
                            <Input variant="native"
                              type="checkbox"
                              className="form-check-input"
                              checked={perms.includes("edit")}
                              onChange={() => handleTogglePermission(m.key, "edit")}
                            />
                          </td>
                          <td className="text-center">
                            <Input variant="native"
                              type="checkbox"
                              className="form-check-input"
                              checked={perms.includes("delete")}
                              onChange={() => handleTogglePermission(m.key, "delete")}
                            />
                          </td>
                          <td className="text-center">
                            <Input variant="native"
                              type="checkbox"
                              className="form-check-input"
                              checked={canApprove}
                              onChange={() => handleTogglePermission(m.key, "approve")}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
