import styles from "../styles/dashboard.module.css";
import { Button } from "../../../design-system/button/button.jsx";
import { MonthlyFlowChart } from "./monthly-flow-chart.jsx";
import { SixMonthChart } from "./six-month-chart.jsx";
import { MovementSummary } from "./movement-summary.jsx";

export function DashboardMovements({ chartTooltip, currentFlow, currentMonthMeta, handleToggleSegment, inSum, isSixMonthMode, outSum, recSum, setChartTooltip, warehouseDisplayName, warehouseKey }) {
  return (
    <div className="col-12 col-lg-7">
      <div className={`bento-card p-4 h-100 ${styles.movementCard}`}>

        {/* Header + Segmented Switch */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
          <div>
            <h2 className="m-0 font-headline" style={{ fontSize: "15.5px", fontWeight: "600", color: "#262626" }}>
              Biến động nhập – xuất – thu hồi
              <span className="visually-hidden"> theo thời gian</span>
            </h2>
            <p className="text-muted m-0" style={{ fontSize: "12px", marginTop: "2px" }}>
              {isSixMonthMode ? "6 tháng (06–11/2026)" : currentMonthMeta?.full || "Kỳ chọn"} · {warehouseDisplayName}
            </p>
          </div>

          {/* Segmented Control */}
          <div className="segmented-control align-self-start align-self-sm-auto">
            <Button
              type="button"
              onClick={() => handleToggleSegment("month")}
              className={`segmented-control-btn ${!isSixMonthMode ? "active" : ""}`}
            >
              Theo tháng
            </Button>
            <Button
              type="button"
              onClick={() => handleToggleSegment("6m")}
              className={`segmented-control-btn ${isSixMonthMode ? "active" : ""}`}
            >
              6 tháng
            </Button>
          </div>
        </div>

        {/* 3 Metric Summary Pills */}
        <MovementSummary currentFlow={currentFlow} inSum={inSum} outSum={outSum} recSum={recSum} />

        <div
          className={`position-relative flex-grow-1 w-100 ${styles.chart}`}
          role="img"
          aria-label="Biểu đồ biến động vật tư 6 tháng"
        >
          {isSixMonthMode ? (
            /* 6-Month Clean Multi-Line Chart (No Gradients) */
            <SixMonthChart setChartTooltip={setChartTooltip} warehouseKey={warehouseKey} />
          ) : (
            /* Single Month Grouped Bar Chart */
            <MonthlyFlowChart currentFlow={currentFlow} inSum={inSum} outSum={outSum} recSum={recSum} setChartTooltip={setChartTooltip} />
          )}

          {/* Floating Tooltip */}
          {chartTooltip && (
            <div
              className="position-absolute bg-dark text-white rounded-3 px-3 py-2 text-start pointer-events-none"
              style={{
                left: `${Math.min(chartTooltip.x + 10, 520)}px`,
                top: `${Math.max(chartTooltip.y - 60, 10)}px`,
                fontSize: "11.5px",
                boxShadow: "var(--shadow-tooltip)",
                zIndex: 30,
                minWidth: "140px",
              }}
            >
              {chartTooltip.singleItem ? (
                <div>
                  <div className="d-flex align-items-center gap-1.5 fw-semibold mb-1">
                    <span className="d-inline-block rounded-circle" style={{ width: "8px", height: "8px", background: chartTooltip.singleItem.color }} />
                    <span>{chartTooltip.singleItem.label}</span>
                  </div>
                  <div className="text-white-50">{chartTooltip.singleItem.val} chứng từ</div>
                </div>
              ) : (
                <div>
                  <div className="fw-semibold text-white mb-1 border-bottom border-white-50 pb-1">{chartTooltip.title}</div>
                  <div className="d-flex justify-content-between gap-3 text-white-50">
                    <span>Nhập kho:</span> <strong className="text-white">{chartTooltip.inVal}</strong>
                  </div>
                  <div className="d-flex justify-content-between gap-3 text-white-50">
                    <span>Xuất kho:</span> <strong className="text-white">{chartTooltip.outVal}</strong>
                  </div>
                  <div className="d-flex justify-content-between gap-3 text-white-50">
                    <span>Thu hồi:</span> <strong className="text-white">{chartTooltip.recVal}</strong>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 6 Luồng nghiệp vụ kho chi tiết */}
        <div className="d-flex flex-wrap align-items-center justify-content-between pt-2 border-top border-outline-subtle text-muted mt-2" style={{ fontSize: "11px", gap: "8px" }}>
          <div className="d-flex align-items-center" style={{ gap: "4px" }}>
            <span className="d-inline-block rounded-1" style={{ width: "6px", height: "6px", background: "#1E3A5F" }} />
            <span>Nhập mua</span> <span className="font-mono">({currentFlow.inBuy})</span>
          </div>
          <div className="d-flex align-items-center" style={{ gap: "4px" }}>
            <span className="d-inline-block rounded-1" style={{ width: "6px", height: "6px", background: "#3B597C" }} />
            <span>Nhập vật tư phục hồi</span> <span className="font-mono">({currentFlow.inRec})</span>
          </div>
          <div className="d-flex align-items-center" style={{ gap: "4px" }}>
            <span className="d-inline-block rounded-1" style={{ width: "6px", height: "6px", background: "#475569" }} />
            <span>Xuất cho sản xuất</span> <span className="font-mono">({currentFlow.outProd})</span>
          </div>
          <div className="d-flex align-items-center" style={{ gap: "4px" }}>
            <span className="d-inline-block rounded-1" style={{ width: "6px", height: "6px", background: "#64748B" }} />
            <span>Xuất sửa chữa</span> <span className="font-mono">({currentFlow.outFix})</span>
          </div>
          <div className="d-flex align-items-center" style={{ gap: "4px" }}>
            <span className="d-inline-block rounded-1" style={{ width: "6px", height: "6px", background: "#94A3B8" }} />
            <span>Nhập vật tư thu hồi</span> <span className="font-mono">({currentFlow.recIn})</span>
          </div>
          <div className="d-flex align-items-center" style={{ gap: "4px" }}>
            <span className="d-inline-block rounded-1" style={{ width: "6px", height: "6px", background: "#CBD5E1" }} />
            <span>Xuất phế liệu</span> <span className="font-mono">({currentFlow.recScrap})</span>
          </div>
        </div>

      </div>
    </div>
  );
}
