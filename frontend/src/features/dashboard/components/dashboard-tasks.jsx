import { Button } from "../../../design-system/button/button.jsx";

export function DashboardTasks({ handleActionClick, openTaskDialog, setTaskTab, taskTab, totalPendingTasks, visibleTaskGroups }) {
  return (
    <div className="col-12 col-lg-5">
      <div className="bento-card p-4 h-100" style={{ minHeight: "415px" }}>

        {/* Header thẻ */}
        <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
          <div className="d-flex align-items-center gap-2">
            <h2 className="m-0 font-headline" style={{ fontSize: "15.5px", fontWeight: "600", color: "#262626" }}>
              Công việc cần xử lý
            </h2>
            <span className="badge fw-semibold px-2 py-0.5" style={{ background: "var(--primary-container)", color: "var(--primary)", fontSize: "11.5px", borderRadius: "4px" }}>
              {totalPendingTasks}
            </span>
          </div>
          <Button
            type="button"
            className="btn btn-link p-0 text-primary text-decoration-none fw-medium"
            style={{ fontSize: "12px" }}
            onClick={() => openTaskDialog("ALL")}
          >
            Xem tất cả
          </Button>
        </div>

        {/* 3 Tab lọc nhanh */}
        <div className="segmented-control w-100 mb-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          <Button
            type="button"
            onClick={() => setTaskTab("all")}
            className={`segmented-control-btn text-center ${taskTab === "all" ? "active" : ""}`}
          >
            Tất cả
          </Button>
          <Button
            type="button"
            onClick={() => setTaskTab("docs")}
            className={`segmented-control-btn text-center ${taskTab === "docs" ? "active" : ""}`}
          >
            Chứng từ
          </Button>
          <Button
            type="button"
            onClick={() => setTaskTab("tech")}
            className={`segmented-control-btn text-center ${taskTab === "tech" ? "active" : ""}`}
          >
            Kỹ thuật
          </Button>
        </div>

        {/* Danh sách 5 nhóm đầu việc */}
        <div className="flex-grow-1 overflow-y-auto d-flex flex-column divide-y divide-outline-subtle">
          {visibleTaskGroups.length === 0 ? (
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center py-4">
              <div className="rounded-1 d-flex align-items-center justify-content-center mb-2" style={{ width: "36px", height: "36px", background: "var(--success-container)", color: "var(--success)" }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p className="fw-semibold text-dark m-0" style={{ fontSize: "13px" }}>Đã xử lý xong!</p>
              <p className="text-muted m-0" style={{ fontSize: "11.5px" }}>Không còn đầu việc tồn đọng theo bộ lọc hiện tại.</p>
            </div>
          ) : (
            visibleTaskGroups.slice(0, 5).map((group) => (
              <div
                key={group.id}
                className="task-list-row"
                onClick={() => openTaskDialog(group.id)}
              >
                <div className="min-w-0">
                  <p className="task-row-title fw-semibold text-dark m-0 text-truncate" style={{ fontSize: "13px" }}>
                    {group.title}
                  </p>
                  <p className="text-muted m-0 text-truncate" style={{ fontSize: "11.5px", marginTop: "2px" }}>
                    {group.desc}
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2 shrink-0">
                  <span className={`badge fw-semibold px-2 py-0.5 ${group.badgeClass}`} style={{ fontSize: "11.5px", borderRadius: "4px" }}>
                    {group.matchingItems.length}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    style={{ height: "28px", minHeight: "28px", fontSize: "11px", padding: "0 10px" }}
                    onClick={(e) => handleActionClick(e, "Chức năng xem xử lý đang phát triển.")}
                    aria-label="Xem xử lý"
                  >
                    Xem xử lý
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
