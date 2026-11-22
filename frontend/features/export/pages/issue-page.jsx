import { Button } from "../../../design-system/button/button.jsx";
import { IssueFilters } from "../components/issue-filters.jsx";
import { IssueSummary } from "../components/issue-summary.jsx";
import { useState, useMemo } from "react";
import { usePrototypeStore } from "../../../shared/hooks/use-prototype-store.js";
import { PrototypePageHeader } from "../../../shared/components/prototype-page-header.jsx";
import { IssueTable } from "../components/issue-table.jsx";
import { IssueRequestTable } from "../components/issue-request-table.jsx";
import { WorkshopUsageTable } from "../components/workshop-usage-table.jsx";
import { IssueDrawer } from "../components/issue-drawer.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";
import { showAppToast } from "../../../shared/utils/toast-service.js";

export function IssuePage() {
  const { state, store } = usePrototypeStore();
  const [activeTab, setActiveTab] = useState("issues");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWorkshop, setFilterWorkshop] = useState("all");
  const [filterShift, setFilterShift] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const filteredIssues = useMemo(() => {
    return (state.issues || []).filter((iss) => {
      if (filterWorkshop !== "all" && iss.workshop !== filterWorkshop) return false;
      if (filterShift !== "all" && iss.shift !== filterShift) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase().trim();
        const mId = iss.id.toLowerCase().includes(q);
        const mContent = iss.content.toLowerCase().includes(q);
        const mReceiver = iss.receiver.toLowerCase().includes(q);
        if (!mId && !mContent && !mReceiver) return false;
      }
      return true;
    });
  }, [state.issues, filterWorkshop, filterShift, searchTerm]);

  const handleOpenCreate = () => {
    setSelectedIssue(null);
    setDrawerOpen(true);
  };

  const handleSelectIssue = (iss) => {
    setSelectedIssue(iss);
    setDrawerOpen(true);
  };

  const handleCreateFromRequest = (_req) => {
    setSelectedIssue(null);
    setDrawerOpen(true);
  };

  const handleSaveIssue = (data, autoApprove) => {
    store.createIssue(data, autoApprove);
  };

  const handleConfirmIssue = (id) => {
    store.confirmIssue(id);
  };

  const handleUpdateUsage = (workshop, materialCode, qty) => {
    store.updateWorkshopUsage(workshop, materialCode, qty);
  };

  const handlePrint = (iss) => {
    showAppToast(`Đang kết xuất và in phiếu xuất kho ${iss.id}...`, "info");
  };

  return (
    <div className="d-flex flex-column gap-4">
      <PrototypePageHeader
        title="Cấp phát sử dụng"
        subtitle="Quản lý yêu cầu xuất kho, phiếu cấp phát vật tư theo ca và giám sát tình hình sử dụng tại phân xưởng"
        actions={
          <Button type="button" variant="primary" onClick={handleOpenCreate}>
            <Icon name="plus" size={16} />
            <span>Lập phiếu xuất kho</span>
          </Button>
        }
      />

      <div className="d-flex gap-2 border-bottom border-outline-variant pb-2">
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "issues" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("issues")}
        >
          Phiếu xuất kho ({state.issues?.length || 0})
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "requests" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("requests")}
        >
          Yêu cầu xuất ({state.issueRequests?.length || 0})
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "usage" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("usage")}
        >
          Sử dụng tại phân xưởng ({state.workshopBalances?.length || 0})
        </Button>
      </div>

      {/* Enterprise Summary Strip: Chỉ số tổng hợp nhanh */}
      <IssueSummary state={state} />

      {activeTab === "issues" && (
        <IssueFilters filterShift={filterShift} filterWorkshop={filterWorkshop} searchTerm={searchTerm} setFilterShift={setFilterShift} setFilterWorkshop={setFilterWorkshop} setSearchTerm={setSearchTerm} state={state} />
      )}

      <div className="ui-card p-0 overflow-hidden d-flex flex-column">
        {activeTab === "issues" && (
          <IssueTable issues={filteredIssues} onSelectIssue={handleSelectIssue} onConfirmIssue={handleConfirmIssue} onPrintIssue={handlePrint} />
        )}
        {activeTab === "requests" && (
          <IssueRequestTable requests={state.issueRequests || []} onCreateIssueFromRequest={handleCreateFromRequest} />
        )}
        {activeTab === "usage" && (
          <div className="p-3">
            <WorkshopUsageTable balances={state.workshopBalances || []} onUpdateUsage={handleUpdateUsage} />
          </div>
        )}
      </div>

      <IssueDrawer
        show={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveIssue}
        onConfirm={handleConfirmIssue}
        existingIssue={selectedIssue}
        lots={state.lots || []}
        workshops={state.workshops || []}
        requests={state.issueRequests || []}
      />
    </div>
  );
}
