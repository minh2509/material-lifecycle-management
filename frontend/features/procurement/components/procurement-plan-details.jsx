export function ProcurementPlanDetails({ existingPlan }) {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="p-3 rounded bg-light border border-outline-variant small">
        <div className="d-flex justify-content-between mb-1">
          <span className="text-muted">Nhà cung cấp:</span>
          <span className="fw-semibold text-dark">{existingPlan.supplier}</span>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <span className="text-muted">Ngày ký hợp đồng:</span>
          <span className="font-mono text-dark">{existingPlan.signDate}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="text-muted">Người lập / Người duyệt:</span>
          <span className="fw-medium text-dark">
            {existingPlan.creator || "—"} / {existingPlan.approver || "Chưa duyệt"}
          </span>
        </div>
      </div>

      <div className="p-2.5 rounded bg-primary-subtle bg-opacity-25 border border-primary-subtle small text-dark">
        <strong>Quy tắc nghiệp vụ:</strong> Lưu hoặc duyệt dự trù <strong>chưa làm tăng tồn kho</strong>. Nhập kho sẽ căn cứ vào số lượng đã duyệt để giới hạn các đợt giao hàng.
      </div>

      <h3 className="font-headline fs-6 text-dark m-0">Danh sách dòng vật tư & Tiến độ nhập</h3>
      <div className="border border-outline-variant rounded p-2">
        {existingPlan.items?.map((it, idx) => {
          const remaining = Math.max(0, it.approvedQuantity - (it.importedQuantity || 0));
          const total = it.approvedQuantity * (it.unitPrice || 0);
          return (
            <div key={idx} className="py-2.5 border-bottom border-outline-subtle last-border-0">
              <div className="fw-bold text-dark small">
                {it.name} <span className="code-chip ms-1">{it.code}</span>
              </div>
              <div
                className="d-flex justify-content-between text-muted small mt-1 font-mono"
                style={{ fontSize: "12px" }}
              >
                <span>
                  Đã duyệt: <strong className="text-dark">{it.approvedQuantity} {it.unit}</strong>
                </span>
                <span>
                  Đã nhập: <strong className="text-success">{it.importedQuantity || 0}</strong>
                </span>
                <span>
                  Còn lại: <strong className="text-primary">{remaining} {it.unit}</strong>
                </span>
              </div>
              <div
                className="d-flex justify-content-between text-muted small mt-1"
                style={{ fontSize: "11.5px" }}
              >
                <span>Đơn giá: {it.unitPrice?.toLocaleString("vi-VN")} đ</span>
                <span className="fw-semibold text-dark">
                  Thành tiền: {total.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
