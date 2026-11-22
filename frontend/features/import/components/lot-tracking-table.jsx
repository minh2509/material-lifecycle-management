import { Table } from "../../../design-system/table/table.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function LotTrackingTable({ lots = [] }) {
  if (lots.length === 0) {
    return (
      <div className="py-5 px-3 text-center d-flex flex-column align-items-center gap-2">
        <Icon name="layers" size={32} color="var(--on-surface-muted)" />
        <div className="font-headline fs-6 fw-bold text-dark">Chưa có lô vật tư nào được sinh</div>
        <div className="text-muted small" style={{ fontSize: "12.5px" }}>
          Lô chỉ được tạo tự động khi Thủ kho hoàn tất thao tác "Lưu và cập nhật tồn kho".
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive border-0 rounded-0">
      <Table variant="standard" >
        <thead>
          <tr>
            <th style={{ minWidth: "165px", width: "165px" }}>Mã lô</th>
            <th style={{ minWidth: "135px", width: "135px" }}>Mã vật tư</th>
            <th style={{ minWidth: "220px" }}>Tên vật tư</th>
            <th style={{ width: "110px" }}>Ngày nhập</th>
            <th style={{ minWidth: "180px" }}>Nguồn chứng từ</th>
            <th style={{ width: "120px" }}>Tình trạng</th>
            <th style={{ width: "90px" }}>Kho</th>
            <th className="text-end" style={{ width: "120px" }}>Đơn giá (đ)</th>
            <th className="text-end" style={{ width: "130px" }}>Khả dụng / Ban đầu</th>
          </tr>
        </thead>
        <tbody>
          {lots.map((lot) => (
            <tr key={lot.lotCode}>
              <td><span className="code-chip font-mono">{lot.lotCode}</span></td>
              <td><span className="code-chip">{lot.materialCode}</span></td>
              <td className="fw-medium text-dark small">{lot.materialName}</td>
              <td className="font-mono small text-muted">{lot.importDate}</td>
              <td className="small text-muted font-mono">{lot.sourceDoc}</td>
              <td>
                <span className={`stitch-badge ${lot.condition === "Mới" ? "stitch-badge-success" : "stitch-badge-neutral"}`}>
                  {lot.condition}
                </span>
              </td>
              <td><span className="small text-dark">{lot.warehouse}</span></td>
              <td className="text-end font-mono small text-dark">
                {lot.unitPrice ? lot.unitPrice.toLocaleString("vi-VN") : "0"}
              </td>
              <td className="text-end font-mono fw-bold text-dark">
                <span className="text-primary">{lot.availableQuantity}</span> / {lot.initialQuantity} {lot.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
