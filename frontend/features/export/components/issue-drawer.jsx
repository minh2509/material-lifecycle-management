import { Button } from "../../../design-system/button/button.jsx";
import { IssueForm } from "./issue-form.jsx";
import { useState, useEffect } from "react";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function IssueDrawer({ show, onClose, onSave, onConfirm, existingIssue = null, lots = [], workshops = [], requests = [] }) {
  const [workshop, setWorkshop] = useState("Phân xưởng Khai thác 1");
  const [receiver, setReceiver] = useState("Trần Văn Hùng");
  const [shift, setShift] = useState("Ca1");
  const [content, setContent] = useState("");
  const [requestRef, setRequestRef] = useState("");
  const [selectedLotCode, setSelectedLotCode] = useState("");
  const [issueQty, setIssueQty] = useState(10);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!show) return null;

  const effectiveLotCode = selectedLotCode || lots[0]?.lotCode || "";
  const currentLot = lots.find((l) => l.lotCode === effectiveLotCode);

  const handleSave = (autoApprove) => {
    if (!currentLot) {
      setErrorMsg("Vui lòng chọn lô vật tư xuất");
      return;
    }
    if (issueQty > currentLot.availableQuantity) {
      setErrorMsg("Số lượng vật tư tồn kho không đủ");
      return;
    }
    setErrorMsg("");
    const issueData = {
      content: content.trim() || `Xuất vật tư cho ${workshop} (${shift})`,
      requestRef,
      workshop,
      receiver,
      shift,
      storekeeper: "Nguyễn Văn Nam",
      items: [
        {
          code: currentLot.materialCode,
          name: currentLot.materialName,
          unit: currentLot.unit,
          lotCode: currentLot.lotCode,
          quantity: Number(issueQty) || 0,
          unitPrice: currentLot.unitPrice || 0,
          warehouse: currentLot.warehouse || "Kho A",
        },
      ],
    };
    onSave(issueData, autoApprove);
    onClose();
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="drawer-right" role="dialog" aria-modal="true" style={{ maxWidth: "560px" }}>
        <div className="px-4 py-3 border-bottom border-outline-variant d-flex align-items-center justify-content-between">
          <div>
            <h2 className="font-headline fs-6 m-0 text-dark">
              {existingIssue ? `Chi tiết phiếu xuất ${existingIssue.id}` : "Lập phiếu xuất kho"}
            </h2>
            <div className="text-muted small" style={{ fontSize: "12px" }}>
              {existingIssue ? `Đơn vị: ${existingIssue.workshop} • Trạng thái: ${existingIssue.status}` : "Cấp phát vật tư trực tiếp tại kho cho phân xưởng"}
            </div>
          </div>
          <Button type="button" className="btn btn-link p-1 text-secondary" onClick={onClose} aria-label="Đóng"><Icon name="close" size={20} /></Button>
        </div>

        <IssueForm content={content} currentLot={currentLot} effectiveLotCode={effectiveLotCode} errorMsg={errorMsg} existingIssue={existingIssue} issueQty={issueQty} lots={lots} receiver={receiver} requestRef={requestRef} requests={requests} setContent={setContent} setErrorMsg={setErrorMsg} setIssueQty={setIssueQty} setReceiver={setReceiver} setRequestRef={setRequestRef} setSelectedLotCode={setSelectedLotCode} setShift={setShift} setWorkshop={setWorkshop} shift={shift} workshop={workshop} workshops={workshops} />

        <div className="px-4 py-3 bg-light border-top border-outline-variant d-flex justify-content-between align-items-center">
          <Button type="button" variant="secondary" onClick={onClose}>Đóng</Button>
          {existingIssue ? (
            existingIssue.status === "Chờ xuất" && (
              <Button type="button" variant="primary" onClick={() => { onConfirm(existingIssue.id); onClose(); }}>
                Duyệt xuất (Trưởng phòng)
              </Button>
            )
          ) : (
            <div className="d-flex gap-2">
              <Button type="button" variant="secondary" onClick={() => handleSave(false)} title="Lưu ở trạng thái Chờ xuất">Lưu (Chờ xuất)</Button>
              <Button type="button" variant="primary" onClick={() => handleSave(true)} title="Xác nhận cuối: Giảm kho và tăng nhận phân xưởng">Lưu và Duyệt</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
