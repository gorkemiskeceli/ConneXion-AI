# Permissions

This document defines the Role-Based Access Control (RBAC) system for the AI Chatbot Customer Service Platform.

Every page, action, and navigation item should respect the active user's permissions.

The interface should dynamically adapt according to the authenticated user's role.

---

# Roles

The platform supports four user roles.

1. Platform Admin
2. Workspace Admin
3. Manager
4. Support Agent

---

# Role Descriptions

## Platform Admin

The Platform Admin manages the entire SaaS platform.

Responsibilities include:

- Managing all workspaces
- Monitoring platform health
- Viewing global analytics
- Managing global settings
- Accessing every tenant

Platform Admin has unrestricted access across the application.

---

## Workspace Admin

The Workspace Admin manages a single company's workspace.

Responsibilities include:

- Managing AI agents
- Managing users
- Managing the Knowledge Base
- Managing workflows
- Managing support teams
- Configuring workspace settings
- Viewing workspace reports

Workspace Admin has full access within their own workspace.

---

## Manager

Managers supervise customer support operations.

Responsibilities include:

- Monitoring conversations
- Reviewing team performance
- Managing assignments
- Testing AI behavior
- Monitoring reports

Managers focus on operational management rather than platform configuration.

---

## Support Agent

Support Agents communicate directly with customers.

Responsibilities include:

- Handling assigned conversations
- Viewing assigned customers
- Adding notes
- Managing conversation status
- Viewing personal performance

Agents have access only to the resources required for daily customer support.

---

# Navigation Permissions

| Module          | Platform Admin | Workspace Admin |   Manager    |  Support Agent   |
| --------------- | :------------: | :-------------: | :----------: | :--------------: |
| Dashboard       |       ✅       |       ✅        |      ✅      |        ✅        |
| Inbox           |       ✅       |       ✅        |      ✅      |        ✅        |
| Contacts        |       ✅       |       ✅        |      ✅      |        ✅        |
| AI Agent Studio |       ✅       |       ✅        | 👁️ View Only |        ❌        |
| Knowledge Base  |  👁️ View Only  |       ✅        |   ✅ Edit    |   👁️ View Only   |
| Workflows       |  👁️ View Only  |       ✅        | 👁️ View Only |        ❌        |
| Team & Queues   |       ✅       |       ✅        |      ✅      |        ❌        |
| Reports         |       ✅       |       ✅        |      ✅      | 👁️ Personal Only |
| Settings        |       ✅       |       ✅        |      ❌      |        ❌        |

---

# Dashboard Permissions

## Platform Admin

Can view:

- All workspaces
- Platform KPIs
- Global statistics
- Tenant overview

---

## Workspace Admin

Can view:

- Workspace KPIs
- Workspace analytics
- Team performance
- Customer support metrics

---

## Manager

Can view:

- Team KPIs
- Team performance
- Active conversations
- Operational analytics

---

## Support Agent

Can view:

- Personal dashboard
- Assigned conversations
- Personal metrics
- Individual performance

---

# Inbox Permissions

## Platform Admin

- View every conversation
- Assign conversations
- Reassign conversations
- Close conversations
- Add notes
- View customer information

---

## Workspace Admin

- View workspace conversations
- Assign conversations
- Reply
- Add notes
- Manage conversations

---

## Manager

- View team conversations
- Reassign conversations
- Monitor conversations
- Reply if necessary
- Add notes

---

## Support Agent

- View assigned conversations
- Reply
- Add notes
- Close assigned conversations

Agents cannot access conversations outside their assignments.

---

# Contacts Permissions

## Platform Admin

Full access.

---

## Workspace Admin

Create, edit, and manage contacts.

---

## Manager

View and edit customer information.

---

## Support Agent

View customer information related to assigned conversations.

Cannot delete customers.

---

# AI Agent Studio Permissions

## Platform Admin

View platform-wide AI configuration.

---

## Workspace Admin

Full access.

Can:

- Create agents
- Edit agents
- Configure instructions
- Configure guardrails
- Configure Knowledge Sources
- Configure handoff rules

---

## Manager

View configurations.

Access Test Playground.

Cannot modify production configuration.

---

## Support Agent

No access.

---

# Knowledge Base Permissions

## Platform Admin

View all Knowledge Bases.

---

## Workspace Admin

Full management.

Can:

- Create
- Edit
- Delete
- Organize

---

## Manager

May edit existing content.

Cannot manage workspace configuration.

---

## Support Agent

View only.

---

# Workflow Permissions

## Platform Admin

View workflows.

---

## Workspace Admin

Full workflow management.

---

## Manager

View workflows.

Test workflows.

Cannot modify.

---

## Support Agent

No access.

---

# Team & Queues Permissions

## Platform Admin

Full access.

---

## Workspace Admin

Manage:

- Teams
- Queues
- Assignments
- Availability

---

## Manager

Manage operational assignments.

Monitor availability.

Cannot create workspaces.

---

## Support Agent

No access.

---

# Reports Permissions

## Platform Admin

Global analytics.

---

## Workspace Admin

Workspace analytics.

---

## Manager

Team analytics.

---

## Support Agent

Personal analytics only.

Examples:

- Assigned conversations
- Average response time
- Personal CSAT
- Closed conversations

---

# Settings Permissions

## Platform Admin

Global settings.

---

## Workspace Admin

Workspace settings.

Includes:

- Users
- Roles
- Business Hours
- Widget Configuration
- Notifications

---

## Manager

No access.

---

## Support Agent

No access.

---

# Widget Configuration

Only Workspace Admin can configure the website chat widget.

Configuration includes:

- Logo
- Brand colors
- Welcome message
- Suggested questions
- Business hours
- Widget position

Other roles may use the widget but cannot configure it.

---

# UI Behavior

The interface should automatically adapt according to the active user's permissions.

Role-based behavior includes:

- Sidebar navigation
- Hidden pages
- Disabled actions
- Read-only views
- Restricted buttons
- Restricted forms
- Filtered data

Users should never see actions they are not allowed to perform.

---

# Permission Principles

Always follow these rules:

- Hide inaccessible pages from navigation.
- Hide unauthorized actions instead of showing errors.
- Display only data relevant to the user's role.
- Respect workspace isolation.
- Keep permission logic centralized and reusable.
- Never hardcode permissions inside UI components.
