import { useMemo } from "react";
import type { AssetType } from "@/data/assets";
import { assetTypeColors } from "@/data/assets";

interface TypeStat {
  type: string;
  total: number;
  certified: number;
  color: string;
}

interface CertificateDonutProps {
  byType: TypeStat[];
  score: number;
}

export function CertificateDonut({ byType, score }: CertificateDonutProps) {
  const segments = useMemo(() => {
    const total = byType.reduce((sum, t) => sum + t.total, 0);
    let cumulative = 0;
    return byType.map((item) => {
      const fraction = item.total / total;
      const startAngle = cumulative * 360;
      cumulative += fraction;
      const endAngle = cumulative * 360;
      return { ...item, startAngle, endAngle, fraction };
    });
  }, [byType]);

  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 80;
  const innerR = 55;

  function polarToCart(angleDeg: number, r: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function arcPath(start: number, end: number, outer: number, inner: number) {
    const largeArc = end - start > 180 ? 1 : 0;
    const p1 = polarToCart(start, outer);
    const p2 = polarToCart(end, outer);
    const p3 = polarToCart(end, inner);
    const p4 = polarToCart(start, inner);
    return `M ${p1.x} ${p1.y} A ${outer} ${outer} 0 ${largeArc} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${inner} ${inner} 0 ${largeArc} 0 ${p4.x} ${p4.y} Z`;
  }

  return (
    <div className="glass-card rounded-lg p-6 animate-fade-in flex flex-col items-center" style={{ animationDelay: "240ms" }}>
      <h2 className="text-lg font-semibold mb-4 self-start">Asset Distribution</h2>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg) => (
          <path
            key={seg.type}
            d={arcPath(seg.startAngle, seg.endAngle - 0.5, outerR, innerR)}
            fill={seg.color}
            opacity={0.85}
            className="transition-opacity hover:opacity-100"
          />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" className="fill-foreground text-2xl font-bold" fontSize="28">
          {score}%
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="fill-muted-foreground" fontSize="11">
          Certified
        </text>
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 justify-center">
        {byType.map((item) => (
          <div key={item.type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
            {item.type}
          </div>
        ))}
      </div>
    </div>
  );
}
