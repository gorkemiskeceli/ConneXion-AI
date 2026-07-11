import { useState } from "react";
import { Plus, Bot, X } from "lucide-react";
import { useSelector } from "react-redux";

import useAiAgentStudio from "../hooks/useAiAgentStudio";
import EmbedCodeSection from "../../../components/widget/EmbedCodeSection";
import StudioTabs from "../components/StudioTabs";
import GeneralSection from "../components/sections/GeneralSection";
import InstructionsSection from "../components/sections/InstructionsSection";
import KnowledgeSourcesSection from "../components/sections/KnowledgeSourcesSection";
import GuardrailsSection from "../components/sections/GuardrailsSection";
import HandoffRulesSection from "../components/sections/HandoffRulesSection";
import TestPlaygroundSection from "../components/sections/TestPlaygroundSection";
import AiLogsSection from "../components/sections/AiLogsSection";
import Select from "../../../shared/components/ui/Select";
import { ROLES } from "../../../constants/navigation";
import { canAiStudio, AI_STUDIO_ACTION } from "../../../constants/permissions";
import { useToast } from "../../../shared/components/ui/Toast";
import { useCreateAiAgentMutation } from "../../../services/api";

/**
 * AiAgentStudioPage — configuration interface for the AI assistant.
 * Wired with fully functioning Create Agent modal, Embed code snippet, and Section Save triggers.
 */
export default function AiAgentStudioPage({ role = ROLES.PLATFORM_ADMIN }) {
  const { showToast } = useToast();
  const currentUser = useSelector((state) => state.auth?.user);
  const tenantId = currentUser?.id || "usr_001";

  const {
    activeTab,
    setActiveTab,
    agents,
    selectedAgent,
    selectedAgentId,
    setSelectedAgentId,
    knowledgeSources,
    handoffRules,
    logs,
    queues,
    resetKey,
    handleGlobalReset,
  } = useAiAgentStudio();

  const [createAgent] = useCreateAiAgentMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAgentName, setNewAgentName] = useState("");

  const canEdit = canAiStudio(role, AI_STUDIO_ACTION.EDIT);
  const canCreate = canAiStudio(role, AI_STUDIO_ACTION.CREATE_AGENT);
  const canPlayground = canAiStudio(role, AI_STUDIO_ACTION.PLAYGROUND);

  const handleSaveSettings = () => {
    showToast("Ayarlar başarıyla kaydedildi.", "success");
  };

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;

    try {
      const result = await createAgent({
        name: newAgentName,
        description: "Müşteri taleplerini yanıtlayan yapay zeka asistanı.",
        language: "tr",
        tone: "professional",
        status: "active",
      }).unwrap();

      showToast(`${newAgentName} asistanı başarıyla oluşturuldu.`, "success");
      setSelectedAgentId(result.id);
      setIsModalOpen(false);
      setNewAgentName("");
    } catch (err) {
      showToast("Agent oluşturulurken hata oluştu.", "error");
      console.error("Agent oluşturma hatası:", err);
    }
  };

  const renderSection = () => {
    switch (activeTab) {
      case "general":
        return (
          <GeneralSection
            key={resetKey}
            canEdit={canEdit}
            agent={selectedAgent}
            onReset={handleGlobalReset}
            onSave={handleSaveSettings}
          />
        );
      case "instructions":
        return (
          <InstructionsSection
            key={resetKey}
            canEdit={canEdit}
            agent={selectedAgent}
            onReset={handleGlobalReset}
            onSave={handleSaveSettings}
          />
        );
      case "knowledge":
        return (
          <KnowledgeSourcesSection
            key={resetKey}
            canEdit={canEdit}
            sources={knowledgeSources}
            onReset={handleGlobalReset}
            onSave={handleSaveSettings}
          />
        );
      case "guardrails":
        return (
          <GuardrailsSection
            key={resetKey}
            canEdit={canEdit}
            agent={selectedAgent}
            onReset={handleGlobalReset}
            onSave={handleSaveSettings}
          />
        );
      case "handoff":
        return (
          <HandoffRulesSection
            key={resetKey}
            canEdit={canEdit}
            rules={handoffRules}
            agent={selectedAgent}
            queues={queues}
            onReset={handleGlobalReset}
            onSave={handleSaveSettings}
          />
        );
      case "playground":
        return <TestPlaygroundSection key={resetKey} enabled={canPlayground} agent={selectedAgent} />;
      case "logs":
        return <AiLogsSection key={resetKey} logs={logs} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">
            AI Agent Studio
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Yapay zeka asistanınızın davranışını yapılandırın.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-52">
            <Select
              value={selectedAgentId || ""}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              aria-label="Agent seç"
            >
              <option value="" disabled>
                {agents.length ? "Agent seçin" : "Agent yok"}
              </option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Select>
          </div>
          {canCreate && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/10 transition-all hover:bg-primary-600 active:scale-95"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
              Yeni Agent
            </button>
          )}
        </div>
      </div>

      {/* Studio card */}
      <div className="flex min-h-[560px] flex-col overflow-hidden rounded-2xl bg-white shadow-card md:flex-row">
        <StudioTabs active={activeTab} onChange={setActiveTab} />
        <div className="min-w-0 flex-1">{renderSection()}</div>
      </div>

      {/* Embed Code Widget Section */}
      <EmbedCodeSection tenantId={tenantId} />

      {/* View-only hint for non-editors */}
      {!canEdit && (
        <p className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <Bot className="h-3.5 w-3.5" />
          Bu yapılandırmayı yalnızca görüntüleyebilirsiniz. Test Alanı'nı
          kullanabilirsiniz.
        </p>
      )}

      {/* Create Agent Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/20 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-heading text-lg font-extrabold text-slate-900">
                Yeni Yapay Zeka Asistanı Ekle
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAgent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Asistan Adı
                </label>
                <input
                  type="text"
                  required
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  placeholder="Örn. Satış Destek Botu"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary/10 hover:bg-primary-600 active:scale-95 transition-all"
                >
                  Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
