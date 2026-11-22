import { Table } from "../../../design-system/table/table.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";
import { Badge } from "../../../design-system/badge/badge.jsx";

export function RecoveryTable({ recoveries = [], onSelectRecovery }) {
  if (recoveries.length === 0) {
    return (
      <div className="py-5 px-3 text-center d-flex flex-column align-items-center gap-2">
        <Icon name="search_off" size={28} color="var(--on-surface-muted)" />
        <div className="font-headline fs-6 fw-bold text-dark">Chưa có phiếu thu hồi vật tư</div>
        <div className="text-muted small" style={{ fontSize: "12.5px" }}>
          Bấm "Lập phiếu thu hồi" để tiếp nhận vật tư cũ hoặc tháo dỡ từ các phân xưởng.
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive border-0 rounded-0">
      <Table variant="standard" >
        <thead>
          <tr>
            <th style={{ minWidth: "145px", width: "145px" }}>Mã chứng từ</th>
            <th style={{ width: "110px" }}>Ngày lập</th>
            <th style={{ minWidth: "180px" }}>Đơn vị thu hồi</th>
            <th style={{ minWidth: "220px" }}>Nội dung thu hồi</th>
            <th style={{ width: "100px" }}>Kho nhận</th>
            <th style={{ width: "140px" }}>Liên kết nhập kho</th>
            <th style={{ width: "110px" }}>Trạng thái</th>
            <th className="text-end" style={{ minWidth: "110px", width: "110px" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {recoveries.map((rec) => {
            const isApproved = rec.status === "Duyệt";
            return (
              <tr key={rec.id}>
                <td><span className="code-chip font-mono">{rec.id}</span></td>
                <td className="font-mono small text-muted">{rec.createdDate}</td>
                <td className="small text-dark fw-medium">{rec.workshop}</td>
                <td className="small text-dark">
                  <div>{rec.content}</div>
                  <div className="text-muted" style={{ fontSize: "11.5px" }}>
                    {rec.items?.length || 0} dòng vật tư
                  </div>
                </td>
                <td><span className="small text-dark">{rec.warehouse}</span></td>
                <td>
                  <span className="code-chip font-mono" style={{ fontSize: "11px" }}>
                    {rec.receiptRef || "Chưa nhập"}
                  </span>
                </td>
                <td>
                  <Badge variant={isApproved ? "success" : "neutral"}>{rec.status}</Badge>
                </td>
                <td className="text-end">
                  <Button
                    type="button"
                    variant="outline" className="btn-ui-table-action"
                    onClick={() => onSelectRecovery(rec)}
                    title="Xem chi tiết phiếu và trạng thái phân luồng"
                  >
                    Chi tiết
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
