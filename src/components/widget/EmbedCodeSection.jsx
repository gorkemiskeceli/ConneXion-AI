import { useState } from "react";
import { Copy, Check, Terminal, Code } from "lucide-react";

/**
 * EmbedCodeSection - displays copyable script and hooks integration templates
 * for developers to add ConneXion-AI chat widget to their websites.
 * 
 * @param {string} tenantId - The current workspace or profile ID of the user.
 */
export default function EmbedCodeSection({ tenantId = "CURRENT_TENANT_ID" }) {
  const [activeTab, setActiveTab] = useState("html");
  const [copied, setCopied] = useState(false);
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";

  const htmlCode = `<script>
  window.ConneXionConfig = {
    tenantId: "${tenantId}",
    apiUrl: "http://localhost:3000"
  };
</script>
<script src="${currentOrigin}/widget.js" async></script>`;

  const reactCode = `import { useEffect } from 'react';

export const useConneXionAI = () => {
  useEffect(() => {
    window.ConneXionConfig = {
      tenantId: "${tenantId}",
      apiUrl: "http://localhost:3000"
    };

    const script = document.createElement('script');
    script.src = "${currentOrigin}/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};`;

  const codeToCopy = activeTab === "html" ? htmlCode : reactCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-xl transition-all">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800">
            <Terminal className="h-5 w-5 text-primary-400" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-white">Widget Entegrasyon Kodu</h3>
            <p className="text-xs text-slate-400">
              Bu kodu web sitenize ekleyerek ConneXion-AI Widget'ını canlıya alabilirsiniz.
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-1.5 rounded-lg bg-slate-900 p-1 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("html")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "html"
                ? "bg-primary text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            HTML
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("react")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "react"
                ? "bg-primary text-white shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            React / Vite
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="relative mt-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
        <div className="absolute right-3 top-3 z-10">
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              copied
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Kopyalandı!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Kodu Kopyala
              </>
            )}
          </button>
        </div>

        <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-slate-300">
          <code>{codeToCopy}</code>
        </pre>
      </div>
    </div>
  );
}
