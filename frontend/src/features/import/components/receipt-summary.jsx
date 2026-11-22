import { Icon } from "../../../design-system/icon/icon.jsx";

export function ReceiptSummary({ state }) {
  return (
    <div className="summary-metric-strip">
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Tổng phiếu nhập</div>
          <div className="summary-metric-value">{state.receipts?.length || 0}</div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--primary-container)", color: "var(--primary)" }}>
          <Icon name="truck" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Chờ nhập kho (B2)</div>
          <div className="summary-metric-value" style={{ color: "var(--warning)" }}>
            {(state.receipts || []).filter((r) => r.status === "Chờ nhập kho").length}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--warning-container)", color: "var(--warning)" }}>
          <Icon name="clock" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Đã nhập kho</div>
          <div className="summary-metric-value" style={{ color: "var(--success)" }}>
            {(state.receipts || []).filter((r) => r.status === "Đã nhập kho").length}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--success-container)", color: "var(--success)" }}>
          <Icon name="check" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Lô truy vết</div>
          <div className="summary-metric-value">{state.lots?.length || 0}</div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--secondary-container)", color: "var(--on-surface-variant)" }}>
          <Icon name="assignment" size={18} />
        </div>
      </div>
    </div>
  );
}
