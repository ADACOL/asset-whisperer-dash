import { Shield } from "lucide-react";
import { useAssetStats } from "@/hooks/useAssetStats";
import { StatsCards } from "@/components/StatsCards";
import { AssetTypeBreakdown } from "@/components/AssetTypeBreakdown";
import { CertificateDonut } from "@/components/CertificateDonut";
import { AssetTable } from "@/components/AssetTable";
import { AssetChat } from "@/components/AssetChat";

const Index = () => {
  const { total, certified, uncertified, score, byType, assets } = useAssetStats();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 animate-fade-in">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center glow-primary">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">School Asset Dashboard</h1>
            <p className="text-sm text-muted-foreground">Certificate compliance & inventory overview</p>
          </div>
        </div>

        {/* Stats */}
        <StatsCards total={total} certified={certified} uncertified={uncertified} score={score} />

        {/* Charts + Chat row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <CertificateDonut byType={byType} score={score} />
          <AssetTypeBreakdown byType={byType} />
          <AssetChat />
        </div>

        {/* Table */}
        <AssetTable assets={assets} />
      </div>
    </div>
  );
};

export default Index;
