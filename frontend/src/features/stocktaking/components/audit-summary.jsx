import { Icon } from "../../../design-system/icon/icon.jsx";

export function AuditSummary({ audits }) {
  return (
    <div className="summary-metric-strip">
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Tổng đợt kiểm kê</div>
          <div className="summary-metric-value">{audits.length}</div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--primary-container)", color: "var(--primary)" }}>
          <Icon name="clipboard" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Đã duyệt giải trình</div>
          <div className="summary-metric-value" style={{ color: "var(--success)" }}>
            {audits.filter((a) => a.status.includes("phê duyệt điều chỉnh")).length}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--success-container)", color: "var(--success)" }}>
          <Icon name="check" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Chờ duyệt chênh lệch</div>
          <div className="summary-metric-value" style={{ color: "var(--warning)" }}>
            {audits.filter((a) => !a.status.includes("phê duyệt điều chỉnh")).length}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--warning-container)", color: "var(--warning)" }}>
          <Icon name="clock" size={18} />
        </div>
      </div>
    </div>
  );
}
