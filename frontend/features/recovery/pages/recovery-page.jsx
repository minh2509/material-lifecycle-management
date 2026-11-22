import { Button } from "../../../design-system/button/button.jsx";
import { Input } from "../../../design-system/input/input.jsx";
import { Select } from "../../../design-system/select/select.jsx";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePrototypeStore } from "../../../shared/hooks/use-prototype-store.js";
import { PrototypePageHeader } from "../../../shared/components/prototype-page-header.jsx";
import { RecoveryTable } from "../components/recovery-table.jsx";
import { EvaluationTab } from "../components/evaluation-tab.jsx";
import { RepairTab } from "../components/repair-tab.jsx";
import { RecoveryDrawer } from "../components/recovery-drawer.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function RecoveryPage() {
  const { state, store } = usePrototypeStore();
  const [activeTab, setActiveTab] = useState("recoveries");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWorkshop, setFilterWorkshop] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRecovery, setSelectedRecovery] = useState(null);

  const filteredRecoveries = useMemo(() => {
    return (state.recoveries || []).filter((r) => {
      if (filterWorkshop !== "all" && r.workshop !== filterWorkshop) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase().trim();
        const mId = r.id.toLowerCase().includes(q);
        const mContent = r.content.toLowerCase().includes(q);
        if (!mId && !mContent) return false;
      }
      return true;
    });
  }, [state.recoveries, filterWorkshop, searchTerm]);

  const handleOpenCreate = () => {
    setSelectedRecovery(null);
    setDrawerOpen(true);
  };

  const handleSelectRecovery = (rec) => {
    setSelectedRecovery(rec);
    setDrawerOpen(true);
  };

  const handleSaveRecovery = (recData) => {
    store.createRecovery(recData);
  };

  const handleEvaluateItem = (recId, itemId, evalResult) => {
    store.evaluateRecoveryItem(recId, itemId, evalResult);
  };

  return (
    <div className="d-flex flex-column gap-4">
      <PrototypePageHeader
        title="Thu hồi – Tái sử dụng"
        subtitle="Quy trình khép kín: Tiếp nhận nhập kho trước → Đánh giá kỹ thuật phân luồng → Sửa chữa phục hồi & nhập lại kho"
        actions={
          <Button type="button" variant="primary" onClick={handleOpenCreate}>
            <Icon name="plus" size={16} />
            <span>Lập phiếu thu hồi</span>
          </Button>
        }
      />

      <div className="d-flex gap-2 border-bottom border-outline-variant pb-2">
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "recoveries" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("recoveries")}
        >
          Phiếu thu hồi ({state.recoveries?.length || 0})
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "evaluation" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("evaluation")}
        >
          Đánh giá kỹ thuật
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "repairs" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("repairs")}
        >
          Sửa chữa và nhập lại ({state.repairs?.length || 0})
        </Button>
        <Link
          to="/thanh-ly"
          className="btn btn-sm btn-light text-dark"
          title="Chuyển sang Quản lý kho phế liệu và xuất xử lý"
        >
          Thanh lý phế liệu ({state.scraps?.length || 0})
        </Link>
      </div>

      {/* Enterprise Summary Strip: Chỉ số tổng hợp nhanh */}
      <div className="summary-metric-strip">
        <div className="summary-metric-card">
          <div>
            <div className="summary-metric-label">Tổng phiếu thu hồi</div>
            <div className="summary-metric-value">{state.recoveries?.length || 0}</div>
          </div>
          <div className="summary-metric-icon" style={{ background: "var(--primary-container)", color: "var(--primary)" }}>
            <Icon name="refresh" size={18} />
          </div>
        </div>
        <div className="summary-metric-card">
          <div>
            <div className="summary-metric-label">Vật tư chuyển sửa chữa</div>
            <div className="summary-metric-value" style={{ color: "var(--info)" }}>
              {state.repairs?.length || 0}
            </div>
          </div>
          <div className="summary-metric-icon" style={{ background: "var(--primary-container)", color: "var(--primary)" }}>
            <Icon name="tune" size={18} />
          </div>
        </div>
        <div className="summary-metric-card">
          <div>
            <div className="summary-metric-label">Đã đánh giá kỹ thuật</div>
            <div className="summary-metric-value" style={{ color: "var(--success)" }}>
              {(state.recoveries || []).reduce((acc, r) => acc + (r.items || []).filter(it => it.evaluation?.status === "Đã đánh giá").length, 0)}
            </div>
          </div>
          <div className="summary-metric-icon" style={{ background: "var(--success-container)", color: "var(--success)" }}>
            <Icon name="check" size={18} />
          </div>
        </div>
        <div className="summary-metric-card">
          <div>
            <div className="summary-metric-label">Kho phế liệu tập kết</div>
            <div className="summary-metric-value" style={{ color: "var(--warning)" }}>
              {state.scraps?.length || 0}
            </div>
          </div>
          <div className="summary-metric-icon" style={{ background: "var(--warning-container)", color: "var(--warning)" }}>
            <Icon name="delete" size={18} />
          </div>
        </div>
      </div>

      {activeTab === "recoveries" && (
        <div className="stitch-card p-3">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-md-6">
              <label htmlFor="rec-search" className="form-label small fw-semibold text-dark mb-1">Tìm kiếm theo mã phiếu hoặc nội dung</label>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0 text-muted"><Icon name="search" size={15} /></span>
                <Input variant="standard" id="rec-search" type="search" className="border-start-0" placeholder="Nhập PTH-... hoặc nội dung..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <label htmlFor="rec-ws-filter" className="form-label small fw-semibold text-dark mb-1">Đơn vị giao</label>
              <Select variant="standard" id="rec-ws-filter" className="w-100" value={filterWorkshop} onChange={(e) => setFilterWorkshop(e.target.value)}>
                <option value="all">Tất cả đơn vị</option>
                <option value="Phân xưởng Khai thác 1">Phân xưởng Khai thác 1</option>
                <option value="Phân xưởng Khai thác 2">Phân xưởng Khai thác 2</option>
                <option value="Phân xưởng Cơ điện Vận tải Lò">Phân xưởng Cơ điện</option>
              </Select>
            </div>
            <div className="col-6 col-md-auto ms-auto">
              <Button
                type="button"
                variant="secondary" className="w-100"
                onClick={() => { setSearchTerm(""); setFilterWorkshop("all"); }}
              >
                Đặt lại lọc
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="stitch-card p-0 overflow-hidden d-flex flex-column">
        {activeTab === "recoveries" && (
          <RecoveryTable recoveries={filteredRecoveries} onSelectRecovery={handleSelectRecovery} />
        )}
        {activeTab === "evaluation" && (
          <EvaluationTab recoveries={state.recoveries || []} onEvaluateItem={handleEvaluateItem} />
        )}
        {activeTab === "repairs" && (
          <RepairTab repairs={state.repairs || []} />
        )}
      </div>

      <RecoveryDrawer
        show={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveRecovery}
        existingRecovery={selectedRecovery}
        workshops={state.workshops || []}
      />
    </div>
  );
}
