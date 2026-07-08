import useTeamQueues from "../hooks/useTeamQueues";
import TeamQueuesTabs from "../components/TeamQueuesTabs";
import TeamMembersTab from "../components/TeamMembersTab";
import QueuesTab from "../components/QueuesTab";
import TeamPerformanceTab from "../components/TeamPerformanceTab";
import { ROLES } from "../../../constants/navigation";

/**
 * TeamQueuesPage — support team management.
 *
 * Header → tabs (Ekip Üyeleri · Kuyruklar · Performans) → active tab content.
 * Covers team members, availability, support queues, assignments and team
 * performance.
 *
 * Permissions: Platform/Workspace Admin manage everything; Manager can handle
 * assignments and monitor availability; Support Agent has no access. Empty by
 * design — each tab shows its empty state until data is wired in.
 */
export default function TeamQueuesPage({ role = ROLES.PLATFORM_ADMIN }) {
  const { activeTab, setActiveTab, search, setSearch, members, queues, performance } =
    useTeamQueues();

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">
          Team &amp; Queues
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Destek ekibinizi, kuyruklarınızı ve atamaları yönetin.
        </p>
      </div>

      <TeamQueuesTabs active={activeTab} onChange={setActiveTab} />

      {activeTab === "members" && (
        <TeamMembersTab
          role={role}
          members={members}
          search={search}
          onSearch={setSearch}
        />
      )}
      {activeTab === "queues" && <QueuesTab role={role} queues={queues} />}
      {activeTab === "performance" && (
        <TeamPerformanceTab performance={performance} />
      )}
    </div>
  );
}
