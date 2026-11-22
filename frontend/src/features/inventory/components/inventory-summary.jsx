import { Icon } from "../../../design-system/icon/icon.jsx";

export function InventorySummary({ detailList, groups }) {
  return (
    <div className="summary-metric-strip">
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Tổng mục vật tư</div>
          <div className="summary-metric-value">{detailList.length}</div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--primary-container)", color: "var(--primary)" }}>
          <Icon name="package" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Số kho quản lý</div>
          <div className="summary-metric-value" style={{ color: "var(--primary)" }}>
            {new Set(detailList.map((item) => item.warehouse).filter(Boolean)).size}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--surface-variant)", color: "var(--on-surface-variant)" }}>
          <Icon name="database" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Phân nhóm vật tư</div>
          <div className="summary-metric-value" style={{ color: "var(--success)" }}>
            {groups.length}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--success-container)", color: "var(--success)" }}>
          <Icon name="folder" size={18} />
        </div>
      </div>
      <div className="summary-metric-card">
        <div>
          <div className="summary-metric-label">Tổng lượng tồn thực tế</div>
          <div className="summary-metric-value font-mono">
            {detailList.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0).toLocaleString("vi-VN")}
          </div>
        </div>
        <div className="summary-metric-icon" style={{ background: "var(--warning-container)", color: "var(--warning)" }}>
          <Icon name="truck" size={18} />
        </div>
      </div>
    </div>
  );
}
