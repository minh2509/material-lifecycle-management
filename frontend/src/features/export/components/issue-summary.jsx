import { Icon } from "../../../design-system/icon/icon.jsx";

export function IssueSummary({ state }) {
  return (
    <div className="summary-metric-strip">
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Tổng phiếu xuất</div>
          <div className="summary-metric-value">{state.issues?.length || 0}</div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--primary-container)", color: "var(--primary)" }}>
          <Icon name="send" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Chờ duyệt xuất</div>
          <div className="summary-metric-value" style={{ color: "var(--warning)" }}>
            {(state.issues || []).filter((i) => i.status === "Chờ xuất").length}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--warning-container)", color: "var(--warning)" }}>
          <Icon name="clock" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Đã xuất kho</div>
          <div className="summary-metric-value" style={{ color: "var(--success)" }}>
            {(state.issues || []).filter((i) => i.status === "Đã xuất").length}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--success-container)", color: "var(--success)" }}>
          <Icon name="check" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Yêu cầu chưa cấp đủ</div>
          <div className="summary-metric-value" style={{ color: "var(--info)" }}>
            {(state.issueRequests || []).filter((r) => r.status !== "Đã cấp đủ").length}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--surface-container)", color: "var(--on-surface-variant)" }}>
          <Icon name="assignment" size={18} />
        </div>
      </div>
    </div>
  );
}
