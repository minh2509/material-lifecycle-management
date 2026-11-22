import { Link } from "react-router-dom";
import { PrototypePageHeader } from "../../../shared/components/prototype-page-header.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function DemandPlanPage() {
  return (
    <div className="d-flex flex-column gap-4">
      <PrototypePageHeader
        title="Kế hoạch nhu cầu"
        subtitle="Dự báo và tổng hợp nhu cầu sử dụng vật tư của các phân xưởng sản xuất theo kỳ"
        isProposed={true}
        proposedText="Chờ xác nhận phạm vi"
      />

      {/* Tabs liên kết chu trình Mua sắm & Kế hoạch */}
      <div className="d-flex gap-2 border-bottom border-outline-variant pb-2 flex-wrap">
        <Link to="/du-tru" className="btn btn-sm btn-light text-dark">
          Hồ sơ dự trù hợp đồng
        </Link>
        <Link to="/mua-sam" className="btn btn-sm btn-light text-dark">
          Tiến độ thực hiện theo HĐ
        </Link>
        <Link to="/ke-hoach-nhu-cau" className="btn btn-sm btn-primary fw-semibold">
          Kế hoạch nhu cầu
        </Link>
        <Link to="/dinh-muc" className="btn btn-sm btn-light text-dark">
          Định mức kỹ thuật
        </Link>
      </div>

      <div className="p-3.5 rounded bg-warning-subtle bg-opacity-35 border border-warning d-flex gap-2.5">
        <Icon name="warning" size={20} color="var(--warning)" className="flex-shrink-0 mt-0.5" />
        <div className="small">
          <div className="fw-bold text-dark mb-1">[HỎI KHÁCH] Kế hoạch nhu cầu chưa có trong bất kỳ tài liệu khách hàng nào</div>
          <div className="text-secondary" style={{ lineHeight: 1.5 }}>
            Theo rà soát toàn bộ 5 tài liệu nghiệp vụ (bản gốc khách hàng, biên bản 16/10, biên bản 02/11 và đặc tả sau họp):
            Hiện doanh nghiệp chỉ thực hiện chu trình từ <strong>Dự trù mua sắm theo hợp đồng (S-01 mục 5.1)</strong> mà chưa có tài liệu nào quy định về quy trình lập, tổng hợp hay phê duyệt Kế hoạch nhu cầu.
            Hệ thống giữ khung nhìn đồng nhất và hiển thị trạng thái chờ xác nhận, không tự suy đoán quy trình để lấp màn hình.
          </div>
        </div>
      </div>

      <div className="ui-card p-5 text-center d-flex flex-column align-items-center gap-3">
        <div
          className="d-flex align-items-center justify-content-center rounded-circle bg-light border border-outline-variant"
          style={{ width: "64px", height: "64px" }}
        >
          <Icon name="calendar_today" size={32} color="var(--on-surface-muted)" />
        </div>
        <div className="font-headline fs-6 fw-bold text-dark">Chức năng đang chờ xác nhận nghiệp vụ</div>
        <div className="text-muted small max-w-md" style={{ maxWidth: "520px", fontSize: "13px" }}>
          Phân hệ "Kế hoạch nhu cầu" hiện là mục đề xuất trong bộ điều hướng. Khi khách hàng cung cấp căn cứ và quy trình lập kế hoạch (theo tháng/quý/năm hoặc theo tiến độ đào lò), hệ thống sẽ bổ sung biểu mẫu và các chỉ tiêu tương ứng.
        </div>
        <div className="d-flex gap-2 mt-2">
          <span className="ui-badge ui-badge-neutral">Mã câu hỏi: TREO (S-01)</span>
          <span className="ui-badge ui-badge-warning">Trạng thái: DEFERRED</span>
        </div>
      </div>
    </div>
  );
}
