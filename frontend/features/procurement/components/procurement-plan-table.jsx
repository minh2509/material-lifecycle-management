import { Table } from "../../../design-system/table/table.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";
import { Badge } from "../../../design-system/badge/badge.jsx";

export function ProcurementPlanTable({ plans = [], onSelectPlan, onApprovePlan }) {
  if (plans.length === 0) {
    return (
      <div className="py-5 px-3 text-center d-flex flex-column align-items-center gap-2">
        <Icon name="search_off" size={28} color="var(--on-surface-muted)" />
        <div className="font-headline fs-6 fw-bold text-dark">Chưa có hồ sơ dự trù mua sắm</div>
        <div className="text-muted small" style={{ fontSize: "12.5px" }}>
          Bấm "Lập dự trù mua sắm" để tạo hồ sơ hợp đồng và danh mục vật tư cần mua.
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive border-0 rounded-0">
      <Table variant="standard" >
        <thead>
          <tr>
            <th style={{ minWidth: "155px", width: "155px" }}>Mã hồ sơ</th>
            <th style={{ width: "160px" }}>Số hợp đồng</th>
            <th style={{ minWidth: "220px" }}>Nội dung dự trù</th>
            <th style={{ minWidth: "180px" }}>Nhà cung cấp</th>
            <th style={{ width: "110px" }}>Ngày ký</th>
            <th className="text-end" style={{ width: "140px" }}>Tổng tiền (đ)</th>
            <th style={{ width: "110px" }}>Trạng thái</th>
            <th className="text-end" style={{ minWidth: "160px", width: "160px" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((p) => {
            const isApproved = p.status === "Duyệt";
            const totalAmount = (p.items || []).reduce(
              (sum, it) => sum + (it.approvedQuantity * (it.unitPrice || 0)),
              0
            );
            return (
              <tr key={p.id}>
                <td><span className="code-chip font-mono">{p.id}</span></td>
                <td><span className="font-mono text-dark fw-bold small">{p.contractNo}</span></td>
                <td className="small text-dark fw-medium">{p.content}</td>
                <td className="small text-muted">{p.supplier}</td>
                <td className="font-mono small text-muted">{p.signDate}</td>
                <td className="text-end font-mono fw-bold text-dark">
                  {totalAmount.toLocaleString("vi-VN")}
                </td>
                <td>
                  <Badge variant={isApproved ? "success" : "neutral"}>{p.status}</Badge>
                </td>
                <td className="text-end">
                  <div className="d-flex align-items-center justify-content-end gap-1.5 flex-nowrap">
                    <Button
                      type="button"
                      variant="outline" className="btn-ui-table-action"
                      onClick={() => onSelectPlan(p)}
                      title="Xem chi tiết các dòng vật tư và tiến độ nhập"
                    >
                      Chi tiết
                    </Button>
                    {!isApproved && (
                      <Button
                        type="button"
                        variant="primary" className="btn-ui-table-action"
                        onClick={() => onApprovePlan(p.id)}
                        title="Phê duyệt hồ sơ dự trù (Trưởng phòng)"
                      >
                        Duyệt
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
