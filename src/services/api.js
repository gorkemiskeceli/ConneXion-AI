import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base URL comes from .env (VITE_API_URL or VITE_JSON_SERVER_URL), falls back to local JSON Server port 3000.
const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_JSON_SERVER_URL || "http://localhost:3000";

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
    addKnowledgeSource: builder.mutation({
      query: (source) => ({
        url: "/knowledgeSources",
        method: "POST",
        body: source,
      }),
      invalidatesTags: ["KnowledgeSource"],
    }),
    deleteKnowledgeSource: builder.mutation({
      query: (id) => ({
        url: `/knowledgeSources/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["KnowledgeSource"],
    }),

    // AI Agent Studio
    getAiAgents: builder.query({ query: () => "/aiAgents", providesTags: ["AiAgent"] }),
    updateAiAgent: builder.mutation({
      query: (agent) => ({
        url: `/aiAgents/${agent.id}`,
        method: "PATCH",
        body: agent,
      }),
      invalidatesTags: ["AiAgent"],
    }),
    getAiLogs: builder.query({ query: () => "/aiLogs", providesTags: ["AiLog"] }),
    getHandoffRules: builder.query({ query: () => "/handoffRules", providesTags: ["HandoffRule"] }),
    createAiAgent: builder.mutation({
      query: (agent) => ({
        url: "/aiAgents",
        method: "POST",
        body: agent,
      }),
      invalidatesTags: ["AiAgent"],
    }),
    addHandoffRule: builder.mutation({
      query: (rule) => ({
        url: "/handoffRules",
        method: "POST",
        body: rule,
      }),
      invalidatesTags: ["HandoffRule"],
    }),
    deleteHandoffRule: builder.mutation({
      query: (id) => ({
        url: `/handoffRules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HandoffRule"],
    }),

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

    // Customer Mutations
    createCustomer: builder.mutation({
      query: (customer) => ({
        url: "/customers",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/customers/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => ["Customer", { type: "Customer", id }],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),

    // Knowledge Article Mutations
    createKnowledgeArticle: builder.mutation({
      query: (article) => ({
        url: "/knowledgeArticles",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Article"],
    }),
    updateKnowledgeArticle: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/knowledgeArticles/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Article"],
    }),
    deleteKnowledgeArticle: builder.mutation({
      query: (id) => ({
        url: `/knowledgeArticles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
    }),

    // Workflow Mutations
    createWorkflow: builder.mutation({
      query: (workflow) => ({
        url: "/workflows",
        method: "POST",
        body: workflow,
      }),
      invalidatesTags: ["Workflow"],
    }),
    updateWorkflow: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/workflows/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Workflow"],
    }),
    deleteWorkflow: builder.mutation({
      query: (id) => ({
        url: `/workflows/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Workflow"],
    }),

    // User/Member Mutations
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // Queue Mutations
    createQueue: builder.mutation({
      query: (queue) => ({
        url: "/queues",
        method: "POST",
        body: queue,
      }),
      invalidatesTags: ["Queue"],
    }),
    updateQueue: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/queues/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Queue"],
    }),
    deleteQueue: builder.mutation({
      query: (id) => ({
        url: `/queues/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Queue"],
    }),

    // Inbox Mutations
    createMessage: builder.mutation({
      query: (message) => ({
        url: "/messages",
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Message"],
    }),
    updateConversation: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/conversations/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Conversation"],
    }),
    updateWorkspaceSettings: builder.mutation({
      query: (settings) => ({
        url: "/workspaceSettings",
        method: "PUT",
        body: settings,
      }),
      invalidatesTags: ["Settings"],
    }),
    updateWidgetSettings: builder.mutation({
      query: (settings) => ({
        url: "/widgetSettings",
        method: "PUT",
        body: settings,
      }),
      invalidatesTags: ["Settings"],
    }),
    updateBusinessHours: builder.mutation({
      query: (hours) => ({
        url: "/businessHours",
        method: "PUT",
        body: hours,
      }),
      invalidatesTags: ["Settings"],
    }),
    updateNotificationSettings: builder.mutation({
      query: (settings) => ({
        url: "/notificationSettings",
        method: "PUT",
        body: settings,
      }),
      invalidatesTags: ["Settings"],
    }),
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
  // Mutation hooks
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useCreateKnowledgeArticleMutation,
  useUpdateKnowledgeArticleMutation,
  useDeleteKnowledgeArticleMutation,
  useCreateWorkflowMutation,
  useUpdateWorkflowMutation,
  useDeleteWorkflowMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateQueueMutation,
  useUpdateQueueMutation,
  useDeleteQueueMutation,
  useCreateMessageMutation,
  useUpdateConversationMutation,
  useUpdateWorkspaceSettingsMutation,
  useUpdateWidgetSettingsMutation,
  useUpdateBusinessHoursMutation,
  useUpdateNotificationSettingsMutation,
  useCreateAiAgentMutation,
  useUpdateAiAgentMutation,
  useAddKnowledgeSourceMutation,
  useDeleteKnowledgeSourceMutation,
  useAddHandoffRuleMutation,
  useDeleteHandoffRuleMutation,
} = api;
