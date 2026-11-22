import { Button } from "../../../design-system/button/button.jsx";
import { useState } from "react";
import { usePrototypeStore } from "../../../shared/hooks/use-prototype-store.js";
import { PrototypePageHeader } from "../../../shared/components/prototype-page-header.jsx";
import { TabWarehouse } from "../components/tab-warehouse.jsx";
import { TabLocation } from "../components/tab-location.jsx";
import { TabMaterial } from "../components/tab-material.jsx";
import { TabSupplierWorkshop } from "../components/tab-supplier-workshop.jsx";

export function CatalogMasterPage({ catalogItems = [] }) {
  const { state, store } = usePrototypeStore();
  const [activeTab, setActiveTab] = useState("materials");

  return (
    <div className="d-flex flex-column gap-4">
      <PrototypePageHeader
        title="Danh mục hệ thống"
        subtitle="Quản lý danh mục kho bãi, vị trí khoang kệ, vật tư, đơn vị phân xưởng và nhà cung cấp"
      />

      {/* Tabs */}
      <div className="d-flex gap-2 border-bottom border-outline-variant pb-2 flex-wrap">
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "materials" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("materials")}
        >
          Vật tư ({catalogItems.length || 0})
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "warehouses" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("warehouses")}
        >
          Kho bãi ({state.warehouses?.length || 0})
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "locations" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("locations")}
        >
          Vị trí Khoang/Kệ ({state.locations?.length || 0})
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "partners" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("partners")}
        >
          Đơn vị & Nhà cung cấp
        </Button>
      </div>

      <div className="ui-card p-0 overflow-hidden d-flex flex-column">
        {activeTab === "materials" && <TabMaterial catalogItems={catalogItems} />}
        {activeTab === "warehouses" && (
          <TabWarehouse warehouses={state.warehouses || []} onAddWarehouse={(wh) => store.addWarehouse(wh)} />
        )}
        {activeTab === "locations" && (
          <TabLocation
            locations={state.locations || []}
            warehouses={state.warehouses || []}
            onAddLocation={(loc) => store.addLocation(loc)}
          />
        )}
        {activeTab === "partners" && (
          <TabSupplierWorkshop
            suppliers={state.suppliers || []}
            workshops={state.workshops || []}
            onAddSupplier={(sup) => store.addSupplier(sup)}
          />
        )}
      </div>
    </div>
  );
}
