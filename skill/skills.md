# Development Skills & Standards

This document defines the engineering standards, architecture, coding conventions, UI principles, and development practices for the AI Chatbot Customer Service Platform.

Every generated page, component, and feature must follow these standards.

---

# Core Principles

The project should always prioritize:

- Clean architecture
- Reusable components
- Readable code
- Consistent UI
- Scalability
- Maintainability
- Accessibility
- Performance

Never sacrifice consistency for convenience.

---

# Technology Stack

## Frontend

- React
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS

## Mock Backend

- JSON Server

## Charts

- Recharts

## Icons

- Lucide React

## Notifications

- React Hot Toast

## Utilities

- Day.js

No backend technologies should be introduced.

---

# Architecture

The application follows a feature-based architecture.

Each module should be independent and self-contained.

A feature may contain:

- Pages
- Components
- Redux Slice
- Hooks
- Services
- Types
- Constants
- Assets

Shared resources belong in global shared directories.

---

# Project Modules

The application consists of:

- Marketing Website
- AI Chatbot Demo
- Dashboard
- Inbox
- Contacts
- AI Agent Studio
- Knowledge Base
- Workflows
- Team & Queues
- Reports
- Settings

No additional modules should be introduced unless specified.

---

# Folder Structure

Organize files by feature instead of file type.

Example

```
feature/
    pages/
    components/
    hooks/
    services/
    store/
    types/
    constants/
```

Shared UI components belong inside shared/components.

---

# Components

Components should:

- Have one responsibility
- Be reusable
- Be composable
- Remain relatively small
- Receive data through props
- Avoid duplicated logic

Prefer composition over inheritance.

---

# State Management

Use Redux Toolkit for application state.

Use component state only for UI interactions.

Separate:

- UI state
- Business state
- Server state

---

# Data Source

JSON Server is the only data source.

Never implement:

- Backend APIs
- Databases
- Authentication servers

Every page should consume mock data.

---

# Routing

Use React Router.

Organize routes into:

Marketing

Authentication

Demo

Dashboard

Dashboard routes should remain nested.

---

# Role-Based Access

The application supports four user roles.

- Platform Admin
- Workspace Admin
- Manager
- Support Agent

Every page should respect role permissions.

Navigation, actions, and visible data should change depending on the active role.

Do not hardcode permissions inside components.

Permissions should be centralized.

---

# Styling

Use Tailwind CSS exclusively.

Avoid inline styling.

Maintain consistent spacing throughout the application.

Prefer reusable utility classes.

---

# Design Language

The dashboard should follow a modern enterprise SaaS style.

Characteristics:

- White workspace
- Dark navigation sidebar
- Spacious layouts
- Rounded cards
- Soft shadows
- Data-focused UI
- Clean typography
- Professional appearance

Avoid decorative UI.

---

# Colors

Primary Interface

Dark Navy

Accent

Blue

Neutral

White and Gray

Status Colors

Success

Green

Warning

Amber

Danger

Red

Purple may appear only as a secondary accent where appropriate, but it is not the primary brand color.

---

# Typography

Headings

Manrope

Body

Inter

Labels

JetBrains Mono

Maintain consistent typography hierarchy.

Avoid inconsistent sizing.

---

# Layout Standards

## Marketing Website

- Responsive
- Spacious
- Modern landing page
- Large hero sections

---

## Demo Page

Responsive business website.

Floating chatbot launcher.

Embedded chatbot window.

Realistic customer experience.

---

## Dashboard

Desktop-first.

Fixed sidebar.

Top navigation.

Scrollable content.

Consistent spacing.

---

## Inbox

Always maintain a three-column layout.

1. Conversation List

2. Conversation Thread

3. Customer Information

Do not change this layout.

---

# Dashboard Guidelines

Dashboard pages should prioritize information hierarchy.

Preferred order

- KPI Cards
- Charts
- Tables
- Recent Activity
- Quick Actions

Avoid overwhelming the user.

---

# Forms

Forms should use:

- Inputs
- Selects
- Toggles
- Checkboxes
- Radio Groups

Maintain consistent spacing.

Labels should always appear above inputs.

---

# Tables

Tables should support:

- Search
- Filtering
- Sorting
- Pagination

Maintain consistent row heights.

Avoid excessive borders.

---

# Cards

Cards should have:

- White background
- Rounded corners
- Soft shadows
- Internal padding

Use cards as the primary layout container.

---

# Buttons

Support consistent variants:

Primary

Secondary

Outlined

Danger

Buttons should have:

- Consistent height
- Rounded corners
- Clear hover states

---

# Icons

Use Lucide React.

Icons should:

- Communicate purpose
- Maintain consistent size
- Use consistent stroke width

Avoid decorative icons.

---

# Widget

The Website Chat Widget is the only customer communication interface.

Support:

- Text messages
- Voice messages

The widget should appear as a floating launcher in the demo page.

When opened:

- Preserve conversation history
- Support minimizing
- Maintain a lightweight appearance

---

# Accessibility

Maintain:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper contrast
- Accessible forms

---

# Responsive Design

Marketing Website

Fully responsive.

AI Chatbot Demo

Fully responsive.

Dashboard

Desktop-first.

Tablet support where appropriate.

---

# Performance

Prefer:

- Lazy loading
- Memoization where beneficial
- Lightweight components
- Efficient rendering

Avoid unnecessary re-renders.

---

# Naming Conventions

Components

PascalCase

Hooks

camelCase

Utilities

camelCase

Folders

lowercase

Use descriptive names.

Avoid abbreviations.

---

# File Naming

Examples

CustomerCard.jsx

ConversationList.jsx

DashboardMetrics.jsx

KnowledgeBaseTable.jsx

Use meaningful names.

---

# Code Quality

Write code that is:

- Readable
- Modular
- Reusable
- Predictable

Avoid duplicate logic.

Extract reusable patterns into shared components.

---

# Mock Data

JSON Server should contain realistic business data.

Examples

- Users
- Roles
- Permissions
- Customers
- Conversations
- Messages
- Dashboard Metrics
- AI Agents
- Knowledge Base
- Teams
- Reports
- Widget Settings
- Workspace Settings

Mock data should resemble a real production SaaS application.

---

# Scalability

The frontend architecture should allow future integration of:

- Authentication
- Backend APIs
- PostgreSQL
- AI Providers
- Real-time messaging
- CRM integrations
- Analytics platforms

Do not implement these features in the MVP.

Only structure the project so they can be added later.
