export function MovementSummary({ currentFlow, inSum, outSum, recSum }) {
  return (
    <div className="row g-2.5 my-3">
      {/* Nhập kho */}
      <div className="col-12 col-sm-4">
        <div className="metric-summary-box">
          <div className="metric-summary-icon" style={{ background: "#F1F5F9", color: "#1E3A5F" }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
    </svg>
          </div>
          <div className="min-w-0">
            <div className="d-flex align-items-baseline" style={{ gap: "6px" }}>
              <span className="text-muted fw-medium" style={{ fontSize: "11.5px" }}>Nhập kho</span>
              <span className="fw-bold text-dark font-mono" style={{ fontSize: "16px" }}>{inSum}</span>
            </div>
            <p className="text-muted text-truncate m-0" style={{ fontSize: "11px" }}>
              <span className="visually-hidden">Nhập mua</span>
              <span>Mua {currentFlow.inBuy}</span> · <span className="visually-hidden">Nhập vật tư phục hồi</span>
              <span>Phục hồi {currentFlow.inRec}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Xuất kho */}
      <div className="col-12 col-sm-4">
        <div className="metric-summary-box">
          <div className="metric-summary-icon" style={{ background: "#F1F5F9", color: "#475569" }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
    </svg>
          </div>
          <div className="min-w-0">
            <div className="d-flex align-items-baseline" style={{ gap: "6px" }}>
              <span className="text-muted fw-medium" style={{ fontSize: "11.5px" }}>Xuất kho</span>
              <span className="fw-bold text-dark font-mono" style={{ fontSize: "16px" }}>{outSum}</span>
            </div>
            <p className="text-muted text-truncate m-0" style={{ fontSize: "11px" }}>
              <span className="visually-hidden">Xuất cho sản xuất</span>
              <span>Sản xuất {currentFlow.outProd}</span> · <span className="visually-hidden">Xuất sửa chữa</span>
              <span>Sửa chữa {currentFlow.outFix}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Thu hồi */}
      <div className="col-12 col-sm-4">
        <div className="metric-summary-box">
          <div className="metric-summary-icon" style={{ background: "#F1F5F9", color: "#64748B" }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="d-flex align-items-baseline" style={{ gap: "6px" }}>
              <span className="text-muted fw-medium" style={{ fontSize: "11.5px" }}>Thu hồi</span>
              <span className="fw-bold text-dark font-mono" style={{ fontSize: "16px" }}>{recSum}</span>
            </div>
            <p className="text-muted text-truncate m-0" style={{ fontSize: "11px" }}>
              <span className="visually-hidden">Nhập vật tư thu hồi</span>
              <span>Thu hồi {currentFlow.recIn}</span> · <span className="visually-hidden">Xuất phế liệu</span>
              <span>Phế liệu {currentFlow.recScrap}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
