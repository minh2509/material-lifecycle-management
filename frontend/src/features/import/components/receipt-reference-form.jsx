import { Input } from "../../../design-system/input/input.jsx";
import { Button } from "../../../design-system/button/button.jsx";
export function ReceiptReferenceForm({ plans, refError, refNo, setRefError, setRefNo }) {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="p-3 rounded bg-primary-subtle bg-opacity-25 border border-primary-subtle small text-dark">
        <strong>Quy trình khách hàng (KH-GỐC):</strong> Nhập số hợp đồng dự trù hoặc lệnh thu hồi. Hệ thống sẽ tự nạp danh mục và kiểm tra tính hợp lệ.
      </div>
      <div>
        <label htmlFor="ref-input" className="form-label small fw-semibold text-dark mb-1">Số tham chiếu hợp đồng / Lệnh thu hồi <span className="text-danger">*</span></label>
        <Input variant="standard"
          id="ref-input"
          type="text"
          className={`font-mono ${refError ? "is-invalid" : ""}`}
          placeholder="Ví dụ: HĐ-2026/089-TKV"
          value={refNo}
          onChange={(e) => { setRefNo(e.target.value); setRefError(""); }}
        />
        {refError && <div className="invalid-feedback d-block small mt-1">{refError}</div>}
      </div>
      <div className="p-2.5 rounded bg-light border border-outline-variant small">
        <span className="text-muted small d-block mb-1">Gợi ý tham chiếu mẫu có sẵn:</span>
        <div className="d-flex gap-2 flex-wrap">
          {plans.map((p) => (
            <Button key={p.id} type="button" variant="outline" className="py-0 font-mono" style={{ fontSize: "11.5px" }} onClick={() => { setRefNo(p.contractNo); setRefError(""); }}>
              {p.contractNo} ({p.status})
            </Button>
          ))}
          <Button type="button" variant="outline" className="py-0 font-mono" style={{ fontSize: "11.5px" }} onClick={() => { setRefNo("LTH-2026-001"); setRefError(""); }}>
            LTH-2026-001 (Thu hồi)
          </Button>
        </div>
      </div>
    </div>
  );
}
