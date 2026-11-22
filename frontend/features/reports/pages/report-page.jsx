import { Button } from "../../../design-system/button/button.jsx";
import { useState } from "react";
import { usePrototypeStore } from "../../../shared/hooks/use-prototype-store.js";
import { PrototypePageHeader } from "../../../shared/components/prototype-page-header.jsx";
import { TabCurrentStock } from "../components/tab-current-stock.jsx";
import { TabInOutInventory } from "../components/tab-in-out-inventory.jsx";
import { TabMonthlySummary } from "../components/tab-monthly-summary.jsx";
import { TabRecoveryRate } from "../components/tab-recovery-rate.jsx";

export function ReportPage() {
  const { state } = usePrototypeStore();
  const [activeTab, setActiveTab] = useState("current");

  return (
    <div className="d-flex flex-column gap-4">
      <PrototypePageHeader
        title="Báo cáo vật tư"
        subtitle="Hệ thống báo cáo tổng hợp: Tồn kho hiện tại, Nhập–Xuất–Tồn, Biến động tháng và Đánh giá tỷ lệ thu hồi"
      />

      <div className="d-flex gap-2 border-bottom border-outline-variant pb-2 flex-wrap">
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "current" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("current")}
        >
          Tồn kho hiện tại
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "inout" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("inout")}
        >
          Nhập–Xuất–Tồn
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "monthly" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("monthly")}
        >
          Nhập xuất theo tháng
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "recovery" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("recovery")}
        >
          Thu hồi & Lịch gửi báo cáo
        </Button>
      </div>

      <div className="ui-card p-0 overflow-hidden d-flex flex-column">
        {activeTab === "current" && <TabCurrentStock lots={state.lots || []} />}
        {activeTab === "inout" && <TabInOutInventory />}
        {activeTab === "monthly" && <TabMonthlySummary />}
        {activeTab === "recovery" && <TabRecoveryRate />}
      </div>
    </div>
  );
}
