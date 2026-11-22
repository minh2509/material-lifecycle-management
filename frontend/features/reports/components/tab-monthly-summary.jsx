import { Table } from "../../../design-system/table/table.jsx";
export function TabMonthlySummary() {
  const months = [
    { period: "Tháng 06/2026", inBuy: 28, inRec: 8, inFix: 4, outProd: 20, outFix: 4, outScrap: 2 },
    { period: "Tháng 07/2026", inBuy: 32, inRec: 9, inFix: 4, outProd: 19, outFix: 4, outScrap: 2 },
    { period: "Tháng 08/2026", inBuy: 30, inRec: 10, inFix: 3, outProd: 21, outFix: 4, outScrap: 3 },
    { period: "Tháng 09/2026", inBuy: 35, inRec: 10, inFix: 4, outProd: 18, outFix: 3, outScrap: 2 },
    { period: "Tháng 10/2026", inBuy: 34, inRec: 10, inFix: 3, outProd: 20, outFix: 4, outScrap: 3 },
    { period: "Tháng 11/2026", inBuy: 37, inRec: 11, inFix: 4, outProd: 22, outFix: 4, outScrap: 3 },
  ];

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <div className="small text-muted font-mono">
        Thống kê số lượng chứng từ phát sinh theo 6 tháng gần nhất • Phân rã 6 luồng vận hành (KH-GỐC mục 4.3)
      </div>

      <div className="table-responsive border-0 rounded-0">
        <Table variant="standard" >
          <thead>
            <tr>
              <th style={{ minWidth: "150px" }}>Kỳ tháng</th>
              <th className="text-end" style={{ width: "120px" }}>Nhập mua</th>
              <th className="text-end" style={{ width: "120px" }}>Nhập thu hồi</th>
              <th className="text-end" style={{ width: "120px" }}>Nhập phục hồi</th>
              <th className="text-end" style={{ width: "120px" }}>Xuất sản xuất</th>
              <th className="text-end" style={{ width: "120px" }}>Xuất sửa chữa</th>
              <th className="text-end" style={{ width: "120px" }}>Xuất phế liệu</th>
              <th className="text-end" style={{ width: "130px" }}>Tổng chứng từ</th>
            </tr>
          </thead>
          <tbody>
            {months.map((m) => {
              const total = m.inBuy + m.inRec + m.inFix + m.outProd + m.outFix + m.outScrap;
              return (
                <tr key={m.period}>
                  <td className="fw-semibold text-dark small">{m.period}</td>
                  <td className="text-end font-mono text-dark">{m.inBuy}</td>
                  <td className="text-end font-mono text-dark">{m.inRec}</td>
                  <td className="text-end font-mono text-dark">{m.inFix}</td>
                  <td className="text-end font-mono text-dark">{m.outProd}</td>
                  <td className="text-end font-mono text-dark">{m.outFix}</td>
                  <td className="text-end font-mono text-dark">{m.outScrap}</td>
                  <td className="text-end font-mono fw-bold text-primary">{total}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
