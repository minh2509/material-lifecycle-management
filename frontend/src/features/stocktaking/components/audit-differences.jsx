import { Button } from "../../../design-system/button/button.jsx";
import { Table } from "../../../design-system/table/table.jsx";
export function AuditDifferences({ handleOpenExplain, selectedAudit, setSelectedAudit }) {
  return (
    selectedAudit && (
      <div className="stitch-card p-0 overflow-hidden d-flex flex-column">
        <div className="p-3 bg-light border-bottom border-outline-variant d-flex justify-content-between align-items-center">
          <span className="fw-bold text-dark small">
            Chi tiết đối soát chênh lệch: {selectedAudit.name} ({selectedAudit.id})
          </span>
          <Button type="button" className="btn btn-link p-0 text-muted small" onClick={() => setSelectedAudit(null)}>
            Đóng chi tiết
          </Button>
        </div>
        <div className="table-responsive border-0 rounded-0">
          <Table variant="standard" >
            <thead>
              <tr>
                <th style={{ width: "120px" }}>Mã vật tư</th>
                <th style={{ minWidth: "220px" }}>Tên vật tư</th>
                <th className="text-end" style={{ width: "110px" }}>Số sổ sách</th>
                <th className="text-end" style={{ width: "110px" }}>Thực tế đếm</th>
                <th className="text-end" style={{ width: "120px" }}>Chênh lệch</th>
                <th style={{ minWidth: "240px" }}>Giải trình nguyên nhân</th>
                <th style={{ width: "130px" }}>Điều chỉnh tồn</th>
                <th className="text-end" style={{ width: "120px" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {selectedAudit.items?.map((it, idx) => (
                <tr key={it.code}>
                  <td><span className="code-chip font-mono">{it.code}</span></td>
                  <td className="small text-dark fw-medium">{it.name}</td>
                  <td className="text-end font-mono text-dark">{it.bookQty} {it.unit}</td>
                  <td className="text-end font-mono fw-bold text-dark">{it.actualQty} {it.unit}</td>
                  <td className="text-end font-mono fw-bold">
                    <span className={it.diffQty < 0 ? "text-danger" : it.diffQty > 0 ? "text-success" : "text-muted"}>
                      {it.diffQty > 0 ? `+${it.diffQty}` : it.diffQty} {it.unit}
                    </span>
                  </td>
                  <td className="small">
                    {it.reasonExplanation ? (
                      <span className="text-dark">{it.reasonExplanation}</span>
                    ) : (
                      <span className="text-danger fst-italic">Bắt buộc giải trình</span>
                    )}
                  </td>
                  <td>
                    <span className={`stitch-badge ${it.adjusted ? "stitch-badge-success" : "stitch-badge-neutral"}`}>
                      {it.adjusted ? "Đã điều chỉnh" : "Chưa điều chỉnh"}
                    </span>
                  </td>
                  <td className="text-end">
                    {it.diffQty !== 0 && (
                      <Button type="button" variant="outline" onClick={() => handleOpenExplain(selectedAudit, idx)}>
                        Ghi giải trình
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )
  );
}
