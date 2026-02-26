import { Shield, Monitor, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface StatsCardsProps {
  total: number;
  certified: number;
  uncertified: number;
  notChecked: number;
  score: number;
  onTotalClick?: () => void;
  onCertifiedClick?: () => void;
  onUncertifiedClick?: () => void;
  onNotCheckedClick?: () => void;
}

export function StatsCards({ total, certified, uncertified, notChecked, score, onTotalClick, onCertifiedClick, onUncertifiedClick, onNotCheckedClick }: StatsCardsProps) {
  const cards = [
    { label: "Total Assets", value: total, icon: Monitor, accent: "primary" as const, onClick: onTotalClick },
    { label: "Certificate Score", value: `${score}%`, icon: Shield, accent: "primary" as const, onClick: undefined },
    { label: "Certified", value: certified, icon: CheckCircle2, accent: "success" as const, onClick: onCertifiedClick },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.label}
          onClick={card.onClick}
          className={`glass-card rounded-lg p-5 flex items-center gap-4 animate-fade-in ${
            card.onClick ? "cursor-pointer hover:ring-1 hover:ring-primary/40 transition-all" : ""
          }`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div
            className={`flex items-center justify-center w-11 h-11 rounded-lg ${
              card.accent === "success"
                ? "bg-success/15 text-success"
                : "bg-primary/15 text-primary"
            }`}
          >
            <card.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="text-2xl font-bold tracking-tight">{card.value}</p>
          </div>
        </div>
      ))}
      {/* Not Certified + Not Checked combined card */}
      <div
        className="glass-card rounded-lg p-5 animate-fade-in flex gap-4"
        style={{ animationDelay: `${cards.length * 80}ms` }}
      >
        <div
          onClick={onUncertifiedClick}
          className="flex-1 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-destructive/15 text-destructive">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Not Certified</p>
            <p className="text-2xl font-bold tracking-tight">{uncertified}</p>
          </div>
        </div>
        <div className="w-px bg-border/50" />
        <div
          onClick={onNotCheckedClick}
          className="flex-1 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-warning/15 text-warning">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Not Checked</p>
            <p className="text-2xl font-bold tracking-tight">{notChecked}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
