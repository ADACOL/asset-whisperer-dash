import { useState, useRef } from "react";
import { Shield, Download } from "lucide-react";
import { useAssetStats } from "@/hooks/useAssetStats";
import { StatsCards } from "@/components/StatsCards";
import { AssetTypeBreakdown } from "@/components/AssetTypeBreakdown";
import { CertificateDonut } from "@/components/CertificateDonut";
import { AssetTable } from "@/components/AssetTable";
import { CertificateChecker } from "@/components/CertificateChecker";
import type { AssetType } from "@/data/assets";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Index = () => {
  const { total, certified, uncertified, score, byType, assets } = useAssetStats();
  const [selectedType, setSelectedType] = useState<AssetType | null>(null);
  const [filterCert, setFilterCert] = useState<"all" | "certified" | "uncertified">("all");

  let filteredAssets = selectedType
    ? selectedType === "Laptop"
      ? assets.filter(a => a.type === "Laptop" || a.type === "Other")
      : assets.filter(a => a.type === selectedType)
    : assets;

  if (filterCert === "certified") filteredAssets = filteredAssets.filter(a => a.certificateInstalled);
  if (filterCert === "uncertified") filteredAssets = filteredAssets.filter(a => !a.certificateInstalled);

  const scrollToTable = () => {
    setTimeout(() => {
      document.getElementById("asset-table")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleTotalClick = () => {
    setSelectedType(null);
    scrollToTable();
  };

  const handleCertifiedClick = () => {
    setFilterCert("certified");
    setSelectedType(null);
    scrollToTable();
  };

  const handleUncertifiedClick = () => {
    setFilterCert("uncertified");
    setSelectedType(null);
    scrollToTable();
  };

  const exportStatsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Asset Dashboard — Statistics", 14, 20);
    doc.setFontSize(12);
    doc.text(`Total Assets: ${total}`, 14, 35);
    doc.text(`Certified: ${certified}`, 14, 43);
    doc.text(`Not Certified: ${uncertified}`, 14, 51);
    doc.text(`Certificate Score: ${score}%`, 14, 59);

    autoTable(doc, {
      startY: 70,
      head: [["Type", "Total", "Certified", "Uncertified", "Score"]],
      body: byType.map(t => [t.type, t.total, t.certified, t.uncertified, `${t.percentage}%`]),
    });
    doc.save("asset_statistics.pdf");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center glow-primary">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Asset Dashboard</h1>
              <p className="text-sm text-muted-foreground">Certificate compliance & inventory overview</p>
            </div>
          </div>
          <button
            onClick={exportStatsPDF}
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export Stats PDF
          </button>
        </div>

        {/* Stats */}
        <StatsCards total={total} certified={certified} uncertified={uncertified} score={score} onTotalClick={handleTotalClick} onCertifiedClick={handleCertifiedClick} onUncertifiedClick={handleUncertifiedClick} />

        {/* Charts + Checker row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <CertificateDonut byType={byType} score={score} />
          <AssetTypeBreakdown byType={byType} selectedType={selectedType} onSelectType={setSelectedType} />
          <CertificateChecker />
        </div>

        {/* Table */}
        <div id="asset-table">
          <AssetTable assets={filteredAssets} selectedType={selectedType} filterCert={filterCert} onClearFilter={() => { setSelectedType(null); setFilterCert("all"); }} />
        </div>
      </div>
    </div>
  );
};

export default Index;
