import { Table } from "../../../design-system/table/table.jsx";
import { Badge } from "../../../design-system/badge/badge.jsx";

export function DisposalTable({ activeTab, displayedScraps, state }) {
  return (
    <div className="stitch-card p-0 overflow-hidden d-flex flex-column">
      {activeTab === "scraps" ? (
        <div className="table-responsive border-0 rounded-0">
          <Table variant="standard" >
            <thead>
              <tr>
                <th style={{ minWidth: "135px", width: "135px" }}>Mã lưu kho</th>
                <th style={{ minWidth: "125px", width: "125px" }}>Mã gốc</th>
                <th style={{ minWidth: "220px" }}>Tên vật tư phế liệu</th>
                <th className="text-end" style={{ width: "120px" }}>Khối lượng/SL</th>
                <th style={{ minWidth: "200px" }}>Nguồn phát sinh</th>
                <th style={{ width: "110px" }}>Ngày nhập</th>
                <th style={{ width: "180px" }}>Vị trí lưu giữ</th>
                <th style={{ width: "130px" }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {displayedScraps.map((s) => (
                <tr key={s.id}>
                  <td><span className="code-chip font-mono">{s.id}</span></td>
                  <td><span className="code-chip">{s.code}</span></td>
                  <td className="small text-dark fw-medium">{s.name}</td>
                  <td className="text-end font-mono fw-bold text-dark">{s.quantity} {s.unit}</td>
                  <td className="small text-muted">{s.source}</td>
                  <td className="font-mono small text-muted">{s.date}</td>
                  <td className="small text-dark">{s.location}</td>
                  <td>
                    <Badge variant={s.status === "Chờ thanh lý" ? "warning" : "neutral"}>{s.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="table-responsive border-0 rounded-0">
          <Table variant="standard" >
            <thead>
              <tr>
                <th style={{ width: "130px" }}>Mã phiếu</th>
                <th style={{ width: "110px" }}>Ngày xuất</th>
                <th style={{ minWidth: "200px" }}>Căn cứ & Lý do xử lý</th>
                <th style={{ minWidth: "180px" }}>Người tiếp nhận trách nhiệm</th>
                <th style={{ width: "120px" }}>Người lập</th>
                <th style={{ width: "130px" }}>Người duyệt</th>
                <th style={{ width: "130px" }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {(state.disposals || []).map((d) => (
                <tr key={d.id}>
                  <td><span className="code-chip font-mono">{d.id}</span></td>
                  <td className="font-mono small text-muted">{d.date}</td>
                  <td className="small text-dark">
                    <div className="fw-medium">{d.reason}</div>
                    <div className="text-muted" style={{ fontSize: "11px" }}>
                      {d.items?.map((it) => `${it.name} (${it.quantity} ${it.unit})`).join(", ")}
                    </div>
                  </td>
                  <td className="small text-dark fw-medium">{d.responsibleReceiver}</td>
                  <td className="small text-muted">{d.storekeeper}</td>
                  <td className="small text-primary fw-medium">{d.approvedBy}</td>
                  <td><span className="stitch-badge stitch-badge-success">{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
