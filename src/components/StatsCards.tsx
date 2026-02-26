import { Shield, Monitor, CheckCircle2, XCircle } from "lucide-react";

interface StatsCardsProps {
  total: number;
  certified: number;
  uncertified: number;
  score: number;
  onTotalClick?: () => void;
}

export function StatsCards({ total, certified, uncertified, score, onTotalClick }: StatsCardsProps) {
  const cards = [
    { label: "Total Assets", value: total, icon: Monitor, accent: "primary" as const, clickable: true },
    { label: "Certificate Score", value: `${score}%`, icon: Shield, accent: "primary" as const, clickable: false },
    { label: "Certified", value: certified, icon: CheckCircle2, accent: "success" as const, clickable: false },
    { label: "Not Certified", value: uncertified, icon: XCircle, accent: "destructive" as const, clickable: false },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.label}
          onClick={card.clickable ? onTotalClick : undefined}
          className={`glass-card rounded-lg p-5 flex items-center gap-4 animate-fade-in ${
            card.clickable ? "cursor-pointer hover:ring-1 hover:ring-primary/40 transition-all" : ""
          }`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div
            className={`flex items-center justify-center w-11 h-11 rounded-lg ${
              card.accent === "success"
                ? "bg-success/15 text-success"
                : card.accent === "destructive"
                ? "bg-destructive/15 text-destructive"
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
