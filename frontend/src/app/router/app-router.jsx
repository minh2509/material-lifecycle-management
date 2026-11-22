import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "../../features/dashboard/index.js";
import { InventoryDetailPage } from "../../features/inventory/index.js";
import { NormPage } from "../../features/technical-norms/index.js";
import { DemandPlanPage } from "../../features/demand/index.js";
import { ProcurementPlanPage, ProcurementExecPage } from "../../features/procurement/index.js";
import { ReceiptPage } from "../../features/import/index.js";
import { IssuePage } from "../../features/export/index.js";
import { RecoveryPage } from "../../features/recovery/index.js";
import { DisposalPage } from "../../features/disposal/index.js";
import { CatalogMasterPage } from "../../features/warehouse/index.js";
import { AuditPage } from "../../features/stocktaking/index.js";
import { ReportPage } from "../../features/reports/index.js";
import { UserManagementPage } from "../../features/administration/index.js";

export function AppRouter({ workspace }) {
  const { catalog, detailList, selectedWarehouse, setSelectedWarehouse, selectedPeriod, setSelectedPeriod } = workspace;
  return (<Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                selectedWarehouse={selectedWarehouse}
                setSelectedWarehouse={setSelectedWarehouse}
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
              />
            }
          />
          <Route path="/chi-tiet-ton-kho" element={<InventoryDetailPage detailList={detailList} />} />
          <Route path="/dinh-muc" element={<NormPage />} />
          <Route path="/ke-hoach-nhu-cau" element={<DemandPlanPage />} />
          <Route path="/du-tru" element={<ProcurementPlanPage />} />
          <Route path="/mua-sam" element={<ProcurementExecPage />} />
          <Route path="/nhap-kho" element={<ReceiptPage />} />
          <Route path="/cap-phat" element={<IssuePage />} />
          <Route path="/thu-hoi" element={<RecoveryPage />} />
          <Route path="/thanh-ly" element={<DisposalPage />} />
          <Route path="/danh-muc" element={<CatalogMasterPage catalogItems={catalog?.items || []} />} />
          <Route path="/kiem-ke" element={<AuditPage />} />
          <Route path="/bao-cao" element={<ReportPage />} />
          <Route path="/quan-tri" element={<UserManagementPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>);
}
