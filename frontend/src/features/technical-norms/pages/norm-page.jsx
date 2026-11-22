import { Input } from "../../../design-system/input/input.jsx";
import { Table } from "../../../design-system/table/table.jsx";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePrototypeStore } from "../../../shared/hooks/use-prototype-store.js";
import { PrototypePageHeader } from "../../../shared/components/prototype-page-header.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function NormPage() {
  const { state } = usePrototypeStore();
  const [searchTerm, setSearchTerm] = useState("");

  const norms = useMemo(() => {
    return (state.technicalNorms || []).filter((n) => {
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase().trim();
      return n.code.toLowerCase().includes(q) || n.name.toLowerCase().includes(q);
    });
  }, [state.technicalNorms, searchTerm]);

  return (
    <div className="d-flex flex-column gap-4">
      <PrototypePageHeader
        title="Định mức kỹ thuật"
        subtitle="Danh mục định mức tiêu hao vật tư phục vụ đối chiếu tiêu hao sản xuất mỏ than"
        isProposed={true}
        proposedText="Chờ dữ liệu định mức"
      />

      {/* Tabs liên kết chu trình Mua sắm & Kế hoạch */}
      <div className="d-flex gap-2 border-bottom border-outline-variant pb-2 flex-wrap">
        <Link to="/du-tru" className="btn btn-sm btn-light text-dark">
          Hồ sơ dự trù hợp đồng ({state.procurementPlans?.length || 0})
        </Link>
        <Link to="/mua-sam" className="btn btn-sm btn-light text-dark">
          Tiến độ thực hiện theo HĐ
        </Link>
        <Link to="/ke-hoach-nhu-cau" className="btn btn-sm btn-light text-dark">
          Kế hoạch nhu cầu
        </Link>
        <Link to="/dinh-muc" className="btn btn-sm btn-primary fw-semibold">
          Định mức kỹ thuật
        </Link>
      </div>

      <div className="p-3.5 rounded bg-warning-subtle bg-opacity-35 border border-warning d-flex gap-2.5">
        <Icon name="warning" size={20} color="var(--warning)" className="flex-shrink-0 mt-0.5" />
        <div className="small">
          <div className="fw-bold text-dark mb-1">[HỎI KHÁCH] Doanh nghiệp chưa cung cấp mức định mức kỹ thuật</div>
          <div className="text-secondary" style={{ lineHeight: 1.5 }}>
            Theo biên bản họp 16/10 và đặc tả sau họp 02/11 (S-01 mục 4.2, 7.3): Định mức là mốc đối chiếu, không phải mức cấm vượt.
            Khi tiêu hao vượt định mức, hệ thống chỉ cảnh báo và yêu cầu phân xưởng giải trình, tuyệt đối không chặn ghi nhận thực tế.
            Do chưa có bảng số liệu định mức và cơ sở tính chuẩn từ doanh nghiệp, các ô chỉ tiêu định mức hiện thể hiện <strong>"Chưa có dữ liệu"</strong>, không mặc định bằng 0.
          </div>
        </div>
      </div>

      <div className="stitch-card p-3">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-6">
            <label htmlFor="norm-search" className="form-label small fw-semibold text-dark mb-1">Tìm kiếm theo mã hoặc tên vật tư</label>
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white border-end-0 text-muted"><Icon name="search" size={15} /></span>
              <Input variant="standard" id="norm-search" type="search" className="border-start-0" placeholder="Nhập mã vật tư (GL-...) hoặc tên..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="stitch-card p-0 overflow-hidden d-flex flex-column">
        <div className="table-responsive border-0 rounded-0">
          <Table variant="standard" >
            <thead>
              <tr>
                <th style={{ minWidth: "140px", width: "140px" }}>Mã vật tư</th>
                <th style={{ minWidth: "260px" }}>Tên vật tư</th>
                <th style={{ width: "110px" }}>ĐVT</th>
                <th className="text-end" style={{ width: "150px" }}>Mức định mức</th>
                <th style={{ minWidth: "180px" }}>Cơ sở tính</th>
                <th style={{ minWidth: "180px" }}>Phạm vi áp dụng</th>
                <th style={{ minWidth: "220px" }}>Ghi chú kỹ thuật</th>
              </tr>
            </thead>
            <tbody>
              {norms.map((n) => (
                <tr key={n.code}>
                  <td><span className="code-chip font-mono">{n.code}</span></td>
                  <td className="fw-medium text-dark small">{n.name}</td>
                  <td className="text-muted small">{n.unit}</td>
                  <td className="text-end">
                    <span className="stitch-badge stitch-badge-warning font-mono" style={{ fontSize: "11.5px" }}>
                      Chưa có dữ liệu
                    </span>
                  </td>
                  <td className="small text-dark">{n.calcBasis}</td>
                  <td className="small text-muted">{n.appliedScope}</td>
                  <td className="small text-muted fst-italic">{n.note}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
