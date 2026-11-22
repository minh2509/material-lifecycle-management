export function MonthlyFlowChart({ currentFlow, inSum, outSum, recSum, setChartTooltip }) {
  return (
    <svg viewBox="0 0 680 246" className="w-100 h-100 overflow-visible" preserveAspectRatio="xMidYMid meet">
      {/* Grid Lines */}
      {[0, 15, 30, 45].map((t) => {
        const y = 26 + 174 - (t / 45) * 174;
        return (
          <g key={t}>
            <line x1="34" y1={y} x2="666" y2={y} stroke={t === 0 ? "#CBD5E1" : "#E2E8F0"} strokeDasharray={t === 0 ? "" : "4 4"} strokeWidth="1" />
            <text x="26" y={y + 4} textAnchor="end" fill="#64748B" fontSize="11" fontWeight="500" className="font-mono">{t}</text>
          </g>
        );
      })}

      {/* 3 Categories Boxes */}
      {[
        {
          title: `1. Nhập kho (${inSum})`,
          colorTitle: "#1E3A5F",
          bg: "#F8FAFC",
          border: "#E2E8F0",
          bars: [
            { label: "Nhập mua", val: currentFlow.inBuy, color: "#1E3A5F" },
            { label: "Phục hồi", val: currentFlow.inRec, color: "#3B597C" },
          ],
        },
        {
          title: `2. Xuất kho (${outSum})`,
          colorTitle: "#475569",
          bg: "#F8FAFC",
          border: "#E2E8F0",
          bars: [
            { label: "Xuất SX", val: currentFlow.outProd, color: "#475569" },
            { label: "Sửa chữa", val: currentFlow.outFix, color: "#64748B" },
          ],
        },
        {
          title: `3. Thu hồi (${recSum})`,
          colorTitle: "#64748B",
          bg: "#F8FAFC",
          border: "#E2E8F0",
          bars: [
            { label: "Thu hồi", val: currentFlow.recIn, color: "#94A3B8" },
            { label: "Xuất phế liệu", val: currentFlow.recScrap, color: "#CBD5E1" },
          ],
        },
      ].map((g, gIdx) => {
        const gx = 34 + gIdx * 210;
        const groupW = 196;
        const colCenters = [gx + groupW * 0.31, gx + groupW * 0.69];

        return (
          <g key={g.title}>
            <rect x={gx} y="12" width={groupW} height="188" rx="6" fill={g.bg} stroke={g.border} strokeWidth="1" />
            <text x={gx + groupW / 2} y="26" textAnchor="middle" fill={g.colorTitle} fontSize="11.5" fontWeight="600">{g.title}</text>

            {g.bars.map((b, bIdx) => {
              const cx = colCenters[bIdx];
              const barH = b.val === 0 ? 3 : Math.max(8, (b.val / 45) * 152);
              const by = 26 + 174 - barH;
              const barW = 34;
              const bx = cx - barW / 2;
              const r = Math.min(4, barH / 2);

              return (
                <g
                  key={b.label}
                  className="cursor-pointer"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                    setChartTooltip({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                      singleItem: { label: b.label, val: b.val, color: b.color },
                    });
                  }}
                  onMouseLeave={() => setChartTooltip(null)}
                >
                  <path
                    d={`M ${bx},${by + barH} L ${bx},${by + r} Q ${bx},${by} ${bx + r},${by} L ${bx + barW - r},${by} Q ${bx + barW},${by} ${bx + barW},${by + r} L ${bx + barW},${by + barH} Z`}
                    fill={b.color}
                  />
                  <text x={cx} y={by - 6} textAnchor="middle" fill="#0F172A" fontSize="12" fontWeight="700" className="font-mono">{b.val}</text>
                  <text x={cx} y="218" textAnchor="middle" fill="#475569" fontSize="11.5" fontWeight="500">{b.label}</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
