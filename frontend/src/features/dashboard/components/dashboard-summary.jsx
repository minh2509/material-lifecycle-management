import { PendingWorkCard } from "./pending-work-card.jsx";
import { MaterialConditionsCard } from "./material-conditions-card.jsx";
import { StorageLocationsCard } from "./storage-locations-card.jsx";
import { AvailableMaterialsCard } from "./available-materials-card.jsx";

export function DashboardSummary({ cards }) {
  return (
    <section aria-label="Các chỉ số tổng quan">
      <h2 className="visually-hidden">Các chỉ số tổng quan</h2>
      <h2 className="visually-hidden">Tình trạng vật tư hiện tại</h2>
      <div className="row g-3 align-items-stretch">
        <AvailableMaterialsCard {...cards.available} />
        <StorageLocationsCard {...cards.locations} />
        <MaterialConditionsCard {...cards.conditions} />
        <PendingWorkCard {...cards.documents} />
      </div>
    </section>
  );
}
