# Platform Admin Dashboard — Integration

First page of the admin area, built to match the reference design system.
Ships **without mock data** — every panel renders an empty state until you wire
a data source into one place.

## Files

```
tailwind.config.js                         # design tokens (merge theme.extend)
src/index.css                              # font imports + base styles
src/constants/paths.js                     # centralized routes
src/constants/navigation.js                # role-filtered sidebar config
src/constants/permissions.js               # centralized inbox action matrix (canInbox)
src/layouts/DashboardLayout.jsx            # shared shell (sidebar + topbar)
src/layouts/components/Sidebar.jsx
src/layouts/components/Topbar.jsx
src/shared/components/ui/                   # SectionCard, EmptyState, Badge, Avatar, PeriodFilter
src/features/dashboard/
  pages/PlatformAdminDashboard.jsx         # the page
  components/                              # Header, KpiSummary/Card, panels
  hooks/useDashboardData.js                # the single data seam (empty)
  constants/dashboardConfig.js             # KPI + status config
src/features/inbox/
  pages/InboxPage.jsx                      # fixed 3-column workspace
  components/                              # List, Thread, Composer, CustomerPanel, …
  hooks/useInbox.js                        # data + selection seam (empty)
  constants/inboxConfig.js                 # statuses, filters, message types
src/features/contacts/
  pages/ContactsPage.jsx                   # table + profile drawer
  components/                              # Toolbar, Table, ContactProfileDrawer
  hooks/useContacts.js                     # data + table-state seam (empty)
  constants/contactsConfig.js              # status, filters, columns
src/features/ai-agent-studio/
  pages/AiAgentStudioPage.jsx              # tabbed config hub
  components/StudioTabs.jsx, StudioSection.jsx
  components/sections/                     # General, Instructions, Knowledge,
                                           #   Guardrails, Handoff, Playground, Logs
  hooks/useAiAgentStudio.js                # tab + config seam (empty)
  constants/aiStudioConfig.js              # tabs, options, log columns
src/features/knowledge-base/
  pages/KnowledgeBasePage.jsx              # category sidebar + article table
  components/                              # CategorySidebar, ArticleToolbar,
                                           #   ArticleList, ArticleDrawer
  hooks/useKnowledgeBase.js                # category/filter/selection seam (empty)
  constants/knowledgeBaseConfig.js         # categories, statuses, columns
```

Shared form primitives (reused by the studio and Settings):
`Input`, `Textarea`, `Select`, `Toggle`, `FormField` in `src/shared/components/ui/`.

## Inbox notes

- Fixed three-column layout (List · Thread · Customer) inside one tall card;
  each column scrolls on its own. Desktop-first: the customer panel hides below
  `xl`, the thread below `md`.
- Thread actions (assign / reassign / handoff / close) and composer modes
  (reply / internal note) render only when `canInbox(role, action)` allows —
  swap the `role` prop to preview Manager or Support Agent restrictions.
- The card height is `calc(100vh - 10rem)`; adjust if you change the layout
  padding or footer.

## Dependencies

```bash
npm i react-router-dom recharts lucide-react dayjs
```

## Tailwind

Merge the `theme.extend` block from `tailwind.config.js` into your config, and
make sure `src/index.css` (with the font `@import`) is imported in `main.jsx`.

## Routing

Nest the page under the shared layout:

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import PlatformAdminDashboard from "./features/dashboard/pages/PlatformAdminDashboard";
import { ROLES } from "./constants/navigation";

import InboxPage from "./features/inbox/pages/InboxPage";
import ContactsPage from "./features/contacts/pages/ContactsPage";
import AiAgentStudioPage from "./features/ai-agent-studio/pages/AiAgentStudioPage";
import KnowledgeBasePage from "./features/knowledge-base/pages/KnowledgeBasePage";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout role={ROLES.PLATFORM_ADMIN} />,
    children: [
      { index: true, element: <PlatformAdminDashboard /> },
      { path: "inbox", element: <InboxPage role={ROLES.PLATFORM_ADMIN} /> },
      { path: "contacts", element: <ContactsPage role={ROLES.PLATFORM_ADMIN} /> },
      { path: "ai-agent", element: <AiAgentStudioPage role={ROLES.PLATFORM_ADMIN} /> },
      { path: "knowledge-base", element: <KnowledgeBasePage role={ROLES.PLATFORM_ADMIN} /> },
      // next pages mount here…
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

## Adding data later

Replace the body of `useDashboardData.js` with a Redux selector + a JSON Server
thunk. Keep the returned shape identical — the panels already consume it, and
they'll switch from empty states to content automatically. Pass the session's
`userName`, `role`, `workspaceName` into `DashboardLayout` / the page.

## "See all" links

Every footer link routes through `PATHS` (react-router `<Link>`):
Son Etkinlikler → audit logs · Acil Kuyruk → inbox · Temsilci Performansı →
reports · Aktif Temsilciler → team.
