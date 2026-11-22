import { Table } from "../../../design-system/table/table.jsx";
export function TabCurrentStock({ lots = [] }) {
  const readyLots = lots.filter((l) => ["Mới", "Tái sử dụng", "Phục hồi"].includes(l.condition));
  const pendingLots = lots.filter((l) => ["Chờ đánh giá", "Đang sửa chữa", "Phế liệu"].includes(l.condition));

  return (
    <div className="d-flex flex-column gap-4 p-3">
      {/* Phần 1: Tồn kho sẵn sàng cấp phát */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="font-headline fs-6 text-dark m-0">Tồn kho khả dụng (Sẵn sàng cấp cho sản xuất)</h3>
          <span className="small text-muted">{readyLots.length} lô vật tư đủ điều kiện</span>
        </div>
        <div className="table-responsive border-0 rounded-0">
          <Table variant="standard" >
            <thead>
              <tr>
                <th style={{ minWidth: "165px", width: "165px" }}>Mã lô</th>
                <th style={{ minWidth: "135px", width: "135px" }}>Mã vật tư</th>
                <th style={{ minWidth: "220px" }}>Tên vật tư</th>
                <th style={{ width: "120px" }}>Tình trạng</th>
                <th style={{ width: "90px" }}>Kho</th>
                <th className="text-end" style={{ width: "110px" }}>Khả dụng</th>
                <th className="text-end" style={{ width: "130px" }}>Đơn giá (đ)</th>
                <th className="text-end" style={{ width: "140px" }}>Thành tiền (đ)</th>
              </tr>
            </thead>
            <tbody>
              {readyLots.map((l) => {
                const total = l.availableQuantity * (l.unitPrice || 0);
                return (
                  <tr key={l.lotCode}>
                    <td><span className="code-chip font-mono">{l.lotCode}</span></td>
                    <td><span className="code-chip">{l.materialCode}</span></td>
                    <td className="small text-dark fw-medium">{l.materialName}</td>
                    <td>
                      <span className={`stitch-badge ${l.condition === "Mới" ? "stitch-badge-success" : "stitch-badge-neutral"}`}>
                        {l.condition}
                      </span>
                    </td>
                    <td><span className="small text-dark">{l.warehouse}</span></td>
                    <td className="text-end font-mono fw-bold text-primary">{l.availableQuantity} {l.unit}</td>
                    <td className="text-end font-mono small text-dark">{l.unitPrice?.toLocaleString("vi-VN") || 0}</td>
                    <td className="text-end font-mono fw-bold text-dark">{total.toLocaleString("vi-VN")}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Phần 2: Hàng đang chờ xử lý */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="font-headline fs-6 text-dark m-0">Vật tư đang chờ xử lý (Cách ly, không cấp sản xuất)</h3>
          <span className="small text-muted">{pendingLots.length} lô chờ phân luồng/phế liệu</span>
        </div>
        <div className="table-responsive border-0 rounded-0">
          <Table variant="standard" >
            <thead>
              <tr>
                <th style={{ minWidth: "165px", width: "165px" }}>Mã lưu kho</th>
                <th style={{ minWidth: "135px", width: "135px" }}>Mã vật tư</th>
                <th style={{ minWidth: "220px" }}>Tên vật tư</th>
                <th style={{ width: "130px" }}>Trạng thái xử lý</th>
                <th style={{ width: "90px" }}>Kho</th>
                <th className="text-end" style={{ width: "110px" }}>Số lượng</th>
                <th style={{ minWidth: "200px" }}>Ghi chú nguồn gốc</th>
              </tr>
            </thead>
            <tbody>
              {pendingLots.map((l) => (
                <tr key={l.lotCode}>
                  <td><span className="code-chip font-mono">{l.lotCode}</span></td>
                  <td><span className="code-chip">{l.materialCode}</span></td>
                  <td className="small text-dark fw-medium">{l.materialName}</td>
                  <td>
                    <span className="stitch-badge stitch-badge-warning">{l.condition}</span>
                  </td>
                  <td><span className="small text-dark">{l.warehouse}</span></td>
                  <td className="text-end font-mono fw-bold text-dark">{l.availableQuantity} {l.unit}</td>
                  <td className="small text-muted">{l.sourceDoc}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
