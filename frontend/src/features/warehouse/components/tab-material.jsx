import { Input } from "../../../design-system/input/input.jsx";
import { Table } from "../../../design-system/table/table.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { useState, useMemo } from "react";
import { Icon } from "../../../design-system/icon/icon.jsx";

const PAGE_SIZE = 12;

export function TabMaterial({ catalogItems = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    if (!searchTerm) return catalogItems;
    const q = searchTerm.toLowerCase().trim();
    return catalogItems.filter(
      (it) => it.code.toLowerCase().includes(q) || it.name.toLowerCase().includes(q)
    );
  }, [catalogItems, searchTerm]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span className="small text-muted">
          Tổng số <strong>{catalogItems.length} mã vật tư chính thức</strong> từ file Excel khách hàng (danh mục chuẩn hoá, không lưu tình trạng Mới/Cũ tại đây)
        </span>
        <div className="input-group input-group-sm" style={{ maxWidth: "320px" }}>
          <span className="input-group-text bg-white border-end-0 text-muted"><Icon name="search" size={14} /></span>
          <Input variant="standard"
            type="search"
            className="border-start-0"
            placeholder="Tìm theo mã hoặc tên..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <div className="table-responsive border-0 rounded-0">
        <Table variant="standard" >
          <thead>
            <tr>
              <th style={{ minWidth: "135px", width: "135px" }}>Mã vật tư</th>
              <th style={{ minWidth: "280px" }}>Tên vật tư</th>
              <th style={{ width: "160px" }}>Nhóm / Loại</th>
              <th style={{ width: "110px" }}>Đơn vị tính</th>
              <th style={{ width: "130px" }}>Tiền tố</th>
              <th style={{ width: "140px" }}>Ô nguồn Excel</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((it) => (
              <tr key={it.code}>
                <td><span className="code-chip font-mono">{it.code}</span></td>
                <td className="fw-semibold text-dark small">{it.name}</td>
                <td className="small text-muted">{it.group}</td>
                <td className="small text-dark font-mono">{it.unit}</td>
                <td><span className="code-chip font-mono">{it.prefix}</span></td>
                <td className="small text-muted font-mono" style={{ fontSize: "11px" }}>
                  B{it.source?.row || "—"} / C{it.source?.row || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center pt-2">
        <span className="small text-muted font-mono" style={{ fontSize: "12px" }}>
          Hiển thị {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} trên {filtered.length} mã
        </span>
        <div className="d-flex align-items-center gap-1.5">
          <Button type="button" variant="outline" className="py-0" disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => p - 1)}>
            Trước
          </Button>
          <span className="small text-dark font-mono px-2" style={{ fontSize: "12px" }}>
            {currentPage} / {totalPages}
          </span>
          <Button type="button" variant="outline" className="py-0" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
