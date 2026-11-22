export function ReceiptDetails({ existingReceipt }) {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="p-3 rounded bg-light border border-outline-variant small">
        <div className="d-flex justify-content-between mb-1">
          <span className="text-muted">Số tham chiếu:</span>
          <span className="font-mono fw-bold text-dark">{existingReceipt.referenceNo}</span>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <span className="text-muted">Kho tiếp nhận:</span>
          <span className="fw-medium text-dark">{existingReceipt.warehouse}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="text-muted">Xác nhận:</span>
          <span className="fw-medium text-dark">{existingReceipt.confirmedBy || "Chưa xác nhận"}</span>
        </div>
      </div>
      <h3 className="font-headline fs-6 text-dark m-0">Danh sách vật tư thực nhập</h3>
      <div className="border border-outline-variant rounded p-2">
        {existingReceipt.items?.map((it, idx) => (
          <div key={idx} className="py-2 border-bottom border-outline-subtle last-border-0">
            <div className="fw-medium text-dark small">{it.name} <span className="code-chip ms-1">{it.code}</span></div>
            <div className="d-flex justify-content-between text-muted small mt-1 font-mono">
              <span>SL nhập: <strong className="text-dark">{it.actualQuantity} {it.unit}</strong></span>
              {it.defectiveQuantity > 0 && <span className="text-danger">Hỏng: {it.defectiveQuantity} {it.unit}</span>}
              <span>Đơn giá: {it.unitPrice?.toLocaleString("vi-VN")} đ</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
