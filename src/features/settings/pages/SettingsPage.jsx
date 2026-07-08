import useSettings from "../hooks/useSettings";
import SettingsNav from "../components/SettingsNav";
import WorkspaceSection from "../components/sections/WorkspaceSection";
import UsersSection from "../components/sections/UsersSection";
import RolesSection from "../components/sections/RolesSection";
import BusinessHoursSection from "../components/sections/BusinessHoursSection";
import WidgetSection from "../components/sections/WidgetSection";
import NotificationsSection from "../components/sections/NotificationsSection";
import IntegrationsSection from "../components/sections/IntegrationsSection";
import AuditLogsSection from "../components/sections/AuditLogsSection";
import { ROLES } from "../../../constants/navigation";
import { canSettings, SETTINGS_ACTION } from "../../../constants/permissions";

/**
 * SettingsPage — workspace configuration hub.
 *
 * Header → a card with a vertical section nav and the active section content.
 * Sections: Workspace, Users, Roles, Business Hours, Widget Configuration,
 * Notifications, Integrations, Audit Logs.
 *
 * Access is limited to Platform Admin and Workspace Admin (Manager and Support
 * Agent are excluded from navigation). `initialSection` supports deep-linking —
 * e.g. the dashboard's "Son Etkinlikler → Tümünü Gör" opens the audit logs.
 * Empty by design.
 */
export default function SettingsPage({
  role = ROLES.PLATFORM_ADMIN,
  initialSection = "workspace",
}) {
  const { activeSection, setActiveSection, users, auditLogs } = useSettings({
    initialSection,
  });

  const canEdit = canSettings(role, SETTINGS_ACTION.EDIT);

  const renderSection = () => {
    switch (activeSection) {
      case "workspace":
        return <WorkspaceSection canEdit={canEdit} />;
      case "users":
        return <UsersSection canEdit={canEdit} users={users} />;
      case "roles":
        return <RolesSection />;
      case "hours":
        return <BusinessHoursSection canEdit={canEdit} />;
      case "widget":
        return <WidgetSection canEdit={canEdit} />;
      case "notifications":
        return <NotificationsSection canEdit={canEdit} />;
      case "integrations":
        return <IntegrationsSection />;
      case "audit":
        return <AuditLogsSection logs={auditLogs} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-slate-900">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Workspace yapılandırmanızı yönetin.
        </p>
      </div>

      {/* Settings card */}
      <div className="flex min-h-[560px] flex-col overflow-hidden rounded-2xl bg-white shadow-card md:flex-row">
        <SettingsNav active={activeSection} onChange={setActiveSection} />
        <div className="min-w-0 flex-1">{renderSection()}</div>
      </div>
    </div>
  );
}
