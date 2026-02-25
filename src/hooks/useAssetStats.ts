import { mockAssets, assetTypeIcons, assetTypeColors, type AssetType } from "@/data/assets";
import { useMemo } from "react";

const ASSET_TYPES: AssetType[] = ["Desktop Admin", "Desktop Peda", "Laptop", "Monitor", "Printer", "Server"];

export function useAssetStats() {
  return useMemo(() => {
    const total = mockAssets.length;
    const certified = mockAssets.filter(a => a.certificateInstalled).length;
    const score = Math.round((certified / total) * 100);

    const byType = ASSET_TYPES.map(type => {
      const assets = mockAssets.filter(a => a.type === type);
      const typeCertified = assets.filter(a => a.certificateInstalled).length;
      const Icon = assetTypeIcons[type];
      return {
        type,
        total: assets.length,
        certified: typeCertified,
        uncertified: assets.length - typeCertified,
        percentage: assets.length > 0 ? Math.round((typeCertified / assets.length) * 100) : 0,
        icon: Icon,
        color: assetTypeColors[type],
      };
    });

    return { total, certified, uncertified: total - certified, score, byType, assets: mockAssets };
  }, []);
}
