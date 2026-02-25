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
  const topRow = byType.filter(i => ["Server Peda", "Desktop Peda", "Desktop Admin"].includes(i.type));

  // Merge Laptop + Other into one combined card
  const laptopStat = byType.find(i => i.type === "Laptop");
  const otherStat = byType.find(i => i.type === "Other");
  const combinedTotal = (laptopStat?.total ?? 0) + (otherStat?.total ?? 0);
  const combinedCertified = (laptopStat?.certified ?? 0) + (otherStat?.certified ?? 0);
  const combinedPercentage = combinedTotal > 0 ? Math.round((combinedCertified / combinedTotal) * 100) : 0;

  const renderCard = (item: TypeStat) => {
    const isSelected = selectedType === item.type;
    return (
      <button
        key={item.type}
        onClick={() => onSelectType(isSelected ? null : item.type as AssetType)}
        className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all cursor-pointer ${
          isSelected
            ? "border-primary bg-primary/10 ring-1 ring-primary/30"
            : "border-border/50 bg-muted/30 hover:bg-muted/60 hover:border-border"
        }`}
      >
        <div
          className="flex items-center justify-center w-9 h-9 rounded-md shrink-0"
          style={{ backgroundColor: `${item.color}20`, color: item.color }}
        >
          <item.icon className="w-4 h-4" />
        </div>
        <span className="text-xs font-medium text-center leading-tight">{item.type}</span>
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold">{item.certified}</span>
          <span className="text-xs text-muted-foreground">/{item.total}</span>
        </div>
        <div className="relative h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="absolute h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
          />
        </div>
        <span
          className="text-xs font-semibold"
          style={{ color: item.percentage === 100 ? "hsl(var(--success))" : item.percentage < 50 ? "hsl(var(--destructive))" : "hsl(var(--warning))" }}
        >
          {item.percentage}%
        </span>
      </button>
    );
  };

  return (
    <div className="glass-card rounded-lg p-6 animate-fade-in" style={{ animationDelay: "320ms" }}>
      <h2 className="text-lg font-semibold mb-4">Certificate Status by Type</h2>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {topRow.map(renderCard)}
        </div>
        {laptopStat && otherStat && (
          <button
            onClick={() => {
              // Toggle: if either is selected, clear; otherwise we can't select both, so just show all
              if (selectedType === "Laptop" || selectedType === "Other") {
                onSelectType(null);
              }
            }}
            className={`flex items-center gap-4 p-3 rounded-lg border transition-all cursor-default ${
              "border-border/50 bg-muted/30"
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex -space-x-1">
                <div className="flex items-center justify-center w-8 h-8 rounded-md" style={{ backgroundColor: `${laptopStat.color}20`, color: laptopStat.color }}>
                  <laptopStat.icon className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-md" style={{ backgroundColor: `${otherStat.color}20`, color: otherStat.color }}>
                  <otherStat.icon className="w-4 h-4" />
                </div>
              </div>
              <span className="text-xs font-medium">Laptop & Other</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold">{combinedCertified}</span>
              <span className="text-xs text-muted-foreground">/{combinedTotal}</span>
            </div>
            <div className="flex flex-col items-end gap-1 min-w-[60px]">
              <div className="relative h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="absolute h-full rounded-full transition-all duration-700 ease-out bg-primary"
                  style={{ width: `${combinedPercentage}%` }}
                />
              </div>
              <span
                className="text-xs font-semibold"
                style={{ color: combinedPercentage === 100 ? "hsl(var(--success))" : combinedPercentage < 50 ? "hsl(var(--destructive))" : "hsl(var(--warning))" }}
              >
                {combinedPercentage}%
              </span>
            </div>
          </button>
        )}
      </div>
      {selectedType && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Showing <span className="text-foreground font-medium">{selectedType}</span> in table below
        </p>
      )}
    </div>
  );
}
