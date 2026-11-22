import { Table } from "../../../design-system/table/table.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Input } from "../../../design-system/input/input.jsx";
import { useState } from "react";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function TabSupplierWorkshop({ suppliers = [], workshops = [], onAddSupplier }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = () => {
    const trimmed = code.trim();
    if (!trimmed || !name.trim()) {
      setErrorMsg("Vui lòng nhập đầy đủ Mã NCC và Tên nhà cung cấp!");
      return;
    }
    if (suppliers.some((s) => s.code.toLowerCase() === trimmed.toLowerCase())) {
      setErrorMsg("Mã NCC đã tồn tại");
      return;
    }
    setErrorMsg("");
    onAddSupplier({
      code: trimmed,
      name: name.trim(),
      address: address || "Quảng Ninh",
      phone: phone || "—",
      deliveryContact: contact || "—",
    });
    setModalOpen(false);
  };

  return (
    <div className="d-flex flex-column gap-4 p-3">
      {/* Phân xưởng & Đơn vị */}
      <div>
        <h3 className="font-headline fs-6 text-dark mb-2">Đơn vị & Phân xưởng sản xuất (24/24, 3 ca)</h3>
        <div className="table-responsive border-0 rounded-0">
          <Table variant="standard" >
            <thead>
              <tr>
                <th style={{ width: "110px" }}>Mã đơn vị</th>
                <th style={{ minWidth: "220px" }}>Tên phân xưởng</th>
                <th style={{ width: "160px" }}>Người phụ trách</th>
                <th style={{ minWidth: "180px" }}>Khu vực sản xuất</th>
                <th style={{ width: "140px" }}>Chế độ làm việc</th>
              </tr>
            </thead>
            <tbody>
              {workshops.map((w) => (
                <tr key={w.code}>
                  <td><span className="code-chip font-mono">{w.code}</span></td>
                  <td className="fw-semibold text-dark small">{w.name}</td>
                  <td className="small text-dark">{w.manager}</td>
                  <td className="small text-muted">{w.area}</td>
                  <td><span className="small text-muted">{w.shifts}</span></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Nhà cung cấp */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="font-headline fs-6 text-dark m-0">Nhà cung cấp vật tư</h3>
          <Button type="button" variant="primary" className="py-1 px-2.5" style={{ fontSize: "12.5px" }} onClick={() => { setCode(""); setName(""); setErrorMsg(""); setModalOpen(true); }}>
            <Icon name="plus" size={14} className="me-1" /> Thêm nhà cung cấp
          </Button>
        </div>
        <div className="table-responsive border-0 rounded-0">
          <Table variant="standard" >
            <thead>
              <tr>
                <th style={{ width: "110px" }}>Mã NCC</th>
                <th style={{ minWidth: "240px" }}>Tên nhà cung cấp</th>
                <th style={{ minWidth: "240px" }}>Địa chỉ</th>
                <th style={{ width: "130px" }}>Số điện thoại</th>
                <th style={{ minWidth: "180px" }}>Người giao hàng</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s.code}>
                  <td><span className="code-chip font-mono">{s.code}</span></td>
                  <td className="fw-semibold text-dark small">{s.name}</td>
                  <td className="small text-muted">{s.address}</td>
                  <td className="font-mono small text-dark">{s.phone}</td>
                  <td className="small text-dark">{s.deliveryContact}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {modalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "440px" }}>
            <div className="modal-content">
              <div className="modal-header py-2.5 px-3 border-bottom border-outline-variant">
                <h5 className="modal-title font-headline fs-6 text-dark">Thêm Nhà cung cấp</h5>
                <Button type="button" className="btn-close" onClick={() => setModalOpen(false)} />
              </div>
              <div className="modal-body p-3 small d-flex flex-column gap-2">
                <div>
                  <label htmlFor="sup-code-input" className="form-label text-dark fw-semibold mb-0.5">Mã NCC (Duy nhất) *</label>
                  <Input variant="compact" id="sup-code-input" type="text" className={`font-mono ${errorMsg ? "is-invalid" : ""}`} placeholder="VD: NCC-03" value={code} onChange={(e) => { setCode(e.target.value); setErrorMsg(""); }} />
                  {errorMsg && <div className="invalid-feedback d-block small mt-1">{errorMsg}</div>}
                </div>
                <div>
                  <label htmlFor="sup-name-input" className="form-label text-dark fw-semibold mb-0.5">Tên nhà cung cấp *</label>
                  <Input variant="compact" id="sup-name-input" type="text"  value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="sup-addr-input" className="form-label text-dark mb-0.5">Địa chỉ</label>
                  <Input variant="compact" id="sup-addr-input" type="text"  value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <label htmlFor="sup-phone-input" className="form-label text-dark mb-0.5">Điện thoại</label>
                    <Input variant="compact" id="sup-phone-input" type="text" className="font-mono" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="col-6">
                    <label htmlFor="sup-contact-input" className="form-label text-dark mb-0.5">Người giao hàng</label>
                    <Input variant="compact" id="sup-contact-input" type="text"  value={contact} onChange={(e) => setContact(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="modal-footer py-2 px-3 border-top border-outline-variant d-flex justify-content-between">
                <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Huỷ</Button>
                <Button type="button" variant="primary" onClick={handleSave}>Lưu NCC</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
