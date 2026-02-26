import { useState } from "react";
import { Search, CheckCircle2, XCircle, ShieldCheck, RefreshCw, ShieldAlert } from "lucide-react";
import { mockAssets } from "@/data/assets";

type CheckAllResult = { name: string; ip: string; type: string; certified: boolean }[];

export function CertificateChecker() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<null | { found: boolean; certified?: boolean; name?: string; ip?: string; type?: string }>(null);
  const [checkAllResults, setCheckAllResults] = useState<CheckAllResult | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const check = () => {
    if (!query.trim()) return;
    setCheckAllResults(null);
    const q = query.trim().toLowerCase();
    const asset = mockAssets.find(a => a.name.toLowerCase() === q || a.ip === q);
    if (asset) {
      setResult({ found: true, certified: asset.certificateInstalled, name: asset.name, ip: asset.ip, type: asset.type });
    } else {
      setResult({ found: false });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setResult(null);
    setCheckAllResults(null);
    setTimeout(() => setRefreshing(false), 800);
  };

  const handleCheckAll = () => {
    setResult(null);
    const results = mockAssets.map(a => ({
      name: a.name, ip: a.ip, type: a.type, certified: a.certificateInstalled,
    }));
    setCheckAllResults(results);
  };

  return (
    <div className="glass-card rounded-lg flex flex-col h-[380px] animate-fade-in" style={{ animationDelay: "480ms" }}>
      <div className="p-5 pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Certificate Tools</h2>
            <p className="text-xs text-muted-foreground">Verify & manage certificates</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 px-4 pt-3">
        <button
          onClick={handleRefresh}
          className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all text-xs font-medium"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          Update Assets
        </button>
        <button
          onClick={handleCheckAll}
          className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all text-xs font-medium"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          Check All
        </button>
      </div>

      {/* Results area */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {refreshing ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground animate-pulse">Refreshing assets...</p>
          </div>
        ) : checkAllResults ? (
          <div className="space-y-1.5">
            {checkAllResults.map((a) => (
              <div key={a.ip} className="flex items-center justify-between text-xs py-1 px-2 rounded-md bg-muted/30">
                <span className="font-medium truncate">{a.name}</span>
                <span className="font-mono text-muted-foreground">{a.ip}</span>
                {a.certified ? (
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive shrink-0" />
                )}
              </div>
            ))}
          </div>
        ) : result === null ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground text-center">
              Enter an asset IP or hostname to check<br />its certificate status.
            </p>
          </div>
        ) : !result.found ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <XCircle className="w-10 h-10 text-destructive mx-auto" />
              <p className="text-sm font-medium text-destructive">Asset not found</p>
              <p className="text-xs text-muted-foreground">No asset matches "{query}"</p>
            </div>
          </div>
        ) : result.certified ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-success mx-auto" />
              <p className="text-sm font-semibold text-success">Certificate Installed</p>
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>{result.name} — {result.ip}</p>
                <p className="opacity-70">{result.type}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <XCircle className="w-12 h-12 text-destructive mx-auto" />
              <p className="text-sm font-semibold text-destructive">Not Certified</p>
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>{result.name} — {result.ip}</p>
                <p className="opacity-70">{result.type}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border/50">
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setResult(null); setCheckAllResults(null); }}
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
