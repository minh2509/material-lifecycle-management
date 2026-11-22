import { Table } from "../../../design-system/table/table.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";
import { Badge } from "../../../design-system/badge/badge.jsx";

export function IssueTable({ issues = [], onSelectIssue, onConfirmIssue, onPrintIssue }) {
  if (issues.length === 0) {
    return (
      <div className="py-5 px-3 text-center d-flex flex-column align-items-center gap-2">
        <Icon name="search_off" size={28} color="var(--on-surface-muted)" />
        <div className="font-headline fs-6 fw-bold text-dark">Chưa có phiếu xuất kho</div>
        <div className="text-muted small" style={{ fontSize: "12.5px" }}>
          Bấm "Lập phiếu xuất kho" để cấp phát vật tư cho phân xưởng theo yêu cầu.
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive border-0 rounded-0">
      <Table variant="standard" >
        <thead>
          <tr>
            <th style={{ width: "50px" }}>STT</th>
            <th style={{ minWidth: "145px", width: "145px" }}>Mã chứng từ</th>
            <th style={{ width: "110px" }}>Ngày xuất</th>
            <th style={{ minWidth: "200px" }}>Nội dung xuất</th>
            <th style={{ width: "90px" }}>Ca</th>
            <th style={{ minWidth: "160px" }}>Đơn vị nhận</th>
            <th className="text-end" style={{ width: "130px" }}>Thành tiền (đ)</th>
            <th style={{ width: "110px" }}>Trạng thái</th>
            <th className="text-end" style={{ minWidth: "210px", width: "210px" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((iss, idx) => {
            const isDispatched = iss.status === "Đã xuất";
            return (
              <tr key={iss.id}>
                <td className="text-muted font-mono small">{idx + 1}</td>
                <td><span className="code-chip font-mono">{iss.id}</span></td>
                <td className="font-mono small text-muted">{iss.issueDate}</td>
                <td className="small text-dark fw-medium">
                  <div>{iss.content}</div>
                  {iss.requestRef && (
                    <span className="text-muted" style={{ fontSize: "11px" }}>Tham chiếu: {iss.requestRef}</span>
                  )}
                </td>
                <td><span className="small text-dark font-mono">{iss.shift}</span></td>
                <td className="small text-dark">
                  <div className="fw-medium">{iss.workshop}</div>
                  <div className="text-muted" style={{ fontSize: "11.5px" }}>Người nhận: {iss.receiver}</div>
                </td>
                <td className="text-end font-mono fw-bold text-dark">
                  {(iss.totalAmount || 0).toLocaleString("vi-VN")}
                </td>
                <td>
                  <Badge variant={isDispatched ? "success" : "warning"}>{iss.status}</Badge>
                </td>
                <td className="text-end">
                  <div className="d-flex align-items-center justify-content-end gap-1.5 flex-nowrap">
                    <Button
                      type="button"
                      variant="outline" className="btn-stitch-table-action"
                      onClick={() => onSelectIssue(iss)}
                      title="Xem chi tiết các dòng vật tư và lô xuất"
                    >
                      Chi tiết
                    </Button>
                    {!isDispatched && (
                      <Button
                        type="button"
                        variant="primary" className="btn-stitch-table-action"
                        onClick={() => onConfirmIssue(iss.id)}
                        title="Trưởng phòng xác nhận xuất: giảm kho và tăng lượng nhận phân xưởng"
                      >
                        Duyệt xuất
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline" className="btn-stitch-table-action px-2"
                      onClick={() => onPrintIssue(iss)}
                      title="In phiếu xuất kho theo mẫu"
                    >
                      <Icon name="printer" size={13} />
                    </Button>
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
