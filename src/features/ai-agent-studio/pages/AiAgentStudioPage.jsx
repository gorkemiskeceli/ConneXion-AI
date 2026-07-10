import { Bot } from "lucide-react";
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
import { ROLES } from "../../../constants/navigation";
import { canAiStudio, AI_STUDIO_ACTION } from "../../../constants/permissions";

/**
 * AiAgentStudioPage — configuration interface for the AI assistant.
 *
 * Header (agent selector + gated "Yeni Agent") → a card with a vertical
 * section nav and the active section on the right.
 *
 * Permissions: admins get full edit; Manager is view-only but keeps the Test
 * Playground; Support Agent has no access (excluded from navigation).
 * Interface only — no real AI. Empty by design.
 */
export default function AiAgentStudioPage({ role = ROLES.PLATFORM_ADMIN }) {
  const currentUser = useSelector((state) => state.auth?.user);
  const tenantId = currentUser?.id || "usr_001";

  const {
    activeTab,
    setActiveTab,
    selectedAgent,
    knowledgeSources,
    handoffRules,
    logs,
    queues,
    resetKey,
    handleGlobalReset,
  } = useAiAgentStudio();

  const canEdit = canAiStudio(role, AI_STUDIO_ACTION.EDIT);
  const canPlayground = canAiStudio(role, AI_STUDIO_ACTION.PLAYGROUND);

  const renderSection = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSection key={resetKey} canEdit={canEdit} agent={selectedAgent} onReset={handleGlobalReset} />;
      case "instructions":
        return <InstructionsSection key={resetKey} canEdit={canEdit} agent={selectedAgent} onReset={handleGlobalReset} />;
      case "knowledge":
        return (
          <KnowledgeSourcesSection key={resetKey} canEdit={canEdit} sources={knowledgeSources} onReset={handleGlobalReset} />
        );
      case "guardrails":
        return <GuardrailsSection key={resetKey} canEdit={canEdit} agent={selectedAgent} onReset={handleGlobalReset} />;
      case "handoff":
        return (
          <HandoffRulesSection
            key={resetKey}
            canEdit={canEdit}
            rules={handoffRules}
            agent={selectedAgent}
            queues={queues}
            onReset={handleGlobalReset}
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
    <div className="mx-auto max-w-[1600px]">
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
      </div>

      {/* Studio card */}
      <div className="flex min-h-[560px] flex-col overflow-hidden rounded-2xl bg-white shadow-card md:flex-row">
        <StudioTabs active={activeTab} onChange={setActiveTab} />
        <div className="min-w-0 flex-1">{renderSection()}</div>
      </div>

      <EmbedCodeSection tenantId={tenantId} />

      {/* View-only hint for non-editors */}
      {!canEdit && (
        <p className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <Bot className="h-3.5 w-3.5" />
          Bu yapılandırmayı yalnızca görüntüleyebilirsiniz. Test Alanı'nı
          kullanabilirsiniz.
        </p>
      )}
    </div>
  );
}
