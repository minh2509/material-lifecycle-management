import { Table } from "../../../design-system/table/table.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function RepairTab({ repairs = [] }) {
  if (repairs.length === 0) {
    return (
      <div className="py-5 px-3 text-center d-flex flex-column align-items-center gap-2">
        <Icon name="wrench" size={28} color="var(--on-surface-muted)" />
        <div className="font-headline fs-6 fw-bold text-dark">Chưa có lệnh sửa chữa phục hồi</div>
        <div className="text-muted small" style={{ fontSize: "12.5px" }}>
          Vật tư được phân luồng sang "Sửa chữa phục hồi" sẽ xuất hiện tại đây để theo dõi phụ tùng và tính giá phục hồi.
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <div className="p-3 bg-light rounded border border-outline-variant small text-dark d-flex gap-2">
        <Icon name="info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <strong>Công thức tính giá trị phục hồi (S-OLD mục 8.4, PROPOSED):</strong> Đơn giá nhập lại phục hồi = <strong>Chi phí phụ tùng thuần ÷ Số lượng phục hồi đạt</strong> (Chi phí thuần = Phụ tùng xuất sửa − Phụ tùng thừa trả lại kho). Không tính tiền công hoặc chi phí giả định.
        </div>
      </div>

      <div className="table-responsive border-0 rounded-0">
        <Table variant="standard" >
          <thead>
            <tr>
              <th style={{ width: "130px" }}>Mã lệnh sửa</th>
              <th style={{ width: "130px" }}>Phiếu thu hồi</th>
              <th style={{ minWidth: "180px" }}>Vật tư sửa chữa</th>
              <th className="text-end" style={{ width: "90px" }}>SL sửa</th>
              <th style={{ minWidth: "200px" }}>Phụ tùng xuất sửa</th>
              <th className="text-end" style={{ width: "120px" }}>Chi phí thuần</th>
              <th className="text-end" style={{ width: "100px" }}>Nghiệm thu</th>
              <th className="text-end" style={{ width: "130px" }}>Đơn giá phục hồi</th>
              <th style={{ width: "130px" }}>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((rp) => (
              <tr key={rp.id}>
                <td><span className="code-chip font-mono">{rp.id}</span></td>
                <td><span className="code-chip font-mono text-muted">{rp.recoveryRef}</span></td>
                <td className="small text-dark fw-medium">{rp.materialName} ({rp.materialCode})</td>
                <td className="text-end font-mono text-dark fw-bold">{rp.repairQty}</td>
                <td className="small text-dark">
                  {rp.sparePartsUsed?.map((sp, idx) => (
                    <div key={idx} className="font-mono text-muted" style={{ fontSize: "11.5px" }}>
                      {sp.name}: {sp.qty} × {sp.unitPrice?.toLocaleString("vi-VN")} đ = {sp.total?.toLocaleString("vi-VN")} đ
                    </div>
                  ))}
                </td>
                <td className="text-end font-mono fw-bold text-dark">
                  {(rp.netSparePartsCost || 0).toLocaleString("vi-VN")} đ
                </td>
                <td className="text-end font-mono">
                  <span className="text-success fw-bold">{rp.acceptedQty} Đạt</span>
                  {rp.failedQty > 0 && <span className="text-danger ms-1">({rp.failedQty} Hỏng)</span>}
                </td>
                <td className="text-end font-mono fw-bold text-primary">
                  {rp.restoredUnitPrice ? `${rp.restoredUnitPrice.toLocaleString("vi-VN")} đ` : "—"}
                </td>
                <td>
                  <span className="stitch-badge stitch-badge-success">{rp.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
