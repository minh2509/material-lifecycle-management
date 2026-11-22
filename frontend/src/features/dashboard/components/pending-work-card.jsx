import { Button } from "../../../design-system/button/button.jsx";

export function PendingWorkCard({ currentMonthMeta, inSum, isSixMonthMode, openTaskDialog, outSum, pIn, pOut, pRec, recSum, totalDocs, totalPendingTasks }) {
  return (
    <div className="col-12 col-sm-6 col-xl-3 d-flex">
      <div className="bento-card w-100">
        <div className="d-flex align-items-center justify-content-between">
          <span className="bento-card-title">PHÁT SINH CHỨNG TỪ</span>
          <span className="badge bg-light text-muted fw-normal px-2 py-0.5" style={{ fontSize: "11px", borderRadius: "4px" }}>
            {isSixMonthMode ? "06–11/2026" : currentMonthMeta?.label || "Kỳ chọn"}
          </span>
        </div>

        <div className="my-auto py-1">
          <div className="d-flex align-items-baseline" style={{ gap: "6px" }}>
            <span className="bento-card-big-num">{totalDocs}</span>
            <span className="text-muted fw-medium" style={{ fontSize: "13px" }}>chứng từ</span>
          </div>

          {/* Thanh tỷ lệ 3 luồng: Nhập / Xuất / Thu hồi */}
          <div className="w-100 overflow-hidden d-flex gap-0.5 mt-2" style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px" }}>
            <div style={{ width: `${pIn}%`, background: "var(--primary)" }} title={`Nhập kho: ${inSum} (${pIn.toFixed(1)}%)`} />
            <div style={{ width: `${pOut}%`, background: "#475569" }} title={`Xuất kho: ${outSum} (${pOut.toFixed(1)}%)`} />
            <div style={{ width: `${pRec}%`, background: "#94A3B8" }} title={`Thu hồi: ${recSum} (${pRec.toFixed(1)}%)`} />
          </div>
        </div>

        <div className="pt-2 border-top border-outline-subtle d-flex align-items-center justify-content-between" style={{ fontSize: "11.5px" }}>
          <span className="d-flex align-items-center gap-1.5 text-dark fw-medium">
            <span className="d-inline-block rounded-1" style={{ width: "6px", height: "6px", backgroundColor: "#C2410C" }} />
            <span>
              <span className="visually-hidden">CHỨNG TỪ CHỜ DUYỆT GIAO NHẬN QUÁ HẠN </span>
              {totalPendingTasks > 0 ? `${totalPendingTasks} việc chờ xử lý` : "Không có việc tồn đọng"}
            </span>
          </span>
          <Button
            type="button"
            className="btn btn-link p-0 text-primary text-decoration-none fw-medium"
            style={{ fontSize: "11.5px" }}
            onClick={() => openTaskDialog("approval")}
          >
            <span>Xử lý</span> <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
