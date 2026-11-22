import { Button } from "../../../design-system/button/button.jsx";
import { Table } from "../../../design-system/table/table.jsx";
import { Input } from "../../../design-system/input/input.jsx";
import { useState } from "react";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function TabWarehouse({ warehouses = [], onAddWarehouse }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [dimension, setDimension] = useState("");
  const [area, setArea] = useState(500);
  const [manager, setManager] = useState("");
  const [desc, setDesc] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = () => {
    const trimmed = code.trim();
    if (!trimmed || !name.trim()) {
      setErrorMsg("Vui lòng nhập đầy đủ Mã kho và Tên kho!");
      return;
    }
    if (warehouses.some((w) => w.code.toLowerCase() === trimmed.toLowerCase())) {
      setErrorMsg("Mã kho đã tồn tại");
      return;
    }
    setErrorMsg("");
    onAddWarehouse({
      code: trimmed,
      name: name.trim(),
      dimension: dimension || "—",
      area: Number(area) || 0,
      locationCount: 0,
      functionDesc: desc || "Lưu trữ vật tư",
      department: "Phòng Cơ điện – Vận tải",
      manager: manager || "Thủ kho",
    });
    setModalOpen(false);
  };

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <div className="d-flex justify-content-between align-items-center">
        <span className="small text-muted">Hiện có {warehouses.length} kho vật tư theo quy hoạch mỏ (BB02 mục 2.1)</span>
        <Button type="button" variant="primary" className="py-1 px-2.5" style={{ fontSize: "12.5px" }} onClick={() => { setCode(""); setName(""); setErrorMsg(""); setModalOpen(true); }}>
          <Icon name="plus" size={14} className="me-1" /> Thêm kho mới
        </Button>
      </div>

      <div className="table-responsive border-0 rounded-0">
        <Table variant="standard" >
          <thead>
            <tr>
              <th style={{ width: "110px" }}>Mã kho</th>
              <th style={{ minWidth: "180px" }}>Tên kho</th>
              <th style={{ width: "120px" }}>Kích thước</th>
              <th className="text-end" style={{ width: "110px" }}>Diện tích (m²)</th>
              <th className="text-end" style={{ width: "110px" }}>Số vị trí</th>
              <th style={{ minWidth: "200px" }}>Công năng kho</th>
              <th style={{ width: "140px" }}>Người quản lý</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((w) => (
              <tr key={w.code}>
                <td><span className="code-chip font-mono">{w.code}</span></td>
                <td className="fw-semibold text-dark small">{w.name}</td>
                <td className="font-mono small text-muted">{w.dimension}</td>
                <td className="text-end font-mono text-dark">{w.area}</td>
                <td className="text-end font-mono text-primary fw-bold">{w.locationCount}</td>
                <td className="small text-muted">{w.functionDesc}</td>
                <td className="small text-dark fw-medium">{w.manager}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {modalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "460px" }}>
            <div className="modal-content">
              <div className="modal-header py-2.5 px-3 border-bottom border-outline-variant">
                <h5 className="modal-title font-headline fs-6 text-dark">Thêm mới kho vật tư</h5>
                <Button type="button" className="btn-close" onClick={() => setModalOpen(false)} />
              </div>
              <div className="modal-body p-3 small d-flex flex-column gap-2">
                <div>
                  <label htmlFor="wh-code-input" className="form-label text-dark fw-semibold mb-0.5">Mã kho (Duy nhất) *</label>
                  <Input variant="compact" id="wh-code-input" type="text" className={`font-mono ${errorMsg ? "is-invalid" : ""}`} placeholder="VD: Kho D" value={code} onChange={(e) => { setCode(e.target.value); setErrorMsg(""); }} />
                  {errorMsg && <div className="invalid-feedback d-block small mt-1">{errorMsg}</div>}
                </div>
                <div>
                  <label htmlFor="wh-name-input" className="form-label text-dark fw-semibold mb-0.5">Tên kho *</label>
                  <Input variant="compact" id="wh-name-input" type="text"  placeholder="VD: Kho Gỗ Lò Dự Phòng" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label htmlFor="wh-dim-input" className="form-label text-dark mb-0.5">Kích thước</label>
                    <Input variant="compact" id="wh-dim-input" type="text"  placeholder="40m x 20m" value={dimension} onChange={(e) => setDimension(e.target.value)} />
                  </div>
                  <div className="col-6">
                    <label htmlFor="wh-area-input" className="form-label text-dark mb-0.5">Diện tích (m²)</label>
                    <Input variant="compact" id="wh-area-input" type="number"  value={area} onChange={(e) => setArea(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label htmlFor="wh-manager-input" className="form-label text-dark mb-0.5">Người quản lý</label>
                  <Input variant="compact" id="wh-manager-input" type="text"  placeholder="VD: Nguyễn Văn Nam" value={manager} onChange={(e) => setManager(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="wh-desc-input" className="form-label text-dark mb-0.5">Công năng</label>
                  <Input variant="compact" id="wh-desc-input" type="text"  placeholder="Chứa vật tư..." value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer py-2 px-3 border-top border-outline-variant d-flex justify-content-between">
                <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Huỷ</Button>
                <Button type="button" variant="primary" onClick={handleSave}>Lưu kho</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
