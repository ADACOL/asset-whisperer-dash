import { CheckCircle2, XCircle, X, Download } from "lucide-react";
import type { Asset, AssetType } from "@/data/assets";
import { assetTypeIcons } from "@/data/assets";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface AssetTableProps {
  assets: Asset[];
  selectedType: AssetType | null;
  onClearFilter: () => void;
}

function exportCSV(assets: Asset[]) {
  const header = "Name,IP,Type,Certificate,Last Check\n";
  const rows = assets.map(a =>
    `${a.name},${a.ip},${a.type},${a.certificateInstalled ? "Certified" : "Not Certified"},${a.lastSeen}`
  ).join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "asset_inventory.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function exportPDF(assets: Asset[]) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Asset Inventory", 14, 20);
  autoTable(doc, {
    startY: 30,
    head: [["Name", "IP", "Type", "Certificate", "Last Check"]],
    body: assets.map(a => [
      a.name, a.ip, a.type,
      a.certificateInstalled ? "Certified" : "Not Certified",
      a.lastSeen,
    ]),
  });
  doc.save("asset_inventory.pdf");
}

export function AssetTable({ assets, selectedType, onClearFilter }: AssetTableProps) {
  return (
    <div className="glass-card rounded-lg animate-fade-in overflow-hidden" style={{ animationDelay: "400ms" }}>
      <div className="p-6 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Asset Inventory</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedType ? `Filtered by ${selectedType}` : "All machines and their certificate status"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedType && (
            <button
              onClick={onClearFilter}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
              Clear filter
            </button>
          )}
          <button
            onClick={() => exportCSV(assets)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
          >
            <Download className="w-3 h-3" />
            CSV
          </button>
          <button
            onClick={() => exportPDF(assets)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
          >
            <Download className="w-3 h-3" />
            PDF
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-border/50">
              <th className="text-left text-muted-foreground font-medium px-6 py-3">Name</th>
              <th className="text-left text-muted-foreground font-medium px-6 py-3">IP</th>
              <th className="text-left text-muted-foreground font-medium px-6 py-3">Type</th>
              <th className="text-center text-muted-foreground font-medium px-6 py-3">Certificate</th>
              <th className="text-left text-muted-foreground font-medium px-6 py-3">Last Check</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => {
              const Icon = assetTypeIcons[asset.type];
              return (
                <tr key={asset.id} className="border-t border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3 font-medium">{asset.name}</td>
                  <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{asset.ip}</td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Icon className="w-3.5 h-3.5" />
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    {asset.certificateInstalled ? (
                      <CheckCircle2 className="w-5 h-5 text-success inline-block" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive inline-block" />
                    )}
                  </td>
                  <td className="px-6 py-3 text-muted-foreground text-xs">{asset.lastSeen}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
