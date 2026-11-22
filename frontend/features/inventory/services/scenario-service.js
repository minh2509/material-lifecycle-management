/**
 * Deterministic demo transaction scenario generator for 18 catalog materials.
 */

export const DEMO_AS_OF = "2026-11-20";

export function buildDemoScenario(items = []) {
  const initialStocks = [];
  const movements = [];

  items.forEach((item, index) => {
    const baseSeed = (index + 1) * 37;
    // Initial stock for Kho A, Kho B, Kho C
    const stockA = ((baseSeed * 11) % 400) + 120;
    const stockB = ((baseSeed * 17) % 300) + 80;
    const stockC = ((baseSeed * 23) % 250) + 60;

    initialStocks.push(
      { materialCode: item.code, warehouse: "Kho A", quantity: stockA },
      { materialCode: item.code, warehouse: "Kho B", quantity: stockB },
      { materialCode: item.code, warehouse: "Kho C", quantity: stockC }
    );

    // Movements in October 2026
    const inQtyOct = ((baseSeed * 9) % 110) + 20;
    const outQtyOct = ((baseSeed * 13) % 80) + 10;
    movements.push(
      { materialCode: item.code, warehouse: "Kho A", date: "2026-10-10", type: "IN", quantity: inQtyOct },
      { materialCode: item.code, warehouse: "Kho B", date: "2026-10-22", type: "OUT", quantity: outQtyOct }
    );

    // Movements in November 2026
    const inQtyA = ((baseSeed * 5) % 150) + 30;
    const outQtyA = ((baseSeed * 7) % 120) + 20;
    const inQtyB = ((baseSeed * 3) % 100) + 20;
    const outQtyB = ((baseSeed * 4) % 90) + 15;

    movements.push(
      { materialCode: item.code, warehouse: "Kho A", date: "2026-11-04", type: "IN", quantity: inQtyA },
      { materialCode: item.code, warehouse: "Kho A", date: "2026-11-12", type: "OUT", quantity: outQtyA },
      { materialCode: item.code, warehouse: "Kho B", date: "2026-11-08", type: "IN", quantity: inQtyB },
      { materialCode: item.code, warehouse: "Kho B", date: "2026-11-18", type: "OUT", quantity: outQtyB }
    );

    // Specifically for GL-001 (Gỗ chèn lò) adjust so total stock is 280 to match UI demo
    if (item.code === "GL-001") {
      initialStocks.find((s) => s.materialCode === "GL-001" && s.warehouse === "Kho A").quantity = 150;
      initialStocks.find((s) => s.materialCode === "GL-001" && s.warehouse === "Kho B").quantity = 80;
      initialStocks.find((s) => s.materialCode === "GL-001" && s.warehouse === "Kho C").quantity = 50;
      // Net movements = 0 for GL-001 so closing = 280
      movements.filter((m) => m.materialCode === "GL-001").forEach((m) => { m.quantity = 0; });
    }
  });

  return { initialStocks, movements, asOf: DEMO_AS_OF };
}
