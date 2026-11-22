import { Button } from "../../../design-system/button/button.jsx";
import { Select } from "../../../design-system/select/select.jsx";
import { Input } from "../../../design-system/input/input.jsx";
import { useState, useEffect } from "react";
import { Icon } from "../../../design-system/icon/icon.jsx";
import { showAppToast } from "../../../shared/utils/toast-service.js";

export function RecoveryDrawer({ show, onClose, onSave, existingRecovery = null, workshops = [] }) {
  const [workshop, setWorkshop] = useState("Phân xưởng Khai thác 1");
  const [warehouse, setWarehouse] = useState("Kho B");
  const [content, setContent] = useState("");
  const [code, setCode] = useState("GL-002");
  const [name, setName] = useState("Gỗ chống lò bạch đàn cũ");
  const [unit, setUnit] = useState("Mét");
  const [quantity, setQuantity] = useState(10);
  const [conditionDesc, setConditionDesc] = useState("Bề mặt trầy xước, nứt đầu, kết cấu chịu lực còn tốt");
  const [proposedHandling, setProposedHandling] = useState("Sửa chữa");
  const [reason, setReason] = useState("Kết thúc chu kỳ diện lò khấu");

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!show) return null;

  const handleSave = (status) => {
    if (!content.trim() || !conditionDesc.trim()) {
      showAppToast("Vui lòng nhập đầy đủ Nội dung thu hồi và Mô tả tình trạng vật tư!", "error");
      return;
    }
    const recData = {
      workshop,
      warehouse,
      content: content.trim(),
      status,
      receiptRef: "PNK-TH-NEW",
      items: [
        {
          id: `item-${Date.now()}`,
          code,
          name,
          unit,
          quantity: Number(quantity) || 1,
          category: "Cũ",
          reason,
          conditionDesc,
          proposedHandling,
          evaluation: {
            status: "Chờ đánh giá",
            evaluator: null,
            approvedBy: null,
            reuseQty: 0,
            repairQty: 0,
            scrapQty: 0,
            unevaluatedQty: Number(quantity) || 1,
          },
        },
      ],
    };
    onSave(recData);
    onClose();
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="drawer-right" role="dialog" aria-modal="true" style={{ maxWidth: "560px" }}>
        <div className="px-4 py-3 border-bottom border-outline-variant d-flex align-items-center justify-content-between">
          <div>
            <h2 className="font-headline fs-6 m-0 text-dark">
              {existingRecovery ? `Phiếu thu hồi ${existingRecovery.id}` : "Lập phiếu thu hồi vật tư"}
            </h2>
            <div className="text-muted small" style={{ fontSize: "12px" }}>
              {existingRecovery ? `Đơn vị: ${existingRecovery.workshop} • Trạng thái: ${existingRecovery.status}` : "Tiếp nhận vật tư cũ/hỏng nhập kho trước đánh giá sau"}
            </div>
          </div>
          <Button type="button" className="btn btn-link p-1 text-secondary" onClick={onClose} aria-label="Đóng"><Icon name="close" size={20} /></Button>
        </div>

        <div className="p-4 flex-grow-1 overflow-y-auto d-flex flex-column gap-3">
          {existingRecovery ? (
            <div className="d-flex flex-column gap-3">
              <div className="p-3 rounded bg-light border border-outline-variant small">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Đơn vị giao:</span>
                  <span className="fw-semibold text-dark">{existingRecovery.workshop}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Kho tiếp nhận:</span>
                  <span className="fw-medium text-dark">{existingRecovery.warehouse}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Biên bản nhập kho:</span>
                  <span className="code-chip font-mono">{existingRecovery.receiptRef || "Chưa nhập"}</span>
                </div>
              </div>

              <h3 className="font-headline fs-6 text-dark m-0">Vật tư thu hồi tiếp nhận</h3>
              <div className="border border-outline-variant rounded p-2">
                {existingRecovery.items?.map((it, idx) => (
                  <div key={idx} className="py-2 border-bottom border-outline-subtle last-border-0">
                    <div className="fw-bold text-dark small">{it.name} <span className="code-chip ms-1">{it.code}</span></div>
                    <div className="text-muted small mt-1 font-mono">
                      SL: <strong className="text-dark">{it.quantity} {it.unit}</strong> • Phân loại: {it.category}
                    </div>
                    <div className="text-muted small mt-1">Tình trạng: {it.conditionDesc}</div>
                    <div className="text-muted small">Đề xuất: <strong className="text-primary">{it.proposedHandling}</strong></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              <div className="row g-2">
                <div className="col-7">
                  <label htmlFor="rec-ws-select" className="form-label small fw-semibold text-dark mb-1">Đơn vị thu hồi <span className="text-danger">*</span></label>
                  <Select variant="standard" id="rec-ws-select" className="w-100" value={workshop} onChange={(e) => setWorkshop(e.target.value)}>
                    {workshops.map((w) => <option key={w.code} value={w.name}>{w.name}</option>)}
                  </Select>
                </div>
                <div className="col-5">
                  <label htmlFor="rec-wh-select" className="form-label small fw-semibold text-dark mb-1">Kho nhận <span className="text-danger">*</span></label>
                  <Select variant="standard" id="rec-wh-select" className="w-100" value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
                    <option value="Kho B">Kho B</option>
                    <option value="Kho A">Kho A</option>
                    <option value="Kho C">Kho C</option>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="rec-content-input" className="form-label small fw-semibold text-dark mb-1">Nội dung thu hồi <span className="text-danger">*</span></label>
                <Input variant="compact" id="rec-content-input" type="text"  placeholder="VD: Thu hồi dầm chống sau khi đào lò chợ" value={content} onChange={(e) => setContent(e.target.value)} />
              </div>

              <div className="p-3 bg-light rounded border border-outline-variant small d-flex flex-column gap-2">
                <div className="fw-semibold text-dark">Thông tin vật tư thu hồi:</div>
                <div className="row g-2">
                  <div className="col-8">
                    <label htmlFor="rec-mat-select" className="text-muted small mb-0.5">Vật tư</label>
                    <Select variant="standard" id="rec-mat-select" className="w-100 font-mono" value={code} onChange={(e) => {
                      const c = e.target.value;
                      setCode(c);
                      if (c === "GL-002") { setName("Gỗ chống lò cũ"); setUnit("Mét"); }
                      else if (c === "VC-001") { setName("Ván chèn lò cũ"); setUnit("Tấm"); }
                      else { setName("Vật tư thu hồi khác"); setUnit("Bộ"); }
                    }}>
                      <option value="GL-002">GL-002 - Gỗ chống lò cũ</option>
                      <option value="VC-001">VC-001 - Ván chèn lò cũ</option>
                      <option value="GL-001">GL-001 - Gỗ chèn lò cũ</option>
                    </Select>
                  </div>
                  <div className="col-4">
                    <label htmlFor="rec-qty-input" className="text-muted small mb-0.5">Số lượng ({unit})</label>
                    <Input variant="compact" id="rec-qty-input" type="number" min="1" className="font-mono" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label htmlFor="rec-desc-input" className="text-muted small mb-0.5">Mô tả tình trạng thực tế *</label>
                  <Input variant="compact" id="rec-desc-input" type="text"  value={conditionDesc} onChange={(e) => setConditionDesc(e.target.value)} />
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <label htmlFor="rec-handling-select" className="text-muted small mb-0.5">Đề xuất xử lý *</label>
                    <Select variant="standard" id="rec-handling-select" className="w-100" value={proposedHandling} onChange={(e) => setProposedHandling(e.target.value)}>
                      <option value="Sửa chữa">Sửa chữa phục hồi</option>
                      <option value="Tái sử dụng">Tái sử dụng được ngay</option>
                      <option value="Phế liệu">Phế liệu / tiêu huỷ</option>
                    </Select>
                  </div>
                  <div className="col-6">
                    <label htmlFor="rec-reason-input" className="text-muted small mb-0.5">Lý do thu hồi</label>
                    <Input variant="compact" id="rec-reason-input" type="text"  value={reason} onChange={(e) => setReason(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-light border-top border-outline-variant d-flex justify-content-between align-items-center">
          <Button type="button" variant="secondary" onClick={onClose}>Đóng</Button>
          {!existingRecovery && (
            <div className="d-flex gap-2">
              <Button type="button" variant="secondary" onClick={() => handleSave("Khởi tạo")}>Lưu</Button>
              <Button type="button" variant="primary" onClick={() => handleSave("Duyệt")}>Lưu và Duyệt</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
