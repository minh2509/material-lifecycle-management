import { Button } from "../../../design-system/button/button.jsx";
import { Select } from "../../../design-system/select/select.jsx";
import { Input } from "../../../design-system/input/input.jsx";
import { DisposalTable } from "../components/disposal-table.jsx";
import { DisposalSummary } from "../components/disposal-summary.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePrototypeStore } from "../../../shared/hooks/use-prototype-store.js";
import { PrototypePageHeader } from "../../../shared/components/prototype-page-header.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

import { showAppToast } from "../../../shared/utils/toast-service.js";

export function DisposalPage() {
  const { state, store } = usePrototypeStore();
  const [activeTab, setActiveTab] = useState("scraps");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScrapId, setSelectedScrapId] = useState("");
  const [reason, setReason] = useState("Tiêu huỷ gỗ mục nát bảo đảm an toàn mỏ");
  const [receiver, setReceiver] = useState("Đội Vệ sinh môi trường Công ty");

  const pendingScraps = (state.scraps || []).filter((s) => s.status === "Chờ thanh lý");
  const displayedScraps = (state.scraps || []).filter((s) => {
    if (statusFilter === "pending") return s.status === "Chờ thanh lý";
    if (statusFilter === "done") return s.status !== "Chờ thanh lý";
    return true;
  });

  const handleOpenCreate = () => {
    if (pendingScraps.length > 0) setSelectedScrapId(pendingScraps[0].id);
    setModalOpen(true);
  };

  const handleSaveDisposal = () => {
    const sc = pendingScraps.find((s) => s.id === selectedScrapId);
    if (!sc) {
      showAppToast("Vui lòng chọn vật tư phế liệu cần xử lý!", "error");
      return;
    }
    store.createDisposalVoucher({
      reason,
      responsibleReceiver: receiver,
      items: [{ scrapId: sc.id, code: sc.code, name: sc.name, unit: sc.unit, quantity: sc.quantity }],
    });
    showAppToast("Đã lập và duyệt phiếu xuất xử lý phế liệu thành công!", "success");
    setModalOpen(false);
  };

  return (
    <div className="d-flex flex-column gap-4">
      <PrototypePageHeader
        title="Thanh lý vật tư"
        subtitle="Quản lý kho phế liệu tập kết và quy trình xuất xử lý/tiêu huỷ • Không tính vào tồn khả dụng cấp sản xuất"
        actions={
          <Button type="button" variant="primary" onClick={handleOpenCreate}>
            <Icon name="plus" size={16} />
            <span>Lập phiếu xuất xử lý phế liệu</span>
          </Button>
        }
      />

      <div className="p-3 bg-light rounded border border-outline-variant small text-dark d-flex gap-2">
        <Icon name="info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <strong>Quy tắc quản lý phế liệu (S-01 mục 8.5):</strong> Phế liệu chỉ theo dõi số lượng/khối lượng, <strong>tuyệt đối không tính vào tồn khả dụng</strong> cho phân xưởng lĩnh vật tư. Khi xuất xử lý, Thủ kho lập phiếu và chỉ giảm tồn phế liệu sau khi xuất thực tế. Không thực hiện bán hàng hoặc thu tiền.
        </div>
      </div>

      {/* Tabs */}
      <div className="d-flex gap-2 border-bottom border-outline-variant pb-2">
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "scraps" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("scraps")}
        >
          Kho phế liệu ({state.scraps?.length || 0})
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "disposals" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("disposals")}
        >
          Phiếu xuất xử lý ({state.disposals?.length || 0})
        </Button>
        <Link
          to="/thu-hoi"
          className="btn btn-sm btn-light text-dark"
          title="Quay về Quản lý thu hồi & Đánh giá phân luồng"
        >
          Thu hồi & Tái sử dụng
        </Link>
      </div>

      {/* Enterprise Summary Strip: Chỉ số tổng hợp nhanh */}
      <DisposalSummary pendingScraps={pendingScraps} state={state} />

      {/* Quick Status Filter Pills cho tab phế liệu */}
      {activeTab === "scraps" && (
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div className="quick-status-filter-group">
            <Button
              type="button"
              className={`quick-status-filter-btn ${statusFilter === "all" ? "active" : ""}`}
              onClick={() => setStatusFilter("all")}
            >
              <span>Tất cả</span>
              <span className="filter-count-badge">{state.scraps?.length || 0}</span>
            </Button>
            <Button
              type="button"
              className={`quick-status-filter-btn ${statusFilter === "pending" ? "active" : ""}`}
              onClick={() => setStatusFilter("pending")}
            >
              <span>Chờ thanh lý</span>
              <span className="filter-count-badge">{pendingScraps.length}</span>
            </Button>
            <Button
              type="button"
              className={`quick-status-filter-btn ${statusFilter === "done" ? "active" : ""}`}
              onClick={() => setStatusFilter("done")}
            >
              <span>Đã xuất xử lý</span>
              <span className="filter-count-badge">{(state.scraps || []).length - pendingScraps.length}</span>
            </Button>
          </div>
          <div className="text-muted font-mono" style={{ fontSize: "12px" }}>
            Hiển thị <strong>{displayedScraps.length}</strong> / {state.scraps?.length || 0} vật tư phế liệu
          </div>
        </div>
      )}

      <DisposalTable activeTab={activeTab} displayedScraps={displayedScraps} state={state} />

      {modalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "480px" }}>
            <div className="modal-content">
              <div className="modal-header py-2.5 px-3 border-bottom border-outline-variant">
                <h5 className="modal-title font-headline fs-6 text-dark">Lập phiếu xuất xử lý phế liệu</h5>
                <Button type="button" className="btn-close" onClick={() => setModalOpen(false)} />
              </div>
              <div className="modal-body p-3 small d-flex flex-column gap-2.5">
                <div>
                  <label htmlFor="disp-scrap-select" className="form-label text-dark fw-semibold mb-0.5">Chọn vật tư phế liệu <span className="text-danger">*</span></label>
                  <Select variant="standard" id="disp-scrap-select" className="w-100" value={selectedScrapId} onChange={(e) => setSelectedScrapId(e.target.value)}>
                    {pendingScraps.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({s.quantity} {s.unit}) — {s.location}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label htmlFor="disp-reason-input" className="form-label text-dark fw-semibold mb-0.5">Lý do & Căn cứ xử lý <span className="text-danger">*</span></label>
                  <Input variant="compact" id="disp-reason-input" type="text"  value={reason} onChange={(e) => setReason(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="disp-receiver-input" className="form-label text-dark fw-semibold mb-0.5">Đơn vị / Người tiếp nhận trách nhiệm <span className="text-danger">*</span></label>
                  <Input variant="compact" id="disp-receiver-input" type="text"  value={receiver} onChange={(e) => setReceiver(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer py-2 px-3 border-top border-outline-variant d-flex justify-content-between">
                <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Huỷ</Button>
                <Button type="button" variant="primary" onClick={handleSaveDisposal}>Lập và Duyệt xuất</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
