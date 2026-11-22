import { Table } from "../../../design-system/table/table.jsx";
import { Select } from "../../../design-system/select/select.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { useState } from "react";
import { showAppToast } from "../../../shared/utils/toast-service.js";

export function TabRecoveryRate() {
  const [recipient, setRecipient] = useState("all");

  const recoveryItems = [
    {
      code: "GL-002",
      name: "Gỗ chống lò bạch đàn",
      unit: "Mét",
      issuedInPeriod: 20,
      recoveredInPeriod: 10,
      rate: "50.0%",
      status: "Đang thu hồi diện khấu vỉa 14",
    },
    {
      code: "GL-001",
      name: "Gỗ chèn lò bạch đàn",
      unit: "Mét",
      issuedInPeriod: 15,
      recoveredInPeriod: 0,
      rate: "0.0%",
      status: "Gỗ chèn tiêu hao lấp lò không thu hồi",
    },
    {
      code: "DL-028",
      name: "Dây cáp điện hầm lò",
      unit: "Mét",
      issuedInPeriod: 0,
      recoveredInPeriod: 0,
      rate: null, // Mẫu số 0 -> Chưa có cơ sở tính
      status: "Chưa phát sinh cấp phát trong kỳ",
    },
  ];

  const handleSimulateSend = () => {
    showAppToast(`Đã tạo lệnh gửi báo cáo minh hoạ cho phạm vi "${recipient === "all" ? "Toàn công ty" : recipient}"!`, "info");
  };

  return (
    <div className="d-flex flex-column gap-4 p-3">
      {/* Tỷ lệ thu hồi */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="font-headline fs-6 text-dark m-0">Đánh giá tỷ lệ thu hồi vật tư (S-OLD mục 10.1)</h3>
          <span className="small text-muted">Công thức: (Thu hồi ÷ Cấp dùng cùng đợt) × 100</span>
        </div>
        <div className="table-responsive border-0 rounded-0">
          <Table variant="standard" >
            <thead>
              <tr>
                <th style={{ width: "120px" }}>Mã VT</th>
                <th style={{ minWidth: "220px" }}>Tên vật tư</th>
                <th className="text-end" style={{ width: "120px" }}>Đã cấp dùng</th>
                <th className="text-end" style={{ width: "120px" }}>Đã thu hồi</th>
                <th className="text-end" style={{ width: "160px" }}>Tỷ lệ thu hồi</th>
                <th style={{ minWidth: "220px" }}>Ghi chú chu kỳ</th>
              </tr>
            </thead>
            <tbody>
              {recoveryItems.map((r) => (
                <tr key={r.code}>
                  <td><span className="code-chip font-mono">{r.code}</span></td>
                  <td className="small text-dark fw-medium">{r.name}</td>
                  <td className="text-end font-mono text-dark">{r.issuedInPeriod} {r.unit}</td>
                  <td className="text-end font-mono text-success fw-bold">{r.recoveredInPeriod} {r.unit}</td>
                  <td className="text-end font-mono fw-bold">
                    {r.rate !== null ? (
                      <span className="text-primary">{r.rate}</span>
                    ) : (
                      <span className="stitch-badge stitch-badge-warning" style={{ fontSize: "11px" }}>Chưa có cơ sở tính</span>
                    )}
                  </td>
                  <td className="small text-muted">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Lịch gửi báo cáo minh hoạ */}
      <div className="p-3 bg-light rounded border border-outline-variant d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h4 className="font-headline fs-6 text-dark m-0">Lịch gửi báo cáo tự động (Đề xuất prototype)</h4>
            <div className="text-muted small" style={{ fontSize: "12px" }}>Múi giờ Asia/Ho_Chi_Minh • Tách nội dung theo thẩm quyền phân xưởng/phòng ban</div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="report-scope-select" className="text-muted small m-0">Phạm vi:</label>
            <Select variant="standard" id="report-scope-select"  value={recipient} onChange={(e) => setRecipient(e.target.value)}>
              <option value="all">Toàn bộ phòng ban / Ban lãnh đạo</option>
              <option value="Phân xưởng Khai thác 1">Phân xưởng Khai thác 1 (Chỉ dữ liệu đơn vị)</option>
              <option value="Phân xưởng Cơ điện">Phân xưởng Cơ điện (Chỉ dữ liệu đơn vị)</option>
            </Select>
            <Button type="button" variant="primary" className="py-1 px-2.5" style={{ fontSize: "12px" }} onClick={handleSimulateSend}>
              Mô phỏng gửi
            </Button>
          </div>
        </div>

        <div className="row g-2 small">
          <div className="col-12 col-md-3">
            <div className="p-2.5 bg-white rounded border border-outline-variant">
              <div className="fw-bold text-danger">07:00 Hàng ngày</div>
              <div className="text-muted" style={{ fontSize: "11.5px" }}>Cảnh báo vật tư dưới ngưỡng tối thiểu (Phần mềm + Email)</div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="p-2.5 bg-white rounded border border-outline-variant">
              <div className="fw-bold text-dark">17:30 Hàng ngày</div>
              <div className="text-muted" style={{ fontSize: "11.5px" }}>Biến động nhập xuất và tồn kho kết thúc ca sản xuất</div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="p-2.5 bg-white rounded border border-outline-variant">
              <div className="fw-bold text-primary">08:00 Thứ Hai</div>
              <div className="text-muted" style={{ fontSize: "11.5px" }}>Tổng hợp tuần: Cấp phát, định mức và tiến độ giao hàng</div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="p-2.5 bg-white rounded border border-outline-variant">
              <div className="fw-bold text-success">08:00 Ngày đầu tháng</div>
              <div className="text-muted" style={{ fontSize: "11.5px" }}>Báo cáo Nhập–Xuất–Tồn và tỷ lệ thu hồi tháng trước</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
