import { Button } from "../../../design-system/button/button.jsx";
import { ProcurementPlanDetails } from "./procurement-plan-details.jsx";
import { ProcurementPlanForm } from "./procurement-plan-form.jsx";
import { procurementPlanSchema } from "../schemas/procurement-plan-schema.js";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Icon } from "../../../design-system/icon/icon.jsx";
import { showAppToast } from "../../../shared/utils/toast-service.js";

export function ProcurementPlanDrawer({ show, onClose, onSave, onApprove, existingPlan = null }) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(procurementPlanSchema),
    defaultValues: {
      contractNo: "",
      content: "",
      supplier: "Công ty CP Lâm sản & Vật tư Than Mỏ",
      signDate: new Date().toISOString().slice(0, 10),
      items: [
        {
          code: "GL-001",
          name: "Gỗ chèn lò (L=2,3-:-2,5m, fi 5,5:-12cm); gỗ bạch đàn rừng trồng",
          unit: "Mét",
          approvedQuantity: 50,
          unitPrice: 45000,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    if (show && !existingPlan) {
      reset({
        contractNo: "",
        content: "",
        supplier: "Công ty CP Lâm sản & Vật tư Than Mỏ",
        signDate: new Date().toISOString().slice(0, 10),
        items: [
          {
            code: "GL-001",
            name: "Gỗ chèn lò (L=2,3-:-2,5m, fi 5,5:-12cm); gỗ bạch đàn rừng trồng",
            unit: "Mét",
            approvedQuantity: 50,
            unitPrice: 45000,
          },
        ],
      });
    }
  }, [show, existingPlan, reset]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!show) return null;

  const handleAddItem = () => {
    append({
      code: "VC-001",
      name: "Ván chèn lò gỗ ép",
      unit: "Tấm",
      approvedQuantity: 20,
      unitPrice: 32000,
    });
  };

  const onSubmit = (data, status) => {
    const newPlan = {
      contractNo: data.contractNo.trim(),
      content: data.content.trim(),
      supplier: data.supplier,
      signDate: data.signDate,
      status,
      creator: "Phạm Văn Bình",
      approver: status === "Duyệt" ? "Nguyễn Văn An" : null,
      attachments: ["hop-dong-dinh-kem.pdf"],
      items: data.items,
    };
    onSave(newPlan);
    showAppToast(
      status === "Duyệt" ? "Đã lưu và phê duyệt dự trù mua sắm thành công!" : "Đã lưu hồ sơ dự trù ở trạng thái Khởi tạo!",
      "success"
    );
    onClose();
  };

  const onInvalid = () => {
    showAppToast("Vui lòng nhập đầy đủ Số hợp đồng và Nội dung dự trù hợp lệ!", "error");
  };

  const handleSaveWithStatus = (status) => {
    handleSubmit((data) => onSubmit(data, status), onInvalid)();
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="drawer-right" role="dialog" aria-modal="true" style={{ maxWidth: "600px" }}>
        <div className="px-4 py-3 border-bottom border-outline-variant d-flex align-items-center justify-content-between">
          <div>
            <h2 className="font-headline fs-6 m-0 text-dark">
              {existingPlan ? `Hồ sơ dự trù: ${existingPlan.id}` : "Lập hồ sơ dự trù mua sắm"}
            </h2>
            <div className="text-muted small" style={{ fontSize: "12px" }}>
              {existingPlan
                ? `Hợp đồng: ${existingPlan.contractNo} • Trạng thái: ${existingPlan.status}`
                : "Nhập đầy đủ thông tin từ hồ sơ hợp đồng thực tế (React Hook Form + Zod)"}
            </div>
          </div>
          <Button
            type="button"
            className="btn btn-link p-1 text-secondary"
            onClick={onClose}
            aria-label="Đóng"
          >
            <Icon name="close" size={20} />
          </Button>
        </div>

        <div className="p-4 flex-grow-1 overflow-y-auto d-flex flex-column gap-3">
          {existingPlan ? (
            <ProcurementPlanDetails existingPlan={existingPlan} />
          ) : (
            <ProcurementPlanForm errors={errors} fields={fields} handleAddItem={handleAddItem} register={register} remove={remove} />
          )}
        </div>

        <div className="px-4 py-3 bg-light border-top border-outline-variant d-flex justify-content-between align-items-center">
          <Button type="button" variant="secondary" onClick={onClose}>
            Đóng
          </Button>
          {existingPlan ? (
            existingPlan.status === "Khởi tạo" && (
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  onApprove(existingPlan.id);
                  onClose();
                }}
              >
                Phê duyệt hồ sơ
              </Button>
            )
          ) : (
            <div className="d-flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleSaveWithStatus("Khởi tạo")}
              >
                Lưu (Khởi tạo)
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={() => handleSaveWithStatus("Duyệt")}
              >
                Lưu và Duyệt
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
