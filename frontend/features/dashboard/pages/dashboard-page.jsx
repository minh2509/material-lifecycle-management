import { Button } from "../../../design-system/button/button.jsx";
import { useDashboard } from "../hooks/use-dashboard.js";
import { DashboardHeader } from "../components/dashboard-header.jsx";
import { DashboardSummary } from "../components/dashboard-summary.jsx";
import { DashboardMovements } from "../components/dashboard-movements.jsx";
import { DashboardTasks } from "../components/dashboard-tasks.jsx";
import { DashboardTaskDialog } from "../components/dashboard-task-dialog.jsx";

export function DashboardPage(props) {
  const { header, summary, movements, tasks, dialog, feedback } = useDashboard(props);
  const { alertMessage, setAlertMessage, toastMessage } = feedback;
  return (
    <div className="d-flex flex-column gap-3 pb-4">
      {alertMessage && (
        <div role="alert" className="alert alert-info py-2 px-3 mb-0 d-flex justify-content-between align-items-center" style={{ fontSize: "12.5px" }}>
          <span>{alertMessage}</span>
          <Button type="button" className="btn-close" style={{ fontSize: "11px" }} onClick={() => setAlertMessage(null)} />
        </div>
      )}
      <DashboardHeader {...header} />
      <DashboardSummary {...summary} />
      <section className="row g-3 align-items-stretch">
        <DashboardMovements {...movements} />
        <DashboardTasks {...tasks} />
      </section>
      <DashboardTaskDialog {...dialog} />
      {toastMessage && (
        <div className="toast-notice">
          <span className="d-inline-block rounded-circle" style={{ width: "8px", height: "8px", background: "var(--primary)" }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
