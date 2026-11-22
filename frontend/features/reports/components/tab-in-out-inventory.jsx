import { Table } from "../../../design-system/table/table.jsx";
export function TabInOutInventory() {
  const sampleRows = [
    {
      code: "GL-001",
      name: "Gỗ chèn lò (L=2,3-:-2,5m, fi 5,5:-12cm); gỗ bạch đàn rừng trồng",
      unit: "Mét",
      openingStock: 150,
      inBuy: 60,
      inRecovery: 0,
      inRestored: 0,
      outProd: 15,
      outRepair: 0,
      outScrap: 0,
      adjustment: -2,
      closingStock: 193, // 150 + 60 - 15 - 2 = 193
      docTrace: "PNK-2026-001, PXK-2026-001, DKK-2026-11",
    },
    {
      code: "GL-002",
      name: "Gỗ chống lò (L=2,35-:-2,45m, fi 13-:-19cm); gỗ bạch đàn rừng trồng",
      unit: "Mét",
      openingStock: 80,
      inBuy: 30,
      inRecovery: 10,
      inRestored: 4,
      outProd: 0,
      outRepair: 5,
      outScrap: 2,
      adjustment: 0,
      closingStock: 117, // 80 + (30+10+4) - (0+5+2) = 117
      docTrace: "PNK-2026-001, PNK-2026-002, PSC-2026-001",
    },
    {
      code: "VC-001",
      name: "Ván chèn lò gỗ ép công nghiệp",
      unit: "Tấm",
      openingStock: 120,
      inBuy: 120,
      inRecovery: 0,
      inRestored: 0,
      outProd: 0,
      outRepair: 2,
      outScrap: 15,
      adjustment: 0,
      closingStock: 223, // 120 + 120 - 17 = 223
      docTrace: "HĐ-2026/089-TKV, PSC-2026-001, PXL-2026-001",
    },
  ];

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <div className="small text-muted font-mono">
        Kỳ báo cáo: Tháng 11/2026 • Công thức chuẩn: Cuối kỳ = Đầu kỳ + Tổng nhập − Tổng xuất + Điều chỉnh (S-OLD mục 9.2)
      </div>

      <div className="table-responsive border-0 rounded-0">
        <Table variant="standard" >
          <thead>
            <tr>
              <th style={{ width: "110px" }}>Mã VT</th>
              <th style={{ minWidth: "220px" }}>Tên vật tư</th>
              <th style={{ width: "70px" }}>ĐVT</th>
              <th className="text-end" style={{ width: "90px" }}>Đầu kỳ</th>
              <th className="text-end" style={{ width: "100px" }}>Nhập mua</th>
              <th className="text-end" style={{ width: "100px" }}>Nhập TH/PH</th>
              <th className="text-end" style={{ width: "100px" }}>Xuất SX</th>
              <th className="text-end" style={{ width: "100px" }}>Xuất khác</th>
              <th className="text-end" style={{ width: "90px" }}>Điều chỉnh</th>
              <th className="text-end" style={{ width: "100px" }}>Cuối kỳ</th>
              <th style={{ minWidth: "200px" }}>Chứng từ đối soát</th>
            </tr>
          </thead>
          <tbody>
            {sampleRows.map((r) => (
              <tr key={r.code}>
                <td><span className="code-chip font-mono">{r.code}</span></td>
                <td className="small text-dark fw-medium">{r.name}</td>
                <td className="small text-muted">{r.unit}</td>
                <td className="text-end font-mono text-dark">{r.openingStock}</td>
                <td className="text-end font-mono text-primary fw-semibold">+{r.inBuy}</td>
                <td className="text-end font-mono text-primary">+{r.inRecovery + r.inRestored}</td>
                <td className="text-end font-mono text-secondary fw-semibold">-{r.outProd}</td>
                <td className="text-end font-mono text-secondary">-{r.outRepair + r.outScrap}</td>
                <td className="text-end font-mono">
                  <span className={r.adjustment < 0 ? "text-danger" : "text-muted"}>
                    {r.adjustment !== 0 ? r.adjustment : "0"}
                  </span>
                </td>
                <td className="text-end font-mono fw-bold text-dark fs-6">{r.closingStock}</td>
                <td className="small text-muted font-mono" style={{ fontSize: "11px" }}>{r.docTrace}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
