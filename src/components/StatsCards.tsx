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
  onScoreClick?: () => void;
}

export function StatsCards({ total, certified, uncertified, notChecked, score, onTotalClick, onCertifiedClick, onUncertifiedClick, onNotCheckedClick, onScoreClick }: StatsCardsProps) {
  const cards = [
    { label: "Total Assets", value: total, icon: Monitor, accent: "primary" as const, onClick: onTotalClick },
    { label: "Certificate Score", value: `${score}%`, icon: Shield, accent: "primary" as const, onClick: onScoreClick },
    { label: "Certified", value: certified, icon: CheckCircle2, accent: "success" as const, onClick: onCertifiedClick },
    { label: "Not Certified", value: uncertified, icon: XCircle, accent: "destructive" as const, onClick: onUncertifiedClick },
    { label: "Not Checked", value: notChecked, icon: AlertTriangle, accent: "warning" as const, onClick: onNotCheckedClick },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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
                : card.accent === "destructive"
                ? "bg-destructive/15 text-destructive"
                : card.accent === "warning"
                ? "bg-warning/15 text-warning"
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
    </div>
  );
}
