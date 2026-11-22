import { Button } from "../../../design-system/button/button.jsx";
import { INITIAL_TASK_GROUPS } from "../data/dashboard-demo.js";

export function DashboardTaskDialog({ activeTaskModalGroup, currentMonthMeta, getGroupMatchingItems, handleResolveTaskItem, isSixMonthMode, setShowTaskModal, showTaskModal, warehouseDisplayName }) {
  if (!showTaskModal) return null;

  const groups = activeTaskModalGroup === "ALL"
    ? INITIAL_TASK_GROUPS
    : INITIAL_TASK_GROUPS.filter((group) => group.id === activeTaskModalGroup);
  const taskItems = groups.flatMap((group) =>
    getGroupMatchingItems(group).map((item) => ({ group, item }))
  );

  return (
    <div className="modal fade show d-flex align-items-center justify-content-center" style={{ background: "rgba(15, 23, 42, 0.4)", zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered w-100" style={{ maxWidth: "520px" }}>
          <div className="modal-content border-0 shadow-lg overflow-hidden" style={{ borderRadius: "var(--radius-lg)" }}>
            <div className="modal-header px-4 py-3 border-bottom border-outline-subtle d-flex justify-content-between align-items-center">
              <div>
                <h5 className="modal-title font-headline fw-semibold text-dark m-0" style={{ fontSize: "15.5px" }}>
                  {activeTaskModalGroup === "ALL"
                    ? "Tất cả công việc cần xử lý"
                    : INITIAL_TASK_GROUPS.find((g) => g.id === activeTaskModalGroup)?.title || "Chi tiết đầu việc"}
                </h5>
                <p className="text-muted m-0" style={{ fontSize: "12px", marginTop: "2px" }}>
                  {warehouseDisplayName} · {isSixMonthMode ? "06–11/2026" : currentMonthMeta?.full || "Kỳ chọn"}
                </p>
              </div>
              <Button type="button" className="btn-close" onClick={() => setShowTaskModal(false)} />
            </div>

            <div className="modal-body p-4 d-flex flex-column gap-2.5" style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {taskItems.length === 0 ? (
                <div className="py-4 text-center text-muted" style={{ fontSize: "13px" }}>
                  Tất cả hồ sơ trong nhóm này đã được xử lý hoàn tất.
                </div>
              ) : (
                taskItems.map(({ group, item }) => (
                  <div key={item.id} className="p-3 bg-light border border-outline-subtle d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2" style={{ borderRadius: "var(--radius-md)" }}>
                    <div className="min-w-0">
                      <div className="d-flex align-items-center gap-1.5 flex-wrap">
                        <span className="badge bg-white border border-outline-variant text-dark fw-semibold" style={{ fontSize: "11px", borderRadius: "3px" }}>
                          {item.code}
                        </span>
                        <span className="text-muted" style={{ fontSize: "11px" }}>
                          {item.warehouse === "main" ? "Kho chính" : "Phân xưởng"}
                        </span>
                      </div>
                      <p className="fw-medium text-dark m-0 text-truncate" style={{ fontSize: "13px", marginTop: "4px" }}>
                        {item.text}
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleResolveTaskItem(item)}
                      variant="primary" className="align-self-end align-self-sm-center shrink-0"
                      style={{ height: "32px", minHeight: "32px", fontSize: "12px", padding: "0 12px" }}
                    >
                      {group.actionLabel}
                    </Button>
                  </div>
                ))
              )}
            </div>

            <div className="modal-footer px-4 py-2.5 bg-light border-top border-outline-subtle">
              <Button type="button" variant="secondary" onClick={() => setShowTaskModal(false)} style={{ height: "32px", minHeight: "32px", fontSize: "12px", padding: "0 14px" }}>
                Đóng
              </Button>
            </div>
          </div>
        </div>
    </div>
  );
}
