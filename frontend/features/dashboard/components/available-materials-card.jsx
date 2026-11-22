import { INVENTORY_ITEMS } from "../data/dashboard-demo.js";

export function AvailableMaterialsCard({ filteredInventory, warehouseKey }) {
  return (
    <div className="col-12 col-sm-6 col-xl-3 d-flex">
      <div className="bento-card w-100">
        <div className="d-flex align-items-center justify-content-between">
          <span className="bento-card-title">VẬT TƯ KHẢ DỤNG</span>
          <span className="rounded-1 d-flex align-items-center justify-content-center" style={{ width: "26px", height: "26px", background: "var(--primary-container)", color: "var(--primary)" }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.1" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </span>
        </div>

        <div className="my-auto py-1">
          <div className="d-flex align-items-baseline" style={{ gap: "6px" }}>
            <span className="bento-card-big-num">{filteredInventory.length}</span>
            <span className="text-muted fw-medium" style={{ fontSize: "13px" }}>mã</span>
          </div>
          <p className="text-muted m-0" style={{ fontSize: "12px", marginTop: "3px" }}>
            <span className="visually-hidden">MÃ VẬT TƯ CÓ TỒN KHẢ DỤNG </span>
            {warehouseKey === "all"
              ? `Trên tổng ${INVENTORY_ITEMS.length} mã danh mục`
              : warehouseKey === "main"
                ? "Đang tồn tại Kho chính (100% danh mục)"
                : `Đang lưu tại Phân xưởng (${Math.round((filteredInventory.length / INVENTORY_ITEMS.length) * 100)}% danh mục)`}
          </p>
        </div>

        <div className="pt-2 border-top border-outline-subtle d-flex align-items-center justify-content-between" style={{ fontSize: "11.5px", color: "var(--on-surface-variant)" }}>
          <span className="text-truncate">
            <span>GIÁ TRỊ TỒN KHO: </span>
            <strong className="fw-medium text-slate-600">Chưa có dữ liệu</strong>
          </span>
          <span className="info-tip tip-left cursor-help text-muted ms-1" tabIndex="0">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span className="tip-box">Chưa thiết lập đơn giá hạch toán trong kỳ nên chỉ số tạm thời chưa được tính.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
