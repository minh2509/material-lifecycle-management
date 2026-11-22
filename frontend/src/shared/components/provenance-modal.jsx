import { Button } from "../../design-system/button/button.jsx";
import { Modal } from "../../design-system/modal/modal.jsx";
import { Icon } from "../../design-system/icon/icon.jsx";

export function ProvenanceModal({ show, onHide, provenance }) {
  if (!provenance) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="border-bottom border-outline-variant px-4 py-3">
        <Modal.Title className="font-headline fs-6 m-0 d-flex align-items-center gap-2">
          <Icon name="info" size={18} color="#1E3A5F" />
          <span>Truy xuất nguồn gốc dữ liệu minh hoạ</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4 d-flex flex-column gap-3 font-body">
        <div className="p-3 rounded bg-light border border-outline-variant">
          <div className="fw-semibold text-primary mb-1">Nguồn gốc danh mục vật tư:</div>
          <div className="text-secondary small">
            Tệp nguồn: <code>docs/reference/danh-sach-vat-tu-khach-hang.xlsx</code>
          </div>
          <div className="text-secondary small text-break">
            Mã băm SHA256: <code className="font-mono">{provenance.source?.sha256 || "N/A"}</code>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-sm-6">
            <div className="p-3 border rounded border-outline-variant">
              <div className="text-muted small">Số vật tư hợp lệ:</div>
              <div className="fs-5 fw-bold font-headline text-success">
                {provenance.counts?.admitted || 18} vật tư
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="p-3 border rounded border-outline-variant">
              <div className="text-muted small">Phạm vi thời gian nạp:</div>
              <div className="fs-6 fw-semibold font-mono text-dark">
                {provenance.generated_at ? new Date(provenance.generated_at).toLocaleString("vi-VN") : "20/11/2026"}
              </div>
            </div>
          </div>
        </div>

        <div className="small text-muted border-top pt-3">
          Lưu ý: Toàn bộ số phát sinh nhập/xuất là dữ liệu mô phỏng phục vụ đánh giá giao diện, không đại diện cho dữ liệu kế toán thực tế của doanh nghiệp.
        </div>
      </Modal.Body>
      <Modal.Footer className="border-top border-outline-variant px-4 py-2">
        <Button type="button" variant="primary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
