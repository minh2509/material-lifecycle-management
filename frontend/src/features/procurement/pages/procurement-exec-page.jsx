import { Input } from "../../../design-system/input/input.jsx";
import { Table } from "../../../design-system/table/table.jsx";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePrototypeStore } from "../../../shared/hooks/use-prototype-store.js";
import { PrototypePageHeader } from "../../../shared/components/prototype-page-header.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";
import { Badge } from "../../../design-system/badge/badge.jsx";

export function ProcurementExecPage() {
  const { state } = usePrototypeStore();
  const [searchTerm, setSearchTerm] = useState("");

  const executionRows = useMemo(() => {
    const list = [];
    (state.procurementPlans || []).forEach((plan) => {
      (plan.items || []).forEach((it) => {
        const approved = it.approvedQuantity || 0;
        const imported = it.importedQuantity || 0;
        const remaining = Math.max(0, approved - imported);
        const percent = approved > 0 ? Math.round((imported / approved) * 100) : 0;

        // Tìm các đợt giao từ receipts
        const deliveryCount = (state.receipts || []).filter(
          (r) => r.referenceNo === plan.contractNo && r.status === "Đã nhập kho"
        ).length;

        list.push({
          planId: plan.id,
          contractNo: plan.contractNo,
          supplier: plan.supplier,
          code: it.code,
          name: it.name,
          unit: it.unit,
          approved,
          imported,
          remaining,
          percent,
          deliveryCount,
          status: remaining === 0 ? "Đã nhập đủ" : imported > 0 ? "Đang giao đợt" : "Chờ giao",
        });
      });
    });

    if (!searchTerm) return list;
    const q = searchTerm.toLowerCase().trim();
    return list.filter(
      (r) =>
        r.planId.toLowerCase().includes(q) ||
        r.contractNo.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q)
    );
  }, [state.procurementPlans, state.receipts, searchTerm]);

  return (
    <div className="d-flex flex-column gap-4">
      <PrototypePageHeader
        title="Thực hiện mua sắm"
        subtitle="Theo dõi tiến độ giao hàng và số lượng còn được nhập theo các hồ sơ dự trù đã phê duyệt"
      />

      {/* Tabs liên kết chu trình Mua sắm & Kế hoạch */}
      <div className="d-flex gap-2 border-bottom border-outline-variant pb-2 flex-wrap">
        <Link to="/du-tru" className="btn btn-sm btn-light text-dark">
          Hồ sơ dự trù hợp đồng ({state.procurementPlans?.length || 0})
        </Link>
        <Link to="/mua-sam" className="btn btn-sm btn-primary fw-semibold">
          Tiến độ thực hiện theo HĐ
        </Link>
        <Link to="/ke-hoach-nhu-cau" className="btn btn-sm btn-light text-dark">
          Kế hoạch nhu cầu
        </Link>
        <Link to="/dinh-muc" className="btn btn-sm btn-light text-dark">
          Định mức kỹ thuật
        </Link>
      </div>

      <div className="p-3 bg-light rounded border border-outline-variant small text-dark d-flex gap-2">
        <Icon name="info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <strong>Phạm vi nghiệp vụ (KH-BB16 mục 1, S-01 mục 5.1):</strong> Phân hệ chỉ phục vụ <strong>theo dõi tiến độ giao nhận vật tư</strong> theo hợp đồng (Đã duyệt, Đã nhập các đợt, Còn được nhập). Tuyệt đối không mở rộng sang giao dịch thương mại, công nợ hay thanh toán hoá đơn.
        </div>
      </div>

      <div className="stitch-card p-3">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-6">
            <label htmlFor="exec-search" className="form-label small fw-semibold text-dark mb-1">Tìm kiếm theo hồ sơ, hợp đồng hoặc vật tư</label>
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white border-end-0 text-muted"><Icon name="search" size={15} /></span>
              <Input variant="standard" id="exec-search" type="search" className="border-start-0" placeholder="Nhập DTMS-..., HĐ-... hoặc mã vật tư..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="stitch-card p-0 overflow-hidden d-flex flex-column">
        <div className="table-responsive border-0 rounded-0">
          <Table variant="standard" >
            <thead>
              <tr>
                <th style={{ minWidth: "155px", width: "155px" }}>Mã hồ sơ</th>
                <th style={{ width: "150px" }}>Số hợp đồng</th>
                <th style={{ minWidth: "135px", width: "135px" }}>Mã vật tư</th>
                <th style={{ minWidth: "220px" }}>Tên vật tư</th>
                <th className="text-end" style={{ width: "100px" }}>Đã duyệt</th>
                <th className="text-end" style={{ width: "100px" }}>Đã nhập</th>
                <th className="text-end" style={{ width: "130px" }}>Còn được nhập</th>
                <th className="text-end" style={{ width: "100px" }}>Số đợt</th>
                <th style={{ width: "120px" }}>Tiến độ</th>
              </tr>
            </thead>
            <tbody>
              {executionRows.map((r, idx) => (
                <tr key={idx}>
                  <td><span className="code-chip font-mono">{r.planId}</span></td>
                  <td><span className="font-mono text-dark fw-bold small">{r.contractNo}</span></td>
                  <td><span className="code-chip">{r.code}</span></td>
                  <td className="small text-dark fw-medium">{r.name}</td>
                  <td className="text-end font-mono text-dark">{r.approved} {r.unit}</td>
                  <td className="text-end font-mono text-success fw-bold">{r.imported} {r.unit}</td>
                  <td className="text-end font-mono text-primary fw-bold">{r.remaining} {r.unit}</td>
                  <td className="text-end font-mono text-muted">{r.deliveryCount} đợt</td>
                  <td>
                    <Badge variant={r.status === "Đã nhập đủ" ? "success" : r.status === "Đang giao đợt" ? "warning" : "neutral"}>
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
