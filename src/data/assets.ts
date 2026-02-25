import { Monitor, Laptop, Printer, Server, MonitorSmartphone, ScreenShare } from "lucide-react";

export type AssetType = "Desktop Admin" | "Desktop Peda" | "Laptop" | "Monitor" | "Printer" | "Server";

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  location: string;
  certificateInstalled: boolean;
  lastSeen: string;
}

export const assetTypeIcons: Record<AssetType, typeof Monitor> = {
  "Desktop Admin": Monitor,
  "Desktop Peda": MonitorSmartphone,
  "Laptop": Laptop,
  "Monitor": ScreenShare,
  "Printer": Printer,
  "Server": Server,
};

export const assetTypeColors: Record<AssetType, string> = {
  "Desktop Admin": "hsl(var(--primary))",
  "Desktop Peda": "hsl(var(--chart-4))",
  "Laptop": "hsl(var(--warning))",
  "Monitor": "hsl(var(--success))",
  "Printer": "hsl(var(--chart-5))",
  "Server": "hsl(var(--muted-foreground))",
};

export const mockAssets: Asset[] = [
  { id: "DA-001", name: "PC-ADM-01", type: "Desktop Admin", location: "Bureau Direction", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DA-002", name: "PC-ADM-02", type: "Desktop Admin", location: "Secrétariat", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DA-003", name: "PC-ADM-03", type: "Desktop Admin", location: "Comptabilité", certificateInstalled: false, lastSeen: "2026-02-24" },
  { id: "DP-001", name: "PC-PED-01", type: "Desktop Peda", location: "Salle 101", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DP-002", name: "PC-PED-02", type: "Desktop Peda", location: "Salle 101", certificateInstalled: false, lastSeen: "2026-02-23" },
  { id: "DP-003", name: "PC-PED-03", type: "Desktop Peda", location: "Salle 102", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DP-004", name: "PC-PED-04", type: "Desktop Peda", location: "Salle 102", certificateInstalled: false, lastSeen: "2026-02-22" },
  { id: "DP-005", name: "PC-PED-05", type: "Desktop Peda", location: "Salle 103", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "LT-001", name: "LAPTOP-01", type: "Laptop", location: "CDI", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "LT-002", name: "LAPTOP-02", type: "Laptop", location: "CDI", certificateInstalled: true, lastSeen: "2026-02-24" },
  { id: "LT-003", name: "LAPTOP-03", type: "Laptop", location: "Salle Profs", certificateInstalled: false, lastSeen: "2026-02-20" },
  { id: "LT-004", name: "LAPTOP-04", type: "Laptop", location: "Direction", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "MN-001", name: "MON-01", type: "Monitor", location: "Salle 101", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "MN-002", name: "MON-02", type: "Monitor", location: "Salle 102", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "MN-003", name: "MON-03", type: "Monitor", location: "Bureau Direction", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "PR-001", name: "PRINT-01", type: "Printer", location: "Secrétariat", certificateInstalled: false, lastSeen: "2026-02-24" },
  { id: "PR-002", name: "PRINT-02", type: "Printer", location: "Salle Profs", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "PR-003", name: "PRINT-03", type: "Printer", location: "CDI", certificateInstalled: false, lastSeen: "2026-02-23" },
  { id: "SV-001", name: "SRV-01", type: "Server", location: "Salle Serveur", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "SV-002", name: "SRV-02", type: "Server", location: "Salle Serveur", certificateInstalled: true, lastSeen: "2026-02-25" },
];
