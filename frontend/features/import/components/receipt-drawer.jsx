import { Button } from "../../../design-system/button/button.jsx";
import { ReceiptItemsForm } from "./receipt-items-form.jsx";
import { ReceiptReferenceForm } from "./receipt-reference-form.jsx";
import { ReceiptDetails } from "./receipt-details.jsx";
import { useState, useEffect } from "react";
import { Icon } from "../../../design-system/icon/icon.jsx";
import { showAppToast } from "../../../shared/utils/toast-service.js";

export function ReceiptDrawer({ show, onClose, onSave, existingReceipt = null, plans = [] }) {
  const [step, setStep] = useState(1);
  const [refNo, setRefNo] = useState("");
  const [refError, setRefError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [receiptType, setReceiptType] = useState("Mua sắm");
  const [targetWarehouse, setTargetWarehouse] = useState("Kho A");
  const [itemRows, setItemRows] = useState([]);

  const handleClose = () => {
    setStep(1);
    setRefNo("");
    setRefError("");
    setSelectedPlan(null);
    setItemRows([]);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!show) return null;

  const handleStep1Next = () => {
    const trimmed = refNo.trim();
    if (!trimmed) {
      setRefError("Vui lòng nhập số tham chiếu hợp đồng hoặc lệnh thu hồi");
      return;
    }
    const matched = plans.find((p) => p.contractNo.toLowerCase() === trimmed.toLowerCase());
    if (trimmed.startsWith("LTH-")) {
      setReceiptType("Thu hồi");
      setSelectedPlan(null);
      setItemRows([
        { code: "GL-002", name: "Gỗ chống lò cũ", unit: "Mét", expectedQty: 10, actualQty: 10, defectiveQty: 0, unitPrice: 0, condition: "Chờ đánh giá", mfgYear: "2025", origin: "Thu hồi mỏ" },
      ]);
      setRefError("");
      setStep(2);
      return;
    }
    if (!matched) {
      setRefError("Số tham chiếu không hợp lệ");
      return;
    }
    setSelectedPlan(matched);
    setReceiptType("Mua sắm");
    setRefError("");
    const rows = matched.items.map((it) => {
      const remaining = Math.max(0, it.approvedQuantity - (it.importedQuantity || 0));
      return {
        code: it.code,
        name: it.name,
        unit: it.unit,
        unitPrice: it.unitPrice,
        approvedQty: it.approvedQuantity,
        importedQty: it.importedQuantity || 0,
        remainingQty: remaining,
        expectedQty: remaining,
        actualQty: remaining,
        defectiveQty: 0,
        defectReason: "",
        condition: "Mới",
        mfgYear: "2026",
        origin: "Việt Nam",
      };
    });
    setItemRows(rows);
    setStep(2);
  };

  const handleSave = (autoConfirm) => {
    // Validate quantities
    for (const r of itemRows) {
      if (r.remainingQty !== undefined && r.actualQty > r.remainingQty) {
        showAppToast(`Số lượng thực nhập của vật tư ${r.code} vượt quá số còn được nhập (${r.remainingQty})!`, "error");
        return;
      }
    }
    const receiptData = {
      type: receiptType,
      referenceNo: refNo.trim(),
      warehouse: targetWarehouse,
      items: itemRows.map((r) => ({
        code: r.code,
        name: r.name,
        unit: r.unit,
        condition: r.condition,
        expectedQuantity: Number(r.expectedQty) || 0,
        actualQuantity: Number(r.actualQty) || 0,
        defectiveQuantity: Number(r.defectiveQty) || 0,
        defectReason: r.defectReason || "",
        unitPrice: r.unitPrice || 0,
        manufactureYear: r.mfgYear || "2026",
        origin: r.origin || "Việt Nam",
        warehouse: targetWarehouse,
      })),
    };
    onSave(receiptData, autoConfirm);
    handleClose();
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={handleClose} aria-hidden="true" />
      <div className="drawer-right" role="dialog" aria-modal="true" style={{ maxWidth: "560px" }}>
        <div className="px-4 py-3 border-bottom border-outline-variant d-flex align-items-center justify-content-between">
          <div>
            <h2 className="font-headline fs-6 m-0 text-dark">
              {existingReceipt ? `Chi tiết phiếu ${existingReceipt.id}` : "Lập phiếu nhập kho (2 bước)"}
            </h2>
            <div className="text-muted small" style={{ fontSize: "12px" }}>
              {existingReceipt ? `Loại: ${existingReceipt.type} • Trạng thái: ${existingReceipt.status}` : `Bước ${step}/2: ${step === 1 ? "Nhập số tham chiếu" : "Kiểm nhập và cập nhật tồn"}`}
            </div>
          </div>
          <Button type="button" className="btn btn-link p-1 text-secondary" onClick={handleClose} aria-label="Đóng"><Icon name="close" size={20} /></Button>
        </div>

        <div className="p-4 flex-grow-1 overflow-y-auto d-flex flex-column gap-3">
          {existingReceipt ? (
            <ReceiptDetails existingReceipt={existingReceipt} />
          ) : step === 1 ? (
            <ReceiptReferenceForm plans={plans} refError={refError} refNo={refNo} setRefError={setRefError} setRefNo={setRefNo} />
          ) : (
            <ReceiptItemsForm itemRows={itemRows} refNo={refNo} selectedPlan={selectedPlan} setItemRows={setItemRows} setTargetWarehouse={setTargetWarehouse} targetWarehouse={targetWarehouse} />
          )}
        </div>

        <div className="px-4 py-3 bg-light border-top border-outline-variant d-flex justify-content-between align-items-center">
          <Button type="button" variant="secondary" onClick={handleClose}>Đóng</Button>
          {!existingReceipt && (
            step === 1 ? (
              <Button type="button" variant="primary" onClick={handleStep1Next}>Tiếp tục <Icon name="arrow_forward" size={14} className="ms-1" /></Button>
            ) : (
              <div className="d-flex gap-2">
                <Button type="button" variant="secondary" onClick={() => handleSave(false)} title="Lưu nháp, chưa cộng vào tồn kho">Lưu</Button>
                <Button type="button" variant="primary" onClick={() => handleSave(true)} title="Tăng tồn kho và sinh lô truy vết">Lưu và cập nhật tồn kho</Button>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
