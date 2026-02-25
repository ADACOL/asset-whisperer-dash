import { CheckCircle2, XCircle, X } from "lucide-react";
import type { Asset, AssetType } from "@/data/assets";
import { assetTypeIcons } from "@/data/assets";

interface AssetTableProps {
  assets: Asset[];
  selectedType: AssetType | null;
  onClearFilter: () => void;
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
        {selectedType && (
          <button
            onClick={onClearFilter}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3 h-3" />
            Clear filter
          </button>
        )}
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
