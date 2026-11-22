import { MONTHLY_FLOWS } from "../data/dashboard-demo.js";

export function SixMonthChart({ setChartTooltip, warehouseKey }) {
  return (
    <svg viewBox="0 0 680 246" className="w-100 h-100 overflow-visible" preserveAspectRatio="xMidYMid meet">
      {/* Grid Lines */}
      {[0, 15, 30, 45].map((t) => {
        const y = 22 + 190 - (t / 45) * 190;
        return (
          <g key={t}>
            <line x1="34" y1={y} x2="660" y2={y} stroke={t === 0 ? "#CBD5E1" : "#E2E8F0"} strokeDasharray={t === 0 ? "" : "4 4"} strokeWidth="1" />
            <text x="26" y={y + 4} textAnchor="end" fill="#64748B" fontSize="11" fontWeight="500" className="font-mono">{t}</text>
          </g>
        );
      })}

      {/* Monthly curves */}
      {(() => {
        const series = MONTHLY_FLOWS.map((m, idx) => {
          const f = warehouseKey === "main" ? m.main : warehouseKey === "workshop" ? m.workshop : {
            in: m.main.inBuy + m.main.inRec + m.workshop.inBuy + m.workshop.inRec,
            out: m.main.outProd + m.main.outFix + m.workshop.outProd + m.workshop.outFix,
            rec: m.main.recIn + m.main.recScrap + m.workshop.recIn + m.workshop.recScrap,
          };
          const inVal = f.in || f.inBuy + f.inRec;
          const outVal = f.out || f.outProd + f.outFix;
          const recVal = f.rec || f.recIn + f.recScrap;
          const cx = 34 + (idx / 5) * 626;
          const cyIn = 22 + 190 - (inVal / 45) * 190;
          const cyOut = 22 + 190 - (outVal / 45) * 190;
          const cyRec = 22 + 190 - (recVal / 45) * 190;
          return { ...m, cx, cyIn, cyOut, cyRec, inVal, outVal, recVal };
        });

        const buildPath = (key) => {
          return series.reduce((acc, s, i) => {
            if (i === 0) return `M ${s.cx},${s[key]}`;
            const prev = series[i - 1];
            const mx = (prev.cx + s.cx) / 2;
            return `${acc} C ${mx},${prev[key]} ${mx},${s[key]} ${s.cx},${s[key]}`;
          }, "");
        };

        const lineIn = buildPath("cyIn");
        const lineOut = buildPath("cyOut");
        const lineRec = buildPath("cyRec");

        return (
          <>
            <path d={lineIn} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" />
            <path d={lineOut} fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
            <path d={lineRec} fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

            {series.map((s) => (
              <g
                key={s.key}
                className="cursor-pointer"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                  setChartTooltip({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                    title: s.full,
                    inVal: s.inVal,
                    outVal: s.outVal,
                    recVal: s.recVal,
                  });
                }}
                onMouseLeave={() => setChartTooltip(null)}
              >
                <circle cx={s.cx} cy={s.cyIn} r="4" fill="#FFFFFF" stroke="var(--primary)" strokeWidth="2.2" />
                <circle cx={s.cx} cy={s.cyOut} r="4" fill="#FFFFFF" stroke="#475569" strokeWidth="2.2" />
                <circle cx={s.cx} cy={s.cyRec} r="4" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2.2" />
                <text x={s.cx} y="232" textAnchor="middle" fill="#475569" fontSize="11.5" fontWeight="500">{s.label}</text>
              </g>
            ))}
          </>
        );
      })()}
    </svg>
  );
}
