import { Button } from "../../../design-system/button/button.jsx";
import { Table } from "../../../design-system/table/table.jsx";
import { Select } from "../../../design-system/select/select.jsx";
import { Input } from "../../../design-system/input/input.jsx";
import { useState } from "react";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function TabLocation({ locations = [], warehouses = [], onAddLocation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [warehouseCode, setWarehouseCode] = useState("Kho A");
  const [locCode, setLocCode] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = () => {
    const trimmed = locCode.trim();
    if (!trimmed || !name.trim()) {
      setErrorMsg("Vui lòng nhập đầy đủ Mã vị trí và Tên vị trí!");
      return;
    }
    if (locations.some((l) => l.locationCode.toLowerCase() === trimmed.toLowerCase())) {
      setErrorMsg("Mã vị trí đã tồn tại");
      return;
    }
    setErrorMsg("");
    onAddLocation({
      warehouseCode,
      locationCode: trimmed,
      name: name.trim(),
      desc: desc || "Vị trí khoang kệ",
      materialCount: 0,
    });
    setModalOpen(false);
  };

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <div className="d-flex justify-content-between align-items-center">
        <span className="small text-muted">Cấu trúc phân cấp: Kho → Khoang → Kệ (BB02 2.1: chưa quy hoạch xong, tạm quản lý cấp Kho)</span>
        <Button type="button" variant="primary" className="py-1 px-2.5" style={{ fontSize: "12.5px" }} onClick={() => { setLocCode(""); setName(""); setErrorMsg(""); setModalOpen(true); }}>
          <Icon name="plus" size={14} className="me-1" /> Thêm vị trí mới
        </Button>
      </div>

      <div className="table-responsive border-0 rounded-0">
        <Table variant="standard" >
          <thead>
            <tr>
              <th style={{ width: "110px" }}>Mã kho</th>
              <th style={{ width: "130px" }}>Mã vị trí</th>
              <th style={{ minWidth: "180px" }}>Tên vị trí (Khoang/Kệ)</th>
              <th style={{ minWidth: "220px" }}>Mô tả</th>
              <th className="text-end" style={{ width: "120px" }}>Số loại vật tư</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((l) => (
              <tr key={l.locationCode}>
                <td><span className="code-chip font-mono">{l.warehouseCode}</span></td>
                <td><span className="code-chip font-mono">{l.locationCode}</span></td>
                <td className="fw-semibold text-dark small">{l.name}</td>
                <td className="small text-muted">{l.desc}</td>
                <td className="text-end font-mono fw-bold text-primary">{l.materialCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {modalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "440px" }}>
            <div className="modal-content">
              <div className="modal-header py-2.5 px-3 border-bottom border-outline-variant">
                <h5 className="modal-title font-headline fs-6 text-dark">Thêm vị trí Khoang / Kệ</h5>
                <Button type="button" className="btn-close" onClick={() => setModalOpen(false)} />
              </div>
              <div className="modal-body p-3 small d-flex flex-column gap-2">
                <div>
                  <label htmlFor="loc-wh-select" className="form-label text-dark fw-semibold mb-0.5">Kho trực thuộc *</label>
                  <Select variant="standard" id="loc-wh-select" className="w-100" value={warehouseCode} onChange={(e) => setWarehouseCode(e.target.value)}>
                    {warehouses.map((w) => <option key={w.code} value={w.code}>{w.code} - {w.name}</option>)}
                  </Select>
                </div>
                <div>
                  <label htmlFor="loc-code-input" className="form-label text-dark fw-semibold mb-0.5">Mã vị trí (Duy nhất) *</label>
                  <Input variant="compact" id="loc-code-input" type="text" className={`font-mono ${errorMsg ? "is-invalid" : ""}`} placeholder="VD: KHOANG-A3" value={locCode} onChange={(e) => { setLocCode(e.target.value); setErrorMsg(""); }} />
                  {errorMsg && <div className="invalid-feedback d-block small mt-1">{errorMsg}</div>}
                </div>
                <div>
                  <label htmlFor="loc-name-input" className="form-label text-dark fw-semibold mb-0.5">Tên vị trí *</label>
                  <Input variant="compact" id="loc-name-input" type="text"  placeholder="VD: Khoang A3 - Gỗ chèn dày" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="loc-desc-input" className="form-label text-dark mb-0.5">Mô tả vị trí</label>
                  <Input variant="compact" id="loc-desc-input" type="text"  value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer py-2 px-3 border-top border-outline-variant d-flex justify-content-between">
                <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Huỷ</Button>
                <Button type="button" variant="primary" onClick={handleSave}>Lưu vị trí</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
