import { useState, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import { mockAssets } from "@/data/assets";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function generateResponse(question: string): string {
  const q = question.toLowerCase();
  const total = mockAssets.length;
  const certified = mockAssets.filter(a => a.certificateInstalled).length;

  if (q.includes("how many") && q.includes("asset")) return `There are ${total} total assets in the school inventory.`;
  if (q.includes("certificate") && (q.includes("score") || q.includes("percent"))) return `The overall certificate score is ${Math.round((certified / total) * 100)}%. ${certified} out of ${total} machines have certificates installed.`;
  if (q.includes("not") && q.includes("certif")) {
    const uncert = mockAssets.filter(a => !a.certificateInstalled);
    return `There are ${uncert.length} machines without certificates:\n${uncert.map(a => `• ${a.name} (${a.type}) — ${a.location}`).join("\n")}`;
  }
  if (q.includes("server")) {
    const servers = mockAssets.filter(a => a.type === "Server");
    return `There are ${servers.length} servers. All ${servers.filter(a => a.certificateInstalled).length === servers.length ? "have" : "don't all have"} certificates installed.`;
  }
  if (q.includes("printer")) {
    const printers = mockAssets.filter(a => a.type === "Printer");
    const cert = printers.filter(a => a.certificateInstalled).length;
    return `There are ${printers.length} printers. ${cert} have certificates, ${printers.length - cert} do not.`;
  }
  if (q.includes("laptop")) {
    const laptops = mockAssets.filter(a => a.type === "Laptop");
    const cert = laptops.filter(a => a.certificateInstalled).length;
    return `There are ${laptops.length} laptops. ${cert} have certificates installed.`;
  }
  if (q.includes("location") || q.includes("where")) {
    const locations = [...new Set(mockAssets.map(a => a.location))];
    return `Assets are spread across ${locations.length} locations:\n${locations.map(l => `• ${l} (${mockAssets.filter(a => a.location === l).length} assets)`).join("\n")}`;
  }

  return `I found ${total} total assets with a ${Math.round((certified / total) * 100)}% certificate score. Try asking about specific asset types (servers, printers, laptops), certificate status, or locations.`;
}

export function AssetChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(userMsg.content);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
      setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 50);
    }, 600);
  };

  return (
    <div className="glass-card rounded-lg flex flex-col h-[380px] animate-fade-in" style={{ animationDelay: "480ms" }}>
      <div className="p-5 pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Asset Assistant</h2>
            <p className="text-xs text-muted-foreground">Ask about your school's assets</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground text-center">
              Ask me anything about your assets.<br />
              <span className="text-xs opacity-70">e.g. "How many assets are not certified?"</span>
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-6 h-6 rounded-md bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3 h-3 text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-md bg-primary/15 flex items-center justify-center">
              <Bot className="w-3 h-3 text-primary animate-pulse-glow" />
            </div>
            <div className="bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground">Thinking...</div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-border/50">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about your assets..."
            className="flex-1 bg-muted/50 border border-border/50 rounded-lg px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
