import { Table } from "../../../design-system/table/table.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Input } from "../../../design-system/input/input.jsx";
import { useState } from "react";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function WorkshopUsageTable({ balances = [], onUpdateUsage }) {
  const [editingItem, setEditingItem] = useState(null);
  const [usedInput, setUsedInput] = useState(1);

  const handleOpenEdit = (wb) => {
    setEditingItem(wb);
    setUsedInput(1);
  };

  const handleSaveUsage = () => {
    if (!editingItem) return;
    onUpdateUsage(editingItem.workshop, editingItem.materialCode, Number(usedInput) || 0);
    setEditingItem(null);
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div className="p-3 bg-light rounded border border-outline-variant small text-dark d-flex gap-2">
        <Icon name="info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <strong>Quy tắc theo dõi tại phân xưởng (S-01 mục 7.1, BB02 5.1):</strong> Hệ thống quản lý theo cơ chế <strong>Đầu vào (nhận) – Đầu ra (đã dùng / còn lại)</strong> theo từng ca. Vật tư thông thường dư được phép giữ lại phân xưởng cho ca sau. Vật liệu nổ (thuốc nổ/mìn) bắt buộc quyết toán và hoàn trả kho trong ca.
        </div>
      </div>

      <div className="table-responsive border-0 rounded-0">
        <Table variant="standard" >
          <thead>
            <tr>
              <th style={{ minWidth: "180px" }}>Phân xưởng</th>
              <th style={{ width: "120px" }}>Mã vật tư</th>
              <th style={{ minWidth: "220px" }}>Tên vật tư</th>
              <th className="text-end" style={{ width: "110px" }}>Tổng nhận</th>
              <th className="text-end" style={{ width: "110px" }}>Đã dùng</th>
              <th className="text-end" style={{ width: "120px" }}>Đã trả kho</th>
              <th className="text-end" style={{ width: "140px" }}>Còn lại cuối ca</th>
              <th className="text-end" style={{ width: "130px" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {balances.map((wb, idx) => (
              <tr key={idx}>
                <td className="fw-semibold text-dark small">{wb.workshop}</td>
                <td><span className="code-chip">{wb.materialCode}</span></td>
                <td className="small text-dark fw-medium">{wb.materialName}</td>
                <td className="text-end font-mono text-dark fw-bold">{wb.receivedQty} {wb.unit}</td>
                <td className="text-end font-mono text-muted">{wb.usedQty} {wb.unit}</td>
                <td className="text-end font-mono text-muted">{wb.returnedConfirmedQty} {wb.unit}</td>
                <td className="text-end font-mono fw-bold text-primary fs-6">
                  {wb.remainingInWorkshop} {wb.unit}
                </td>
                <td className="text-end">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={wb.remainingInWorkshop <= 0}
                    onClick={() => handleOpenEdit(wb)}
                    title="Báo cáo số lượng đã tiêu hao trong ca sản xuất"
                  >
                    Báo dùng
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {editingItem && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "420px" }}>
            <div className="modal-content">
              <div className="modal-header py-2.5 px-3 border-bottom border-outline-variant">
                <h5 className="modal-title font-headline fs-6 text-dark">Báo cáo tiêu hao tại phân xưởng</h5>
                <Button type="button" className="btn-close" onClick={() => setEditingItem(null)} />
              </div>
              <div className="modal-body p-3 small d-flex flex-column gap-2">
                <div className="fw-bold text-dark">{editingItem.materialName} ({editingItem.materialCode})</div>
                <div className="text-muted">Đơn vị: {editingItem.workshop} • Còn lại: <strong className="text-dark">{editingItem.remainingInWorkshop} {editingItem.unit}</strong></div>
                <div className="mt-2">
                  <label htmlFor="used-input" className="form-label text-dark fw-semibold mb-1">Số lượng vừa dùng trong ca ({editingItem.unit}):</label>
                  <Input variant="compact"
                    id="used-input"
                    type="number"
                    min="1"
                    max={editingItem.remainingInWorkshop}
                    className="font-mono"
                    value={usedInput}
                    onChange={(e) => setUsedInput(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer py-2 px-3 border-top border-outline-variant d-flex justify-content-between">
                <Button type="button" variant="secondary" onClick={() => setEditingItem(null)}>Huỷ</Button>
                <Button type="button" variant="primary" onClick={handleSaveUsage}>Xác nhận dùng</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
