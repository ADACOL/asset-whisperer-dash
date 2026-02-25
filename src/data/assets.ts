import { Monitor, Laptop, Server, MonitorSmartphone, PackageOpen } from "lucide-react";

export type AssetType = "Server Peda" | "Desktop Peda" | "Desktop Admin" | "Laptop" | "Other";

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  ip: string;
  location: string;
  certificateInstalled: boolean;
  lastSeen: string;
}

export const assetTypeIcons: Record<AssetType, typeof Monitor> = {
  "Server Peda": Server,
  "Desktop Peda": MonitorSmartphone,
  "Desktop Admin": Monitor,
  "Laptop": Laptop,
  "Other": PackageOpen,
};

export const assetTypeColors: Record<AssetType, string> = {
  "Server Peda": "hsl(var(--chart-5))",
  "Desktop Peda": "hsl(var(--chart-4))",
  "Desktop Admin": "hsl(var(--primary))",
  "Laptop": "hsl(var(--warning))",
  "Other": "hsl(var(--muted-foreground))",
};

export const mockAssets: Asset[] = [
  { id: "SP-001", name: "SRV-PED-01", type: "Server Peda", ip: "10.0.1.10", location: "Salle Serveur", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "SP-002", name: "SRV-PED-02", type: "Server Peda", ip: "10.0.1.11", location: "Salle Serveur", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "SP-003", name: "SRV-PED-03", type: "Server Peda", ip: "10.0.1.12", location: "Salle Réseau", certificateInstalled: false, lastSeen: "2026-02-24" },
  { id: "DP-001", name: "PC-PED-01", type: "Desktop Peda", ip: "10.0.2.10", location: "Salle 101", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DP-002", name: "PC-PED-02", type: "Desktop Peda", ip: "10.0.2.11", location: "Salle 101", certificateInstalled: false, lastSeen: "2026-02-23" },
  { id: "DP-003", name: "PC-PED-03", type: "Desktop Peda", ip: "10.0.2.12", location: "Salle 102", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DP-004", name: "PC-PED-04", type: "Desktop Peda", ip: "10.0.2.13", location: "Salle 102", certificateInstalled: false, lastSeen: "2026-02-22" },
  { id: "DP-005", name: "PC-PED-05", type: "Desktop Peda", ip: "10.0.2.14", location: "Salle 103", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DA-001", name: "PC-ADM-01", type: "Desktop Admin", ip: "10.0.3.10", location: "Bureau Direction", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DA-002", name: "PC-ADM-02", type: "Desktop Admin", ip: "10.0.3.11", location: "Secrétariat", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "DA-003", name: "PC-ADM-03", type: "Desktop Admin", ip: "10.0.3.12", location: "Comptabilité", certificateInstalled: false, lastSeen: "2026-02-24" },
  { id: "LT-001", name: "LAPTOP-01", type: "Laptop", ip: "10.0.4.10", location: "CDI", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "LT-002", name: "LAPTOP-02", type: "Laptop", ip: "10.0.4.11", location: "CDI", certificateInstalled: true, lastSeen: "2026-02-24" },
  { id: "LT-003", name: "LAPTOP-03", type: "Laptop", ip: "10.0.4.12", location: "Salle Profs", certificateInstalled: false, lastSeen: "2026-02-20" },
  { id: "LT-004", name: "LAPTOP-04", type: "Laptop", ip: "10.0.4.13", location: "Direction", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "OT-001", name: "PRINT-01", type: "Other", ip: "10.0.5.10", location: "Secrétariat", certificateInstalled: false, lastSeen: "2026-02-24" },
  { id: "OT-002", name: "PRINT-02", type: "Other", ip: "10.0.5.11", location: "Salle Profs", certificateInstalled: true, lastSeen: "2026-02-25" },
  { id: "OT-003", name: "SCANNER-01", type: "Other", ip: "10.0.5.12", location: "CDI", certificateInstalled: false, lastSeen: "2026-02-23" },
];
