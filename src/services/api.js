import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base URL comes from .env (VITE_API_URL), falls back to local JSON Server.
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

/**
 * api — the single RTK Query service for all server state.
 *
 * Every feature reads through the generated hooks (useGetXQuery). Tag types are
 * declared so mutations (create/edit/delete) can invalidate caches later.
 */
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: [
    "Dashboard",
    "Reports",
    "Conversation",
    "Message",
    "Customer",
    "Article",
    "KnowledgeSource",
    "AiAgent",
    "AiLog",
    "HandoffRule",
    "Workflow",
    "User",
    "Queue",
    "TeamPerformance",
    "AuditLog",
    "Settings",
  ],
  endpoints: (builder) => ({
    // Dashboard & Reports (singletons)
    getDashboard: builder.query({ query: () => "/dashboard", providesTags: ["Dashboard"] }),
    getReports: builder.query({ query: () => "/reports", providesTags: ["Reports"] }),

    // Inbox
    getConversations: builder.query({ query: () => "/conversations", providesTags: ["Conversation"] }),
    getMessages: builder.query({
      query: (conversationId) => `/messages?conversationId=${conversationId}`,
      providesTags: ["Message"],
    }),

    // Contacts
    getCustomers: builder.query({ query: () => "/customers", providesTags: ["Customer"] }),
    getCustomer: builder.query({
      query: (id) => `/customers/${id}`,
      providesTags: (r, e, id) => [{ type: "Customer", id }],
    }),

    // Knowledge Base
    getKnowledgeArticles: builder.query({ query: () => "/knowledgeArticles", providesTags: ["Article"] }),
    getKbCategoryCounts: builder.query({ query: () => "/kbCategoryCounts" }),
    getKnowledgeSources: builder.query({ query: () => "/knowledgeSources", providesTags: ["KnowledgeSource"] }),

    // AI Agent Studio
    getAiAgents: builder.query({ query: () => "/aiAgents", providesTags: ["AiAgent"] }),
    getAiLogs: builder.query({ query: () => "/aiLogs", providesTags: ["AiLog"] }),
    getHandoffRules: builder.query({ query: () => "/handoffRules", providesTags: ["HandoffRule"] }),

    // Workflows
    getWorkflows: builder.query({ query: () => "/workflows", providesTags: ["Workflow"] }),

    // Team & Queues
    getUsers: builder.query({ query: () => "/users", providesTags: ["User"] }),
    getQueues: builder.query({ query: () => "/queues", providesTags: ["Queue"] }),
    getTeamPerformance: builder.query({ query: () => "/teamPerformance", providesTags: ["TeamPerformance"] }),

    // Settings
    getAuditLogs: builder.query({ query: () => "/auditLogs", providesTags: ["AuditLog"] }),
    getWorkspaceSettings: builder.query({ query: () => "/workspaceSettings", providesTags: ["Settings"] }),
    getWidgetSettings: builder.query({ query: () => "/widgetSettings", providesTags: ["Settings"] }),
    getBusinessHours: builder.query({ query: () => "/businessHours", providesTags: ["Settings"] }),
    getNotificationSettings: builder.query({ query: () => "/notificationSettings", providesTags: ["Settings"] }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetReportsQuery,
  useGetConversationsQuery,
  useGetMessagesQuery,
  useGetCustomersQuery,
  useGetCustomerQuery,
  useGetKnowledgeArticlesQuery,
  useGetKbCategoryCountsQuery,
  useGetKnowledgeSourcesQuery,
  useGetAiAgentsQuery,
  useGetAiLogsQuery,
  useGetHandoffRulesQuery,
  useGetWorkflowsQuery,
  useGetUsersQuery,
  useGetQueuesQuery,
  useGetTeamPerformanceQuery,
  useGetAuditLogsQuery,
  useGetWorkspaceSettingsQuery,
  useGetWidgetSettingsQuery,
  useGetBusinessHoursQuery,
  useGetNotificationSettingsQuery,
} = api;
