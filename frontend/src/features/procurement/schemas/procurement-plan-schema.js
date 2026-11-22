import { z } from "zod";

export const procurementPlanSchema = z.object({
  contractNo: z.string().trim().min(1, "Vui lòng nhập số hợp đồng"),
  content: z.string().trim().min(1, "Vui lòng nhập nội dung mua sắm"),
  supplier: z.string().trim().min(1, "Vui lòng chọn nhà cung cấp"),
  signDate: z.string().min(1, "Vui lòng chọn ngày ký"),
  items: z
    .array(
      z.object({
        code: z.string().min(1, "Thiếu mã vật tư"),
        name: z.string().min(1, "Thiếu tên vật tư"),
        unit: z.string().min(1, "Thiếu đơn vị tính"),
        approvedQuantity: z.coerce.number().positive("Số lượng duyệt phải lớn hơn 0"),
        unitPrice: z.coerce.number().min(0, "Đơn giá không thể âm"),
      })
    )
    .min(1, "Cần có ít nhất một dòng vật tư"),
});
