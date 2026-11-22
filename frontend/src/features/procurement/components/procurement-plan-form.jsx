import { Input } from "../../../design-system/input/input.jsx";
import { Textarea } from "../../../design-system/textarea/textarea.jsx";
import { Select } from "../../../design-system/select/select.jsx";
import { Button } from "../../../design-system/button/button.jsx";
import { Icon } from "../../../design-system/icon/icon.jsx";

export function ProcurementPlanForm({ errors, fields, handleAddItem, register, remove }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column gap-3" noValidate>
      <div>
        <label htmlFor="plan-contract-no" className="form-label small fw-semibold text-dark mb-1">
          Số hợp đồng <span className="text-danger">*</span>
        </label>
        <Input variant="compact"
          id="plan-contract-no"
          type="text"
          className={`font-mono ${errors.contractNo ? "is-invalid" : ""}`}
          placeholder="VD: HĐ-2026/095-TKV"
          {...register("contractNo")}
        />
        {errors.contractNo && (
          <div className="invalid-feedback d-block small mt-1">
            {errors.contractNo.message}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="plan-content" className="form-label small fw-semibold text-dark mb-1">
          Nội dung mua sắm <span className="text-danger">*</span>
        </label>
        <Textarea variant="compact"
          id="plan-content"
          className={`${errors.content ? "is-invalid" : ""}`}
          rows="2"
          placeholder="VD: Dự trù mua sắm vật tư chống lò đợt 2"
          {...register("content")}
        />
        {errors.content && (
          <div className="invalid-feedback d-block small mt-1">
            {errors.content.message}
          </div>
        )}
      </div>

      <div className="row g-2">
        <div className="col-7">
          <label htmlFor="plan-supplier" className="form-label small fw-semibold text-dark mb-1">
            Nhà cung cấp <span className="text-danger">*</span>
          </label>
          <Select variant="standard"
            id="plan-supplier"
            className={`w-100 ${errors.supplier ? "is-invalid" : ""}`}
            {...register("supplier")}
          >
            <option value="Công ty CP Lâm sản & Vật tư Than Mỏ">
              Công ty CP Lâm sản & Vật tư Than Mỏ
            </option>
            <option value="Công ty TNHH Cơ khí & Thiết bị Mỏ Quảng Ninh">
              Công ty TNHH Cơ khí & Thiết bị Mỏ Quảng Ninh
            </option>
          </Select>
        </div>
        <div className="col-5">
          <label htmlFor="plan-signdate" className="form-label small fw-semibold text-dark mb-1">
            Ngày ký <span className="text-danger">*</span>
          </label>
          <Input variant="compact"
            id="plan-signdate"
            type="date"
            className={`font-mono ${errors.signDate ? "is-invalid" : ""}`}
            {...register("signDate")}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-2">
        <span className="small fw-semibold text-dark">Danh sách vật tư dự trù:</span>
        <Button type="button" variant="outline" className="py-0" onClick={handleAddItem}>
          <Icon name="plus" size={12} className="me-1" /> Thêm vật tư
        </Button>
      </div>

      {errors.items?.root && (
        <div className="text-danger small">{errors.items.root.message}</div>
      )}

      {fields.map((field, idx) => (
        <div
          key={field.id}
          className="p-2.5 rounded border border-outline-variant bg-light small d-flex flex-column gap-1.5"
        >
          <div className="d-flex justify-content-between">
            <span className="fw-semibold text-dark">
              {field.name} ({field.code})
            </span>
            {fields.length > 1 && (
              <Button
                type="button"
                className="btn btn-link p-0 text-danger"
                onClick={() => remove(idx)}
                aria-label="Xoá dòng vật tư"
              >
                <Icon name="trash" size={14} />
              </Button>
            )}
          </div>
          <div className="row g-2 font-mono">
            <div className="col-6">
              <label htmlFor={`plan-qty-${idx}`} className="text-muted small mb-0.5">
                SL duyệt ({field.unit}) <span className="text-danger">*</span>
              </label>
              <Input variant="compact"
                id={`plan-qty-${idx}`}
                type="number"
                min="1"
                className={`${errors.items?.[idx]?.approvedQuantity ? "is-invalid" : ""}`}
                {...register(`items.${idx}.approvedQuantity`, { valueAsNumber: true })}
              />
              {errors.items?.[idx]?.approvedQuantity && (
                <div className="invalid-feedback d-block small">
                  {errors.items[idx].approvedQuantity.message}
                </div>
              )}
            </div>
            <div className="col-6">
              <label htmlFor={`plan-price-${idx}`} className="text-muted small mb-0.5">
                Đơn giá (đ) <span className="text-danger">*</span>
              </label>
              <Input variant="compact"
                id={`plan-price-${idx}`}
                type="number"
                min="0"
                className={`${errors.items?.[idx]?.unitPrice ? "is-invalid" : ""}`}
                {...register(`items.${idx}.unitPrice`, { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>
      ))}
    </form>
  );
}
