import { Table } from "../../../design-system/table/table.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";
import { Badge } from "../../../design-system/badge/badge.jsx";

export function ReceiptTable({ receipts = [], onSelectReceipt, onConfirmReceipt }) {
  if (receipts.length === 0) {
    return (
      <div className="py-5 px-3 text-center d-flex flex-column align-items-center gap-2">
        <div className="d-flex align-items-center justify-content-center rounded-circle bg-light border border-outline-variant mb-1" style={{ width: "52px", height: "52px" }}>
          <Icon name="search_off" size={26} color="var(--on-surface-muted)" />
        </div>
        <div className="font-headline fs-6 fw-bold text-dark">Không tìm thấy phiếu nhập kho</div>
        <div className="text-muted small" style={{ maxWidth: "400px", fontSize: "12.5px" }}>
          Không có phiếu nhập kho nào khớp với điều kiện lọc. Vui lòng thay đổi từ khoá hoặc bấm "Lập phiếu nhập kho".
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
            <th style={{ width: "110px" }}>Loại phiếu</th>
            <th style={{ width: "160px" }}>Số tham chiếu</th>
            <th style={{ width: "110px" }}>Ngày nhập</th>
            <th style={{ width: "100px" }}>Kho nhập</th>
            <th style={{ minWidth: "180px" }}>Vật tư nhập</th>
            <th style={{ width: "130px" }}>Trạng thái</th>
            <th className="text-end" style={{ minWidth: "175px", width: "175px" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((r) => {
            const isConfirmed = r.status === "Đã nhập kho";
            const itemCount = r.items?.length || 0;
            const totalQty = (r.items || []).reduce((s, it) => s + (it.actualQuantity || 0), 0);
            return (
              <tr key={r.id}>
                <td><span className="code-chip">{r.id}</span></td>
                <td>
                  <span className="small text-dark fw-medium">{r.type}</span>
                </td>
                <td><span className="font-mono text-dark small fw-medium">{r.referenceNo || "—"}</span></td>
                <td className="font-mono small text-muted">{r.date}</td>
                <td><span className="small text-dark">{r.warehouse}</span></td>
                <td className="small text-dark">
                  <div className="fw-medium">{itemCount} dòng vật tư (Tổng {totalQty.toLocaleString("vi-VN")})</div>
                  <div className="text-muted text-truncate" style={{ maxWidth: "240px", fontSize: "11.5px" }}>
                    {r.items?.map((it) => it.name).join(", ")}
                  </div>
                </td>
                <td>
                  <Badge variant={isConfirmed ? "success" : "warning"}>{r.status}</Badge>
                </td>
                <td className="text-end">
                  <div className="d-flex align-items-center justify-content-end gap-1.5 flex-nowrap">
                    <Button
                      type="button"
                      variant="outline" className="btn-stitch-table-action"
                      onClick={() => onSelectReceipt(r)}
                      title="Xem chi tiết phiếu nhập"
                    >
                      Chi tiết
                    </Button>
                    {!isConfirmed && (
                      <Button
                        type="button"
                        variant="primary" className="btn-stitch-table-action"
                        onClick={() => onConfirmReceipt(r.id)}
                        title="Xác nhận nhập kho vật lý (Thủ kho)"
                      >
                        Xác nhận
                      </Button>
                    )}
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
