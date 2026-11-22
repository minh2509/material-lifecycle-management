import { Table } from "../../../design-system/table/table.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Input } from "../../../design-system/input/input.jsx";
import { useState } from "react";
import { Icon } from "../../../design-system/icon/icon.jsx";
import { showAppToast } from "../../../shared/utils/toast-service.js";

export function EvaluationTab({ recoveries = [], onEvaluateItem }) {
  const [evaluating, setEvaluating] = useState(null);
  const [reuseQty, setReuseQty] = useState(0);
  const [repairQty, setRepairQty] = useState(0);
  const [scrapQty, setScrapQty] = useState(0);
  const [scrapReason, setScrapReason] = useState("");

  const handleOpenEval = (rec, item) => {
    setEvaluating({ recId: rec.id, item });
    setReuseQty(item.evaluation?.reuseQty || 0);
    setRepairQty(item.evaluation?.repairQty || item.quantity);
    setScrapQty(item.evaluation?.scrapQty || 0);
    setScrapReason(item.evaluation?.scrapReason || "");
  };

  const handleSaveEval = () => {
    if (!evaluating) return;
    const total = Number(reuseQty) + Number(repairQty) + Number(scrapQty);
    if (total > evaluating.item.quantity) {
      showAppToast(`Tổng số lượng đánh giá (${total}) vượt quá số lượng tiếp nhận (${evaluating.item.quantity})!`, "error");
      return;
    }
    if (Number(scrapQty) > 0 && !scrapReason.trim()) {
      showAppToast("Chuyển phế liệu bắt buộc phải ghi rõ lý do!", "error");
      return;
    }
    onEvaluateItem(evaluating.recId, evaluating.item.id, {
      reuseQty: Number(reuseQty),
      repairQty: Number(repairQty),
      scrapQty: Number(scrapQty),
      scrapReason: scrapReason.trim(),
      unevaluatedQty: Math.max(0, evaluating.item.quantity - total),
    });
    showAppToast("Đã lưu kết quả đánh giá phân luồng kỹ thuật thành công!", "success");
    setEvaluating(null);
  };

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <div className="p-3 bg-light rounded border border-outline-variant small text-dark d-flex gap-2">
        <Icon name="info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <strong>Quy tắc phân luồng đánh giá kỹ thuật (BB02 mục 5.2, 5.3):</strong> Vật tư thu hồi được <strong>nhập kho trước</strong> (vào trạng thái Chờ đánh giá), sau đó <strong>đánh giá kỹ thuật sau</strong> theo 3 hướng: Tái sử dụng ngay (đơn giá 0) • Sửa chữa phục hồi • Phế liệu/tiêu huỷ (bắt buộc ghi lý do).
        </div>
      </div>

      <div className="table-responsive border-0 rounded-0">
        <Table variant="standard" >
          <thead>
            <tr>
              <th style={{ minWidth: "145px", width: "145px" }}>Phiếu thu hồi</th>
              <th style={{ minWidth: "135px", width: "135px" }}>Mã vật tư</th>
              <th style={{ minWidth: "200px" }}>Tên vật tư</th>
              <th className="text-end" style={{ width: "100px" }}>SL tiếp nhận</th>
              <th className="text-end" style={{ width: "110px" }}>Dùng lại (đ=0)</th>
              <th className="text-end" style={{ width: "110px" }}>Chuyển sửa</th>
              <th className="text-end" style={{ width: "110px" }}>Phế liệu</th>
              <th style={{ width: "130px" }}>Trạng thái</th>
              <th className="text-end" style={{ minWidth: "120px", width: "120px" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {recoveries.flatMap((rec) =>
              (rec.items || []).map((it) => (
                <tr key={`${rec.id}-${it.id}`}>
                  <td><span className="code-chip font-mono">{rec.id}</span></td>
                  <td><span className="code-chip">{it.code}</span></td>
                  <td className="small text-dark fw-medium">
                    <div>{it.name}</div>
                    <div className="text-muted" style={{ fontSize: "11px" }}>{it.conditionDesc}</div>
                  </td>
                  <td className="text-end font-mono fw-bold text-dark">{it.quantity} {it.unit}</td>
                  <td className="text-end font-mono text-success">{it.evaluation?.reuseQty ?? "—"}</td>
                  <td className="text-end font-mono text-primary">{it.evaluation?.repairQty ?? "—"}</td>
                  <td className="text-end font-mono text-danger">{it.evaluation?.scrapQty ?? "—"}</td>
                  <td>
                    <span className={`ui-badge ${it.evaluation?.status === "Đã đánh giá" ? "ui-badge-success" : "ui-badge-warning"}`}>
                      {it.evaluation?.status || "Chờ đánh giá"}
                    </span>
                  </td>
                  <td className="text-end">
                    <Button
                      type="button"
                      variant="primary" className="btn-ui-table-action"
                      onClick={() => handleOpenEval(rec, it)}
                      title="Thực hiện đánh giá kỹ thuật và phân luồng"
                    >
                      Đánh giá
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {evaluating && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "480px" }}>
            <div className="modal-content">
              <div className="modal-header py-2.5 px-3 border-bottom border-outline-variant">
                <h5 className="modal-title font-headline fs-6 text-dark">Phân luồng kỹ thuật: {evaluating.item.name}</h5>
                <Button type="button" className="btn-close" onClick={() => setEvaluating(null)} />
              </div>
              <div className="modal-body p-3 small d-flex flex-column gap-2.5">
                <div className="p-2 bg-light rounded text-muted font-mono">
                  Tổng tiếp nhận: <strong className="text-dark fs-6">{evaluating.item.quantity} {evaluating.item.unit}</strong>
                </div>
                <div className="row g-2">
                  <div className="col-4">
                    <label htmlFor="eval-reuse-input" className="form-label text-dark fw-semibold mb-0.5" style={{ fontSize: "11.5px" }}>Tái sử dụng ngay</label>
                    <Input variant="compact" id="eval-reuse-input" type="number" min="0" className="font-mono" value={reuseQty} onChange={(e) => setReuseQty(e.target.value)} />
                  </div>
                  <div className="col-4">
                    <label htmlFor="eval-repair-input" className="form-label text-dark fw-semibold mb-0.5" style={{ fontSize: "11.5px" }}>Sửa chữa phục hồi</label>
                    <Input variant="compact" id="eval-repair-input" type="number" min="0" className="font-mono" value={repairQty} onChange={(e) => setRepairQty(e.target.value)} />
                  </div>
                  <div className="col-4">
                    <label htmlFor="eval-scrap-input" className="form-label text-dark fw-semibold mb-0.5" style={{ fontSize: "11.5px" }}>Phế liệu/tiêu huỷ</label>
                    <Input variant="compact" id="eval-scrap-input" type="number" min="0" className="font-mono" value={scrapQty} onChange={(e) => setScrapQty(e.target.value)} />
                  </div>
                </div>
                {Number(scrapQty) > 0 && (
                  <div>
                    <label htmlFor="eval-scrap-reason" className="form-label text-danger fw-semibold mb-0.5">Lý do chuyển phế liệu (Bắt buộc) *</label>
                    <Input variant="compact" id="eval-scrap-reason" type="text"  placeholder="VD: Gãy nứt kết cấu, mục quá 50%..." value={scrapReason} onChange={(e) => setScrapReason(e.target.value)} />
                  </div>
                )}
              </div>
              <div className="modal-footer py-2 px-3 border-top border-outline-variant d-flex justify-content-between">
                <Button type="button" variant="secondary" onClick={() => setEvaluating(null)}>Huỷ</Button>
                <Button type="button" variant="primary" onClick={handleSaveEval}>Lưu kết quả đánh giá</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
