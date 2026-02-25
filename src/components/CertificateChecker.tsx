import { useState } from "react";
import { Search, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { mockAssets } from "@/data/assets";

export function CertificateChecker() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<null | { found: boolean; certified?: boolean; name?: string; ip?: string; type?: string }>(null);

  const check = () => {
    if (!query.trim()) return;
    const q = query.trim().toLowerCase();
    const asset = mockAssets.find(
      a => a.name.toLowerCase() === q || a.ip === q
    );
    if (asset) {
      setResult({ found: true, certified: asset.certificateInstalled, name: asset.name, ip: asset.ip, type: asset.type });
    } else {
      setResult({ found: false });
    }
  };

  return (
    <div className="glass-card rounded-lg flex flex-col h-[380px] animate-fade-in" style={{ animationDelay: "480ms" }}>
      <div className="p-5 pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Check Certificate</h2>
            <p className="text-xs text-muted-foreground">Verify asset certificate by IP or Name</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
        {result === null ? (
          <p className="text-sm text-muted-foreground text-center">
            Enter an asset IP or hostname to check<br />its certificate status.
          </p>
        ) : !result.found ? (
          <div className="text-center space-y-2">
            <XCircle className="w-10 h-10 text-destructive mx-auto" />
            <p className="text-sm font-medium text-destructive">Asset not found</p>
            <p className="text-xs text-muted-foreground">No asset matches "{query}"</p>
          </div>
        ) : result.certified ? (
          <div className="text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-success mx-auto" />
            <p className="text-sm font-semibold text-success">Certificate Installed</p>
            <div className="text-xs text-muted-foreground space-y-0.5">
              <p>{result.name} — {result.ip}</p>
              <p className="opacity-70">{result.type}</p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <XCircle className="w-12 h-12 text-destructive mx-auto" />
            <p className="text-sm font-semibold text-destructive">Not Certified</p>
            <div className="text-xs text-muted-foreground space-y-0.5">
              <p>{result.name} — {result.ip}</p>
              <p className="opacity-70">{result.type}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-border/50">
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setResult(null); }}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="IP address or hostname..."
            className="flex-1 bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
          />
          <button
            onClick={check}
            disabled={!query.trim()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all shrink-0 text-sm font-medium"
          >
            <Search className="w-4 h-4" />
            Check
          </button>
        </div>
      </div>
    </div>
  );
}
