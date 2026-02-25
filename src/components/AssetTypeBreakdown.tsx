import type { LucideIcon } from "lucide-react";
import type { AssetType } from "@/data/assets";

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
  selectedType: AssetType | null;
  onSelectType: (type: AssetType | null) => void;
}

export function AssetTypeBreakdown({ byType, selectedType, onSelectType }: AssetTypeBreakdownProps) {
  return (
    <div className="glass-card rounded-lg p-6 animate-fade-in" style={{ animationDelay: "320ms" }}>
      <h2 className="text-lg font-semibold mb-5">Certificate Status by Type</h2>
      <div className="space-y-4">
        {byType.map((item) => {
          const isSelected = selectedType === item.type;
          return (
            <button
              key={item.type}
              onClick={() => onSelectType(isSelected ? null : item.type as AssetType)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all cursor-pointer ${
                isSelected
                  ? "bg-primary/10 ring-1 ring-primary/30"
                  : "hover:bg-muted/40"
              }`}
            >
              <div
                className="flex items-center justify-center w-8 h-8 rounded-md shrink-0"
                style={{ backgroundColor: `${item.color}20`, color: item.color }}
              >
                <item.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{item.type}</span>
                  <span className="text-xs text-muted-foreground">{item.certified}/{item.total}</span>
                </div>
                <div className="relative h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="absolute h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
              <span
                className="text-sm font-bold min-w-[40px] text-right"
                style={{ color: item.percentage === 100 ? "hsl(var(--success))" : item.percentage < 50 ? "hsl(var(--destructive))" : "hsl(var(--warning))" }}
              >
                {item.percentage}%
              </span>
            </button>
          );
        })}
      </div>
      {selectedType && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Showing <span className="text-foreground font-medium">{selectedType}</span> in table below
        </p>
      )}
    </div>
  );
}
