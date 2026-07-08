import { Plus, Bot } from "lucide-react";

import useAiAgentStudio from "../hooks/useAiAgentStudio";
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
  const { activeTab, setActiveTab, agents, knowledgeSources, handoffRules, logs } =
    useAiAgentStudio();

  const canEdit = canAiStudio(role, AI_STUDIO_ACTION.EDIT);
  const canCreate = canAiStudio(role, AI_STUDIO_ACTION.CREATE_AGENT);
  const canPlayground = canAiStudio(role, AI_STUDIO_ACTION.PLAYGROUND);

  const renderSection = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSection canEdit={canEdit} />;
      case "instructions":
        return <InstructionsSection canEdit={canEdit} />;
      case "knowledge":
        return (
          <KnowledgeSourcesSection canEdit={canEdit} sources={knowledgeSources} />
        );
      case "guardrails":
        return <GuardrailsSection canEdit={canEdit} />;
      case "handoff":
        return <HandoffRulesSection canEdit={canEdit} rules={handoffRules} />;
      case "playground":
        return <TestPlaygroundSection enabled={canPlayground} />;
      case "logs":
        return <AiLogsSection logs={logs} />;
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

        <div className="flex items-center gap-3">
          <div className="w-52">
            <Select defaultValue="" aria-label="Agent seç">
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
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-primary px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600"
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
