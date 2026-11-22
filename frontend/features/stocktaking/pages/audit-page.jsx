import { Table } from "../../../design-system/table/table.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Textarea } from "../../../design-system/textarea/textarea.jsx";
import { AuditDifferences } from "../components/audit-differences.jsx";
import { AuditSummary } from "../components/audit-summary.jsx";
import { useState } from "react";
import { usePrototypeStore } from "../../../shared/hooks/use-prototype-store.js";
import { PrototypePageHeader } from "../../../shared/components/prototype-page-header.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";
import { Badge } from "../../../design-system/badge/badge.jsx";
import { showAppToast } from "../../../shared/utils/toast-service.js";

export function AuditPage() {
  const { state, store } = usePrototypeStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [reasonInput, setReasonInput] = useState("");

  const audits = state.audits || [];

  const handleOpenDetail = (a) => {
    setSelectedAudit(a);
  };

  const handleOpenExplain = (audit, idx) => {
    setSelectedAudit(audit);
    setReasonInput(audit.items[idx]?.reasonExplanation || "");
    setModalOpen(true);
  };

  const handleSaveExplain = () => {
    if (!reasonInput.trim()) {
      showAppToast("Bắt buộc phải ghi rõ giải trình nguyên nhân thất thoát!", "error");
      return;
    }
    // Lưu giải trình vào audit và cập nhật trạng thái
    store.approveAuditAdjustment(selectedAudit.id, "Đã ghi giải trình (Chờ Trưởng phòng ký)");
    showAppToast("Đã lưu nội dung giải trình chênh lệch kiểm kê thành công!", "success");
    setModalOpen(false);
  };

  const handleApproveAdjustment = (auditId) => {
    store.approveAuditAdjustment(auditId, "Nguyễn Văn An");
    showAppToast("Trưởng phòng Cơ điện – Vận tải đã phê duyệt giải trình! Tồn kho đã được điều chỉnh hợp lệ.", "success");
  };

  return (
    <div className="d-flex flex-column gap-4">
      <PrototypePageHeader
        title="Kiểm kê vật tư"
        subtitle="Đối soát số liệu sổ sách với thực tế kiểm đếm • Bắt buộc giải trình chênh lệch và chỉ điều chỉnh tồn sau khi được phê duyệt"
      />

      <div className="p-3 bg-light rounded border border-outline-variant small text-dark d-flex gap-2">
        <Icon name="info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <strong>Quy tắc xử lý chênh lệch kiểm kê (CHỐT BB02 mục 5.4, S-01 mục 9.1):</strong> Khi phát hiện thiếu hụt, tổ kiểm kê <strong>bắt buộc lập văn bản giải trình nguyên nhân</strong>. Chênh lệch chưa được duyệt <strong>tuyệt đối chưa làm giảm tồn kho</strong>. Tồn kho chỉ cập nhật sau khi Trưởng phòng Cơ điện – Vận tải phê duyệt giải trình.
        </div>
      </div>

      {/* Enterprise Summary Strip: Chỉ số tổng hợp nhanh */}
      <AuditSummary audits={audits} />

      <div className="ui-card p-0 overflow-hidden d-flex flex-column">
        <div className="p-3 bg-light border-bottom border-outline-variant fw-semibold text-dark small">
          Danh sách các đợt kiểm kê định kỳ
        </div>
        <div className="table-responsive border-0 rounded-0">
          <Table variant="standard" >
            <thead>
              <tr>
                <th style={{ minWidth: "145px", width: "145px" }}>Mã đợt</th>
                <th style={{ minWidth: "220px" }}>Tên đợt kiểm kê</th>
                <th style={{ width: "110px" }}>Ngày chốt</th>
                <th style={{ width: "100px" }}>Kho kiểm</th>
                <th style={{ minWidth: "220px" }}>Thành phần tổ kiểm kê</th>
                <th style={{ width: "180px" }}>Trạng thái hồ sơ</th>
                <th className="text-end" style={{ minWidth: "190px", width: "190px" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {audits.map((a) => {
                const isApproved = a.status.includes("phê duyệt điều chỉnh");
                return (
                  <tr key={a.id}>
                    <td><span className="code-chip font-mono">{a.id}</span></td>
                    <td className="fw-semibold text-dark small">{a.name}</td>
                    <td className="font-mono small text-muted">{a.date}</td>
                    <td><span className="small text-dark">{a.warehouse}</span></td>
                    <td className="small text-muted">{a.team}</td>
                    <td>
                      <Badge variant={isApproved ? "success" : "warning"}>{a.status}</Badge>
                    </td>
                    <td className="text-end">
                      <div className="d-flex align-items-center justify-content-end gap-1.5 flex-nowrap">
                        <Button type="button" variant="outline" className="btn-ui-table-action" onClick={() => handleOpenDetail(a)}>
                          Chi tiết lệch
                        </Button>
                        {!isApproved && (
                          <Button
                            type="button"
                            variant="primary" className="btn-ui-table-action"
                            onClick={() => handleApproveAdjustment(a.id)}
                            title="Trưởng phòng duyệt giải trình và cho phép điều chỉnh tồn"
                          >
                            Duyệt lệch
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Chi tiết chênh lệch của đợt kiểm kê */}
      <AuditDifferences handleOpenExplain={handleOpenExplain} selectedAudit={selectedAudit} setSelectedAudit={setSelectedAudit} />

      {modalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "460px" }}>
            <div className="modal-content">
              <div className="modal-header py-2.5 px-3 border-bottom border-outline-variant">
                <h5 className="modal-title font-headline fs-6 text-dark">Giải trình nguyên nhân thiếu hụt</h5>
                <Button type="button" className="btn-close" onClick={() => setModalOpen(false)} />
              </div>
              <div className="modal-body p-3 small d-flex flex-column gap-2">
                <p className="text-muted mb-1">
                  Căn cứ BB02 mục 5.4: Mọi trường hợp lệch âm giữa thực tế đếm và sổ sách bắt buộc phải có văn bản giải trình để trình Trưởng phòng xem xét duyệt.
                </p>
                <div>
                  <label htmlFor="audit-reason-text" className="form-label text-dark fw-semibold mb-1">Nội dung giải trình <span className="text-danger">*</span></label>
                  <Textarea variant="compact"
                    id="audit-reason-text"

                    rows="3"
                    value={reasonInput}
                    onChange={(e) => setReasonInput(e.target.value)}
                    placeholder="Ghi rõ nguyên nhân hao hụt, địa điểm và đề xuất xử lý..."
                  />
                </div>
              </div>
              <div className="modal-footer py-2 px-3 border-top border-outline-variant d-flex justify-content-between">
                <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Huỷ</Button>
                <Button type="button" variant="primary" onClick={handleSaveExplain}>Lưu giải trình</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
