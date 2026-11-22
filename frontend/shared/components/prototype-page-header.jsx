/**
 * PROTOTYPE — Tiêu đề chuẩn cho các trang prototype
 * Thống nhất cấu trúc tiêu đề, nhãn minh hoạ và phạm vi theo quy ước UI.
 */

import { Badge } from "../../design-system/badge/badge.jsx";

export function PrototypePageHeader({
  title,
  subtitle,
  isProposed = false,
  proposedText = "Đề xuất prototype",
  actions = null,
}) {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pb-2 border-bottom border-outline-variant">
      <div>
        <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
          <h1 className="font-headline fs-4 m-0 text-dark">{title}</h1>
          <Badge variant="neutral">Dữ liệu minh hoạ</Badge>
          {isProposed && (
            <span
              className="stitch-badge stitch-badge-warning"
              title="Điểm nghiệp vụ đang chờ khách hàng xác nhận"
            >
              {proposedText}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-muted small m-0" style={{ fontSize: "12.5px" }}>
            {subtitle}
          </p>
        )}
      </div>

      {actions && <div className="d-flex align-items-center gap-2">{actions}</div>}
    </div>
  );
}
