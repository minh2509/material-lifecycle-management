export function MaterialConditionsCard({ statusCounts }) {
  return (
    <div className="col-12 col-sm-6 col-xl-3 d-flex">
      <div className="bento-card w-100">
        <div className="d-flex align-items-center justify-content-between">
          <span className="bento-card-title">2. Tình trạng sử dụng & xử lý</span>
          <span className="info-tip tip-left cursor-help text-muted" tabIndex="0">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span className="tip-box">Phân loại vòng đời kỹ thuật. Một mã vật tư có thể xuất hiện đồng thời ở nhiều nơi lưu giữ hoặc trạng thái thực tế.</span>
          </span>
        </div>

        <div className="d-flex flex-column gap-1.5 my-auto py-1" style={{ fontSize: "12px" }}>
          <div className="d-flex align-items-center justify-content-between py-1 px-1.5 rounded-1 hover-bg-subtle">
            <span className="d-flex align-items-center gap-2 fw-medium text-dark">
              <span className="d-inline-block rounded-circle" style={{ width: "5px", height: "5px", backgroundColor: "#94A3B8" }} />
              <span>Đang sử dụng</span>
            </span>
            <span className="font-mono fw-semibold text-dark">
              {statusCounts.active} <span className="fw-normal text-muted" style={{ fontSize: "11px" }}>mã</span>
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-between py-1 px-1.5 rounded-1 hover-bg-subtle">
            <span className="d-flex align-items-center gap-2 fw-medium text-dark">
              <span className="d-inline-block rounded-circle" style={{ width: "5px", height: "5px", backgroundColor: "#94A3B8" }} />
              <span>Chờ đánh giá</span>
            </span>
            <span className="font-mono fw-semibold text-dark">
              {statusCounts.eval} <span className="fw-normal text-muted" style={{ fontSize: "11px" }}>mã</span>
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-between py-1 px-1.5 rounded-1 hover-bg-subtle">
            <span className="d-flex align-items-center gap-2 fw-medium text-dark">
              <span className="d-inline-block rounded-circle" style={{ width: "5px", height: "5px", backgroundColor: "#94A3B8" }} />
              <span>Đang sửa chữa</span>
            </span>
            <span className="font-mono fw-semibold text-dark">
              {statusCounts.repair} <span className="fw-normal text-muted" style={{ fontSize: "11px" }}>mã</span>
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-between py-1 px-1.5 rounded-1 hover-bg-subtle">
            <span className="d-flex align-items-center gap-2 fw-medium text-dark">
              <span className="d-inline-block rounded-circle" style={{ width: "5px", height: "5px", backgroundColor: "#94A3B8" }} />
              <span>Phế liệu</span>
            </span>
            <span className="font-mono fw-semibold text-dark">
              {statusCounts.scrap} <span className="fw-normal text-muted" style={{ fontSize: "11px" }}>mã</span>
            </span>
          </div>
        </div>

        <div className="pt-2 border-top border-outline-subtle d-flex align-items-center justify-content-between" style={{ fontSize: "11.5px", color: "var(--on-surface-variant)" }}>
          <span className="text-truncate">* Không phải là số mã duy nhất</span>
          <span className="info-tip tip-left cursor-help text-muted ms-1" tabIndex="0">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span className="tip-box">Một mã vật tư có thể xuất hiện đồng thời ở nhiều nơi lưu giữ hoặc trạng thái kỹ thuật khác nhau.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
