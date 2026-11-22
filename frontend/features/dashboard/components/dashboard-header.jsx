import styles from "../styles/dashboard.module.css";
import { Select } from "../../../design-system/select/select.jsx";
import { Badge } from "../../../design-system/badge/badge.jsx";
import { Link } from "react-router-dom";

export function DashboardHeader({ currentMonthMeta, periodKey, periods, selectedWarehouse, setSelectedPeriod, setSelectedWarehouse, warehouseDisplayName, warehouseOptions }) {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
      <div className="d-flex align-items-center gap-2">
        <div>
          <div className="d-flex align-items-center gap-2">
            <h1 className={`m-0 font-headline ${styles.title}`}>
              Tổng quan vật tư
            </h1>
            <Badge variant="neutral">Dữ liệu minh hoạ</Badge>
            <span className="info-tip tip-right text-muted cursor-help" tabIndex="0" title="Xem lưu ý">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <span className="tip-box">
                Lưu ý nghiệm thu: Một mã vật tư có thể lưu giữ đồng thời tại Kho chính và khu vực phân xưởng. Mọi chỉ số bên dưới đều đồng bộ 100% theo bộ lọc Kho và Kỳ.
              </span>
            </span>
          </div>
          <p className="text-muted m-0" style={{ fontSize: "12px", marginTop: "2px" }}>
            Bao quát toàn diện các chỉ số trọng yếu · <span>Phạm vi:</span> <strong className="text-dark fw-medium">{warehouseDisplayName}</strong>
            {currentMonthMeta && (
              <>
                {" · "}
                <span>{currentMonthMeta.orderName}</span>
                {" "}
                <span className="badge bg-primary-subtle text-primary" style={{ fontSize: "11px" }}>Mốc đang chọn</span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Global Toolbar: Dropdown Kho + Dropdown Kỳ + Nút Chi tiết tồn kho */}
      <div className="d-flex flex-wrap align-items-center gap-2">
        {/* Dropdown Kho */}
        <div className="position-relative">
          <label htmlFor="globalWarehouse" className="visually-hidden">Chọn kho lọc dữ liệu</label>
          <Select
            id="globalWarehouse"

            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse && setSelectedWarehouse(e.target.value)}
            aria-label="Chọn kho lọc dữ liệu"
            style={{ minWidth: "160px" }}
          >
            {warehouseOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Dropdown Kỳ */}
        <div className="position-relative">
          <label htmlFor="globalPeriod" className="visually-hidden">Chọn kỳ xem dữ liệu</label>
          <Select
            id="globalPeriod"

            value={periodKey}
            onChange={(e) => {
              const found = periods.find((p) => p.key === e.target.value);
              if (found && setSelectedPeriod) setSelectedPeriod(found);
            }}
            aria-label="Chọn kỳ xem dữ liệu"
            style={{ minWidth: "185px" }}
          >
            {periods.map((period) => (
              <option key={period.key} value={period.key}>
                {period.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Nút Primary: Chi tiết tồn kho */}
        <Link
          to="/chi-tiet-ton-kho"
          className="btn-ui-primary"
        >
          <span>Chi tiết tồn kho</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
