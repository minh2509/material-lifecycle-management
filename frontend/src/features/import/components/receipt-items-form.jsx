import { Select } from "../../../design-system/select/select.jsx";
import { Input } from "../../../design-system/input/input.jsx";
export function ReceiptItemsForm({ itemRows, refNo, selectedPlan, setItemRows, setTargetWarehouse, targetWarehouse }) {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex justify-content-between align-items-center bg-light p-2.5 rounded border border-outline-variant small">
        <span>Tham chiếu: <strong className="font-mono text-dark">{refNo}</strong></span>
        <div className="d-flex align-items-center gap-1.5">
          <label htmlFor="wh-select" className="text-muted small m-0">Kho nhập:</label>
          <Select variant="standard" id="wh-select"  value={targetWarehouse} onChange={(e) => setTargetWarehouse(e.target.value)}>
            <option value="Kho A">Kho A</option>
            <option value="Kho B">Kho B</option>
            <option value="Kho C">Kho C</option>
          </Select>
        </div>
      </div>

      <div className="small text-muted">
        {selectedPlan && <span>Dự trù: {selectedPlan.content}</span>}
      </div>

      {itemRows.map((r, idx) => (
        <div key={idx} className="p-3 border border-outline-variant rounded bg-white small d-flex flex-column gap-2">
          <div className="fw-bold text-dark">{r.name} <span className="code-chip ms-1">{r.code}</span></div>
          <div className="d-flex justify-content-between text-muted font-mono" style={{ fontSize: "12px" }}>
            <span>Đã duyệt: {r.approvedQty ?? "—"}</span>
            <span>Đã nhập: {r.importedQty ?? 0}</span>
            <span className="text-primary fw-semibold">Còn được nhập: {r.remainingQty ?? "—"}</span>
          </div>
          <div className="row g-2">
            <div className="col-6">
              <label htmlFor={`act-qty-${idx}`} className="form-label text-dark mb-0.5" style={{ fontSize: "11.5px" }}>SL thực nhập ({r.unit}) *</label>
              <Input variant="compact" id={`act-qty-${idx}`} type="number" min="0" max={r.remainingQty} className="font-mono" value={r.actualQty} onChange={(e) => {
                const val = Number(e.target.value);
                setItemRows(itemRows.map((it, i) => i === idx ? { ...it, actualQty: val } : it));
              }} />
            </div>
            <div className="col-6">
              <label htmlFor={`def-qty-${idx}`} className="form-label text-dark mb-0.5" style={{ fontSize: "11.5px" }}>Hàng hỏng/không đạt</label>
              <Input variant="compact" id={`def-qty-${idx}`} type="number" min="0" className="font-mono" value={r.defectiveQty} onChange={(e) => {
                const val = Number(e.target.value);
                setItemRows(itemRows.map((it, i) => i === idx ? { ...it, defectiveQty: val } : it));
              }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
