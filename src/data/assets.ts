import { Monitor, Laptop, Server, MonitorSmartphone, ScreenShare, PackageOpen } from "lucide-react";

export type AssetType = "Server Peda" | "Desktop Peda" | "Desktop Admin" | "Laptop" | "Monitor" | "Other";

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  location: string;
  certificateInstalled: boolean;
  lastSeen: string;
}

export const assetTypeIcons: Record<AssetType, typeof Monitor> = {
  "Server Peda": Server,
  "Desktop Peda": MonitorSmartphone,
  "Desktop Admin": Monitor,
  "Laptop": Laptop,
  "Monitor": ScreenShare,
  "Other": PackageOpen,
};

export const assetTypeColors: Record<AssetType, string> = {
  "Server Peda": "hsl(var(--chart-5))",
  "Desktop Peda": "hsl(var(--chart-4))",
  "Desktop Admin": "hsl(var(--primary))",
  "Laptop": "hsl(var(--warning))",
  "Monitor": "hsl(var(--success))",
  "Other": "hsl(var(--muted-foreground))",
};

export const mockAssets: Asset[] = [
  { id: "SP-001", name: "SRV-PED-01", type: "Server Peda", location: "Salle Serveur", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "SP-002", name: "SRV-PED-02", type: "Server Peda", location: "Salle Serveur", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "SP-003", name: "SRV-PED-03", type: "Server Peda", location: "Salle Réseau", certificateInstalled: false, lastSeen: "2026-02-24" },
  { id: "DP-001", name: "PC-PED-01", type: "Desktop Peda", location: "Salle 101", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DP-002", name: "PC-PED-02", type: "Desktop Peda", location: "Salle 101", certificateInstalled: false, lastSeen: "2026-02-23" },
  { id: "DP-003", name: "PC-PED-03", type: "Desktop Peda", location: "Salle 102", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DP-004", name: "PC-PED-04", type: "Desktop Peda", location: "Salle 102", certificateInstalled: false, lastSeen: "2026-02-22" },
  { id: "DP-005", name: "PC-PED-05", type: "Desktop Peda", location: "Salle 103", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DA-001", name: "PC-ADM-01", type: "Desktop Admin", location: "Bureau Direction", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DA-002", name: "PC-ADM-02", type: "Desktop Admin", location: "Secrétariat", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DA-003", name: "PC-ADM-03", type: "Desktop Admin", location: "Comptabilité", certificateInstalled: false, lastSeen: "2026-02-24" },
  { id: "LT-001", name: "LAPTOP-01", type: "Laptop", location: "CDI", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "LT-002", name: "LAPTOP-02", type: "Laptop", location: "CDI", certificateInstalled: true, lastSeen: "2026-02-24" },
  { id: "LT-003", name: "LAPTOP-03", type: "Laptop", location: "Salle Profs", certificateInstalled: false, lastSeen: "2026-02-20" },
  { id: "LT-004", name: "LAPTOP-04", type: "Laptop", location: "Direction", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "MN-001", name: "MON-01", type: "Monitor", location: "Salle 101", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "MN-002", name: "MON-02", type: "Monitor", location: "Salle 102", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "MN-003", name: "MON-03", type: "Monitor", location: "Bureau Direction", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "OT-001", name: "PRINT-01", type: "Other", location: "Secrétariat", certificateInstalled: false, lastSeen: "2026-02-24" },
  { id: "OT-002", name: "PRINT-02", type: "Other", location: "Salle Profs", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "OT-003", name: "SCANNER-01", type: "Other", location: "CDI", certificateInstalled: false, lastSeen: "2026-02-23" },
];
