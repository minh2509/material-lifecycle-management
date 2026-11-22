import { Button } from "../../../design-system/button/button.jsx";
import { ReceiptFilters } from "../components/receipt-filters.jsx";
import { ReceiptSummary } from "../components/receipt-summary.jsx";
import { useState, useMemo } from "react";
import { usePrototypeStore } from "../../../shared/hooks/use-prototype-store.js";
import { PrototypePageHeader } from "../../../shared/components/prototype-page-header.jsx";
import { ReceiptTable } from "../components/receipt-table.jsx";
import { LotTrackingTable } from "../components/lot-tracking-table.jsx";
import { ReceiptDrawer } from "../components/receipt-drawer.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function ReceiptPage() {
  const { state, store } = usePrototypeStore();
  const [activeTab, setActiveTab] = useState("receipts");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWarehouse, setFilterWarehouse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const filteredReceipts = useMemo(() => {
    return (state.receipts || []).filter((r) => {
      if (filterWarehouse !== "all" && r.warehouse !== filterWarehouse) return false;
      if (filterStatus !== "all" && r.status !== filterStatus) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase().trim();
        const mId = r.id.toLowerCase().includes(q);
        const mRef = (r.referenceNo || "").toLowerCase().includes(q);
        if (!mId && !mRef) return false;
      }
      return true;
    });
  }, [state.receipts, filterWarehouse, filterStatus, searchTerm]);

  const filteredLots = useMemo(() => {
    return (state.lots || []).filter((l) => {
      if (filterWarehouse !== "all" && l.warehouse !== filterWarehouse) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase().trim();
        const mLot = l.lotCode.toLowerCase().includes(q);
        const mCode = l.materialCode.toLowerCase().includes(q);
        const mName = l.materialName.toLowerCase().includes(q);
        if (!mLot && !mCode && !mName) return false;
      }
      return true;
    });
  }, [state.lots, filterWarehouse, searchTerm]);

  const handleOpenCreate = () => {
    setSelectedReceipt(null);
    setDrawerOpen(true);
  };

  const handleSelectReceipt = (r) => {
    setSelectedReceipt(r);
    setDrawerOpen(true);
  };

  const handleSaveReceipt = (data, autoConfirm) => {
    store.createReceipt(data, autoConfirm);
  };

  const handleConfirmReceipt = (id) => {
    store.confirmReceipt(id);
  };

  return (
    <div className="d-flex flex-column gap-4">
      <PrototypePageHeader
        title="Nhập kho"
        subtitle="Quản lý tiếp nhận vật tư mua mới và thu hồi • Kiểm nhập 2 bước, theo dõi số còn được nhập và sinh lô truy vết"
        actions={
          <Button type="button" variant="primary" onClick={handleOpenCreate}>
            <Icon name="plus" size={16} />
            <span>Lập phiếu nhập kho</span>
          </Button>
        }
      />

      {/* Tabs */}
      <div className="d-flex gap-2 border-bottom border-outline-variant pb-2">
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "receipts" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("receipts")}
        >
          Danh sách phiếu nhập ({state.receipts?.length || 0})
        </Button>
        <Button
          type="button"
          className={`btn btn-sm ${activeTab === "lots" ? "btn-primary fw-semibold" : "btn-light text-dark"}`}
          style={{ borderRadius: "var(--radius-sm)" }}
          onClick={() => setActiveTab("lots")}
        >
          Lô và truy vết ({state.lots?.length || 0})
        </Button>
      </div>

      {/* Enterprise Summary Strip: Chỉ số tổng hợp nhanh */}
      <ReceiptSummary state={state} />

      {/* Filter toolbar */}
      <ReceiptFilters activeTab={activeTab} filterStatus={filterStatus} filterWarehouse={filterWarehouse} searchTerm={searchTerm} setFilterStatus={setFilterStatus} setFilterWarehouse={setFilterWarehouse} setSearchTerm={setSearchTerm} state={state} />

      {/* Main Table Card */}
      <div className="stitch-card p-0 overflow-hidden d-flex flex-column">
        {activeTab === "receipts" ? (
          <ReceiptTable
            receipts={filteredReceipts}
            onSelectReceipt={handleSelectReceipt}
            onConfirmReceipt={handleConfirmReceipt}
          />
        ) : (
          <LotTrackingTable lots={filteredLots} />
        )}
      </div>

      {/* 2-Step Drawer */}
      <ReceiptDrawer
        show={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSaveReceipt}
        existingReceipt={selectedReceipt}
        plans={state.procurementPlans || []}
      />
    </div>
  );
}
