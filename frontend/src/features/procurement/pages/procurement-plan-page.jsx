import { Button } from "../../../design-system/button/button.jsx";
import { ProcurementPlanFilters } from "../components/procurement-plan-filters.jsx";
import { ProcurementPlanSummary } from "../components/procurement-plan-summary.jsx";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePrototypeStore } from "../../../shared/hooks/use-prototype-store.js";
import { PrototypePageHeader } from "../../../shared/components/prototype-page-header.jsx";
import { ProcurementPlanTable } from "../components/procurement-plan-table.jsx";
import { ProcurementPlanDrawer } from "../components/procurement-plan-drawer.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function ProcurementPlanPage() {
  const { state, store } = usePrototypeStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const filteredPlans = useMemo(() => {
    return (state.procurementPlans || []).filter((p) => {
      if (filterStatus !== "all" && p.status !== filterStatus) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase().trim();
        const mId = p.id.toLowerCase().includes(q);
        const mContract = p.contractNo.toLowerCase().includes(q);
        const mContent = p.content.toLowerCase().includes(q);
        const mSupplier = p.supplier.toLowerCase().includes(q);
        if (!mId && !mContract && !mContent && !mSupplier) return false;
      }
      return true;
    });
  }, [state.procurementPlans, filterStatus, searchTerm]);

  const handleOpenCreate = () => {
    setSelectedPlan(null);
    setDrawerOpen(true);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setDrawerOpen(true);
  };

  const handleSavePlan = (planData) => {
    store.createProcurementPlan(planData);
  };

  const handleApprovePlan = (planId) => {
    store.approveProcurementPlan(planId);
  };

  return (
    <div className="d-flex flex-column gap-4">
      <PrototypePageHeader
        title="Dự trù mua sắm"
        subtitle="Hồ sơ hợp đồng và dự trù vật tư mua sắm • Kiểm soát hạn mức phê duyệt, ngăn chặn mua vượt định mức"
        actions={
          <Button type="button" variant="primary" onClick={handleOpenCreate}>
            <Icon name="plus" size={16} />
            <span>Lập dự trù mua sắm</span>
          </Button>
        }
      />

      {/* Tabs liên kết chu trình Mua sắm & Kế hoạch */}
      <div className="d-flex gap-2 border-bottom border-outline-variant pb-2 flex-wrap">
        <Link to="/du-tru" className="btn btn-sm btn-primary fw-semibold">
          Hồ sơ dự trù hợp đồng ({state.procurementPlans?.length || 0})
        </Link>
        <Link to="/mua-sam" className="btn btn-sm btn-light text-dark">
          Tiến độ thực hiện theo HĐ
        </Link>
        <Link to="/ke-hoach-nhu-cau" className="btn btn-sm btn-light text-dark">
          Kế hoạch nhu cầu
        </Link>
        <Link to="/dinh-muc" className="btn btn-sm btn-light text-dark">
          Định mức kỹ thuật
        </Link>
      </div>

      {/* Enterprise Summary Strip: Chỉ số tổng hợp nhanh */}
      <ProcurementPlanSummary state={state} />

      <ProcurementPlanFilters filterStatus={filterStatus} searchTerm={searchTerm} setFilterStatus={setFilterStatus} setSearchTerm={setSearchTerm} state={state} />

      <div className="stitch-card p-0 overflow-hidden d-flex flex-column">
        <ProcurementPlanTable
          plans={filteredPlans}
          onSelectPlan={handleSelectPlan}
          onApprovePlan={handleApprovePlan}
        />
      </div>

      <ProcurementPlanDrawer
        show={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSavePlan}
        onApprove={handleApprovePlan}
        existingPlan={selectedPlan}
      />
    </div>
  );
}
