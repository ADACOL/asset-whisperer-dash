import { Progress } from "@/components/ui/progress";
import type { LucideIcon } from "lucide-react";

interface TypeStat {
  type: string;
  total: number;
  certified: number;
  uncertified: number;
  percentage: number;
  icon: LucideIcon;
  color: string;
}

interface AssetTypeBreakdownProps {
  byType: TypeStat[];
}

export function AssetTypeBreakdown({ byType }: AssetTypeBreakdownProps) {
  return (
    <div className="glass-card rounded-lg p-6 animate-fade-in" style={{ animationDelay: "320ms" }}>
      <h2 className="text-lg font-semibold mb-5">Certificate Status by Type</h2>
      <div className="space-y-4">
        {byType.map((item) => (
          <div key={item.type} className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-md shrink-0"
              style={{ backgroundColor: `${item.color}20`, color: item.color }}
            >
              <item.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium truncate">{item.type}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {item.certified}/{item.total}
                </span>
              </div>
              <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="absolute h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
            <span
              className="text-sm font-bold w-12 text-right"
              style={{ color: item.percentage === 100 ? "hsl(var(--success))" : item.percentage < 50 ? "hsl(var(--destructive))" : "hsl(var(--warning))" }}
            >
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
