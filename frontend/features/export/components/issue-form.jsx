import { Select } from "../../../design-system/select/select.jsx";
import { Input } from "../../../design-system/input/input.jsx";
export function IssueForm({ content, currentLot, effectiveLotCode, errorMsg, existingIssue, issueQty, lots, receiver, requestRef, requests, setContent, setErrorMsg, setIssueQty, setReceiver, setRequestRef, setSelectedLotCode, setShift, setWorkshop, shift, workshop, workshops }) {
  return (
    <div className="p-4 flex-grow-1 overflow-y-auto d-flex flex-column gap-3">
      {existingIssue ? (
        <div className="d-flex flex-column gap-3">
          <div className="p-3 rounded bg-light border border-outline-variant small">
            <div className="d-flex justify-content-between mb-1">
              <span className="text-muted">Ngày xuất & Ca:</span>
              <span className="font-mono text-dark fw-bold">{existingIssue.issueDate} ({existingIssue.shift})</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span className="text-muted">Đơn vị & Người nhận:</span>
              <span className="fw-medium text-dark">{existingIssue.workshop} — {existingIssue.receiver}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span className="text-muted">Thủ kho lập:</span>
              <span className="fw-medium text-dark">{existingIssue.storekeeper}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Trưởng phòng duyệt:</span>
              <span className="fw-semibold text-primary">{existingIssue.confirmedBy || "Chưa duyệt"}</span>
            </div>
          </div>

          <div className="p-2.5 rounded bg-primary-subtle bg-opacity-25 border border-primary-subtle small text-dark">
            <strong>Quy tắc cập nhật tồn (BB02 mục 4.4):</strong> Tồn kho chỉ giảm và lượng phân xưởng nhận chỉ tăng khi <strong>Trưởng phòng xác nhận cuối</strong> sau kiểm đếm.
          </div>

          <h3 className="font-headline fs-6 text-dark m-0">Vật tư xuất kho theo lô</h3>
          <div className="border border-outline-variant rounded p-2">
            {existingIssue.items?.map((it, idx) => (
              <div key={idx} className="py-2 border-bottom border-outline-subtle last-border-0">
                <div className="fw-bold text-dark small">{it.name} <span className="code-chip ms-1">{it.code}</span></div>
                <div className="d-flex justify-content-between text-muted small mt-1 font-mono">
                  <span>Lô: <strong className="text-dark">{it.lotCode}</strong> ({it.warehouse})</span>
                  <span>SL: <strong className="text-dark fs-6">{it.quantity} {it.unit}</strong></span>
                  <span>Đơn giá: {it.unitPrice?.toLocaleString("vi-VN")} đ</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          <div className="row g-2">
            <div className="col-7">
              <label htmlFor="issue-ws-select" className="form-label small fw-semibold text-dark mb-1">Đơn vị nhận <span className="text-danger">*</span></label>
              <Select variant="standard" id="issue-ws-select" className="w-100" value={workshop} onChange={(e) => setWorkshop(e.target.value)}>
                {workshops.map((w) => <option key={w.code} value={w.name}>{w.name}</option>)}
              </Select>
            </div>
            <div className="col-5">
              <label htmlFor="issue-shift-select" className="form-label small fw-semibold text-dark mb-1">Ca làm việc <span className="text-danger">*</span></label>
              <Select variant="standard" id="issue-shift-select" className="w-100" value={shift} onChange={(e) => setShift(e.target.value)}>
                <option value="Ca1">Ca 1</option>
                <option value="Ca2">Ca 2</option>
                <option value="Ca3">Ca 3</option>
                <option value="Hành chính">Hành chính</option>
              </Select>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-7">
              <label htmlFor="issue-receiver-input" className="form-label small fw-semibold text-dark mb-1">Người nhận <span className="text-danger">*</span></label>
              <Input variant="compact" id="issue-receiver-input" type="text"  value={receiver} onChange={(e) => setReceiver(e.target.value)} />
            </div>
            <div className="col-5">
              <label htmlFor="issue-req-select" className="form-label small fw-semibold text-dark mb-1">Tham chiếu yêu cầu</label>
              <Select variant="standard" id="issue-req-select" className="w-100" value={requestRef} onChange={(e) => setRequestRef(e.target.value)}>
                <option value="">Không tham chiếu</option>
                {requests.map((r) => <option key={r.id} value={r.id}>{r.id}</option>)}
              </Select>
            </div>
          </div>

          <div>
            <label htmlFor="issue-content-input" className="form-label small fw-semibold text-dark mb-1">Nội dung xuất kho</label>
            <Input variant="compact" id="issue-content-input" type="text"  placeholder="VD: Xuất vật tư chống chèn lò ca 1" value={content} onChange={(e) => setContent(e.target.value)} />
          </div>

          <div>
            <label htmlFor="issue-lot-select" className="form-label small fw-semibold text-dark mb-1">Chọn lô vật tư xuất (Định dạng khách hàng) *</label>
            <Select variant="standard" id="issue-lot-select" className="w-100 font-mono" style={{ fontSize: "13px" }} value={effectiveLotCode} onChange={(e) => { setSelectedLotCode(e.target.value); setErrorMsg(""); }}>
              {lots.filter((l) => l.availableQuantity > 0).map((l) => (
                <option key={l.lotCode} value={l.lotCode}>
                  [{l.lotCode}]_[{l.materialCode}]_[{l.materialName}]_Tồn kho:[{l.availableQuantity}]_Giá:[{l.unitPrice?.toLocaleString("vi-VN")}]
                </option>
              ))}
            </Select>
          </div>

          {currentLot && (
            <div className="p-3 bg-light rounded border border-outline-variant small d-flex flex-column gap-2">
              <div className="d-flex justify-content-between">
                <span className="text-muted">Tồn khả dụng trong lô:</span>
                <strong className="text-primary font-mono fs-6">{currentLot.availableQuantity} {currentLot.unit}</strong>
              </div>
              <div>
                <label htmlFor="issue-qty-input" className="form-label fw-semibold text-dark mb-0.5">Số lượng xuất ({currentLot.unit}) *</label>
                <Input variant="compact"
                  id="issue-qty-input"
                  type="number"
                  min="1"
                  max={currentLot.availableQuantity}
                  className={`font-mono ${errorMsg ? "is-invalid" : ""}`}
                  value={issueQty}
                  onChange={(e) => { setIssueQty(e.target.value); setErrorMsg(""); }}
                />
                {errorMsg && <div className="invalid-feedback d-block small mt-1">{errorMsg}</div>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
