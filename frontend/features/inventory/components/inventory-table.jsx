import { Table } from "../../../design-system/table/table.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function InventoryTable({ PAGE_SIZE, currentPage, filterWarehouse, filtered, handleReset, paginatedItems, setCurrentPage, totalPages }) {
  return (
    <div className="stitch-card p-0 overflow-hidden d-flex flex-column">
      <div className="table-responsive border-0 rounded-0">
        <Table variant="standard" >
          <thead>
            <tr>
              <th style={{ minWidth: "140px", width: "140px" }}>Mã vật tư</th>
              <th style={{ minWidth: "280px" }}>Tên vật tư</th>
              <th style={{ width: "130px" }}>Nhóm</th>
              <th style={{ width: "110px" }}>Đơn vị tính</th>
              <th style={{ width: "110px" }}>Kho</th>
              <th className="text-end" style={{ width: "140px" }}>Số lượng tồn</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, idx) => (
              <tr key={`${item.code}-${item.warehouse}-${idx}`}>
                <td>
                  <span className="code-chip">{item.code}</span>
                </td>
                <td className="fw-medium text-dark">{item.name}</td>
                <td className="text-muted" style={{ fontSize: "12.5px" }}>{item.group}</td>
                <td className="text-muted" style={{ fontSize: "12.5px" }}>{item.unit}</td>
                <td>
                  <span className="small text-dark">{item.warehouse}</span>
                </td>
                <td className="text-end font-mono fw-bold text-dark fs-6">
                  {item.quantity.toLocaleString("vi-VN")}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="py-5 px-3 text-center d-flex flex-column align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle bg-light border border-outline-variant mb-1"
            style={{ width: "56px", height: "56px" }}
          >
            <Icon name="search_off" size={28} color="var(--on-surface-muted)" />
          </div>
          <div className="font-headline fs-6 fw-bold text-dark">Không tìm thấy vật tư phù hợp</div>
          <div className="text-muted small max-w-md" style={{ maxWidth: "420px", fontSize: "12.5px" }}>
            Thử xoá từ khoá tìm kiếm hoặc chọn lại "Tất cả kho" và "Tất cả nhóm" để xem toàn bộ danh sách tồn kho.
          </div>
          <Button
            type="button"
            variant="secondary" className="mt-2 px-3"
            onClick={handleReset}
          >
            Đặt lại bộ lọc
          </Button>
        </div>
      )}

      {/* Pagination & Scope Footer */}
      <div className="px-4 py-3 bg-light border-top border-outline-variant d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="small text-muted font-mono" style={{ fontSize: "12px" }}>
          Hiển thị {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–
          {Math.min(currentPage * PAGE_SIZE, filtered.length)} trên tổng số {filtered.length} bản ghi
          (Phạm vi: {filterWarehouse === "all" ? "Tất cả kho" : filterWarehouse})
        </div>

        <div className="d-flex align-items-center gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            aria-label="Trang trước"
          >
            <Icon name="chevron_left" size={14} />
            <span>Trước</span>
          </Button>
          <span className="small text-dark font-mono px-2 fw-semibold" style={{ fontSize: "12px" }}>
            Trang {currentPage} / {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            aria-label="Trang sau"
          >
            <span>Sau</span>
            <Icon name="chevron_right" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
