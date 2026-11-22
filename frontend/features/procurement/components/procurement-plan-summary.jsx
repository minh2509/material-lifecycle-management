import { Icon } from "../../../design-system/icon/icon.jsx";

export function ProcurementPlanSummary({ state }) {
  return (
    <div className="summary-metric-strip">
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Tổng hồ sơ hợp đồng</div>
          <div className="summary-metric-value">{state.procurementPlans?.length || 0}</div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--primary-container)", color: "var(--primary)" }}>
          <Icon name="assignment" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Đã duyệt (Trưởng phòng)</div>
          <div className="summary-metric-value" style={{ color: "var(--success)" }}>
            {(state.procurementPlans || []).filter((p) => p.status === "Duyệt").length}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--success-container)", color: "var(--success)" }}>
          <Icon name="check" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Khởi tạo / Chờ duyệt</div>
          <div className="summary-metric-value" style={{ color: "var(--warning)" }}>
            {(state.procurementPlans || []).filter((p) => p.status === "Khởi tạo").length}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--warning-container)", color: "var(--warning)" }}>
          <Icon name="clock" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Tổng giá trị dự trù</div>
          <div className="summary-metric-value" style={{ fontSize: "16px", color: "var(--primary)" }}>
            {(state.procurementPlans || []).reduce((acc, p) => acc + (p.items || []).reduce((s, it) => s + (it.approvedQuantity * (it.unitPrice || 0)), 0), 0).toLocaleString("vi-VN")} đ
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--secondary-container)", color: "var(--on-surface-variant)" }}>
          <Icon name="tag" size={18} />
        </div>
      </div>
    </div>
  );
}
