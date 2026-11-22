import { Icon } from "../../../design-system/icon/icon.jsx";

export function DisposalSummary({ pendingScraps, state }) {
  return (
    <div className="summary-metric-strip">
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Tổng mặt hàng phế liệu</div>
          <div className="summary-metric-value">{state.scraps?.length || 0}</div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--primary-container)", color: "var(--primary)" }}>
          <Icon name="package" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Chờ xử lý / tiêu huỷ</div>
          <div className="summary-metric-value" style={{ color: "var(--warning)" }}>
            {pendingScraps.length}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--warning-container)", color: "var(--warning)" }}>
          <Icon name="clock" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Phiếu xuất xử lý đã lập</div>
          <div className="summary-metric-value" style={{ color: "var(--success)" }}>
            {state.disposals?.length || 0}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--success-container)", color: "var(--success)" }}>
          <Icon name="check_circle" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Tổng khối lượng/SL tồn</div>
          <div className="summary-metric-value font-mono">
            {(state.scraps || []).reduce((acc, s) => acc + (Number(s.quantity) || 0), 0).toLocaleString("vi-VN")}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--surface-variant)", color: "var(--on-surface-variant)" }}>
          <Icon name="database" size={18} />
        </div>
      </div>
    </div>
  );
}
