import { Shield, Monitor, CheckCircle2, XCircle } from "lucide-react";

interface StatsCardsProps {
  total: number;
  certified: number;
  uncertified: number;
  score: number;
}

export function StatsCards({ total, certified, uncertified, score }: StatsCardsProps) {
  const cards = [
    { label: "Total Assets", value: total, icon: Monitor, accent: "primary" as const },
    { label: "Certificate Score", value: `${score}%`, icon: Shield, accent: "primary" as const },
    { label: "Certified", value: certified, icon: CheckCircle2, accent: "success" as const },
    { label: "Not Certified", value: uncertified, icon: XCircle, accent: "destructive" as const },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className="glass-card rounded-lg p-5 flex items-center gap-4 animate-fade-in"
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
