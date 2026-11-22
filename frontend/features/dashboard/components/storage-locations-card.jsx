import { Button } from "../../../design-system/button/button.jsx";
export function StorageLocationsCard({ setSelectedWarehouse, warehouseKey }) {
  return (
    <div className="col-12 col-sm-6 col-xl-3 d-flex">
      <div className="bento-card w-100">
        <div className="d-flex align-items-center justify-content-between">
          <span className="bento-card-title">1. Nơi lưu giữ</span>
          <span className="info-tip tip-left cursor-help text-muted" tabIndex="0">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span className="tip-box">Phân xưởng nhận vật tư trực tiếp tại kho, không có khâu giao nhận trung gian. Bấm vào từng dòng để lọc nhanh theo kho.</span>
          </span>
        </div>

        <div className="d-flex flex-column gap-1.5 my-auto py-1">
          {/* Dòng Kho chính */}
          <Button
            type="button"
            onClick={() => setSelectedWarehouse && setSelectedWarehouse(warehouseKey === "main" ? "all" : "kho-chinh")}
            className={`w-100 text-start px-2 py-1.5 rounded-1 border-0 transition-all ${warehouseKey === "main" ? "bg-primary-subtle ring-1 ring-primary" : "bg-transparent hover-bg-subtle"}`}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-1" style={{ fontSize: "12px" }}>
              <span className="d-flex align-items-center gap-1.5 fw-medium text-dark text-truncate">
                <span className="d-inline-block rounded-1" style={{ width: "6px", height: "6px", background: "var(--primary)" }} />
                <span className="text-truncate">Kho vật tư (Kho chính)</span>
              </span>
              <span className="fw-semibold text-dark ms-2 shrink-0 font-mono">
                18 <span className="fw-normal text-muted" style={{ fontSize: "11px" }}>(60%)</span>
              </span>
            </div>
            <div className="w-100 overflow-hidden" style={{ height: "5px", background: "#f1f5f9", borderRadius: "3px" }}>
              <div className="h-100" style={{ width: "60%", background: "var(--primary)", borderRadius: "3px", transition: "width 0.3s ease" }} />
            </div>
          </Button>

          {/* Dòng Phân xưởng */}
          <Button
            type="button"
            onClick={() => setSelectedWarehouse && setSelectedWarehouse(warehouseKey === "workshop" ? "all" : "phan-xuong")}
            className={`w-100 text-start px-2 py-1.5 rounded-1 border-0 transition-all ${warehouseKey === "workshop" ? "bg-info-subtle ring-1 ring-info" : "bg-transparent hover-bg-subtle"}`}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-1" style={{ fontSize: "12px" }}>
              <span className="d-flex align-items-center gap-1.5 fw-medium text-dark text-truncate">
                <span className="d-inline-block rounded-1" style={{ width: "6px", height: "6px", background: "var(--info)" }} />
                <span className="text-truncate">Phân xưởng sản xuất</span>
              </span>
              <span className="fw-semibold text-dark ms-2 shrink-0 font-mono">
                12 <span className="fw-normal text-muted" style={{ fontSize: "11px" }}>(40%)</span>
              </span>
            </div>
            <div className="w-100 overflow-hidden" style={{ height: "5px", background: "#f1f5f9", borderRadius: "3px" }}>
              <div className="h-100" style={{ width: "40%", background: "var(--info)", borderRadius: "3px", transition: "width 0.3s ease" }} />
            </div>
          </Button>
        </div>

        <div className="pt-2 border-top border-outline-subtle d-flex align-items-center justify-content-between" style={{ fontSize: "11.5px", color: "var(--on-surface-variant)" }}>
          <span className="text-truncate">THAO TÁC: Bấm dòng để lọc kho</span>
          <span className="text-primary fw-medium" style={{ fontSize: "11px" }}>Hai chiều</span>
        </div>
      </div>
    </div>
  );
}
