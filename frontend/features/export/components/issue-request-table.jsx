import { Table } from "../../../design-system/table/table.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";
import { Badge } from "../../../design-system/badge/badge.jsx";

export function IssueRequestTable({ requests = [], onCreateIssueFromRequest }) {
  if (requests.length === 0) {
    return (
      <div className="py-5 px-3 text-center d-flex flex-column align-items-center gap-2">
        <Icon name="assignment" size={28} color="var(--on-surface-muted)" />
        <div className="font-headline fs-6 fw-bold text-dark">Chưa có phiếu yêu cầu xuất kho</div>
        <div className="text-muted small" style={{ fontSize: "12.5px" }}>
          Các phân xưởng lập yêu cầu xuất vật tư theo kế hoạch sản xuất ca/ngày.
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive border-0 rounded-0">
      <Table variant="standard" >
        <thead>
          <tr>
            <th style={{ minWidth: "145px", width: "145px" }}>Mã yêu cầu</th>
            <th style={{ width: "110px" }}>Ngày yêu cầu</th>
            <th style={{ minWidth: "180px" }}>Phân xưởng yêu cầu</th>
            <th style={{ minWidth: "160px" }}>Thời điểm & Mục đích</th>
            <th style={{ minWidth: "220px" }}>Vật tư yêu cầu & Tiến độ cấp</th>
            <th style={{ width: "110px" }}>Trạng thái</th>
            <th className="text-end" style={{ minWidth: "140px", width: "140px" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => {
            const allSupplied = (req.items || []).every((it) => (it.issuedQty || 0) >= it.requestedQty);
            return (
              <tr key={req.id}>
                <td><span className="code-chip font-mono">{req.id}</span></td>
                <td className="font-mono small text-muted">{req.requestDate}</td>
                <td className="small text-dark">
                  <div className="fw-semibold">{req.workshop}</div>
                  <div className="text-muted" style={{ fontSize: "11.5px" }}>Người đề nghị: {req.receiver}</div>
                </td>
                <td className="small text-dark">
                  <div className="fw-medium text-primary">{req.neededTime}</div>
                  <div className="text-muted text-truncate" style={{ maxWidth: "200px", fontSize: "11.5px" }}>
                    {req.purpose}
                  </div>
                </td>
                <td className="small">
                  {req.items?.map((it, idx) => (
                    <div key={idx} className="d-flex justify-content-between font-mono py-0.5">
                      <span>{it.name || it.code}:</span>
                      <span className={(it.issuedQty || 0) >= it.requestedQty ? "text-success fw-bold" : "text-warning fw-bold"}>
                        {it.issuedQty || 0} / {it.requestedQty} {it.unit}
                      </span>
                    </div>
                  ))}
                </td>
                <td>
                  <Badge variant={allSupplied ? "success" : "neutral"}>
                    {allSupplied ? "Đã cấp đủ" : req.status}
                  </Badge>
                </td>
                <td className="text-end">
                  {!allSupplied && (
                    <Button
                      type="button"
                      variant="primary" className="btn-ui-table-action"
                      onClick={() => onCreateIssueFromRequest(req)}
                      title="Lập phiếu xuất kho cho yêu cầu này"
                    >
                      Lập phiếu xuất
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
