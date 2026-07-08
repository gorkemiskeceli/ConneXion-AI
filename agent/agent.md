# Agent Instructions

You are building a production-quality SaaS application called **AI Chatbot – Customer Service Platform**.

Your responsibility is to generate a scalable, maintainable, and realistic frontend application that resembles a real enterprise SaaS product.

Always prioritize consistency, reusability, and long-term scalability.

This project is frontend-only.

---

# Project Context

The application consists of three primary sections:

1. Marketing Website
2. AI Chatbot Demo
3. Administration Dashboard

Everything exists inside a single React application.

The project uses JSON Server as the only data source.

Do not generate backend code.

Do not generate authentication services.

Do not generate database code.

---

# Product Vision

The platform allows businesses to deploy an AI customer support assistant directly onto their websites.

Customers communicate with businesses only through the embedded website chat widget.

Businesses manage customer support through a centralized administration dashboard.

The application should feel comparable to modern enterprise SaaS products.

The experience should emphasize usability, professionalism, and scalability.

---

# Customer Communication

The website chat widget is the only customer communication channel.

Supported message types:

- Text
- Voice

Do not generate pages or features for:

- WhatsApp
- Email
- Instagram
- Facebook Messenger
- Telegram
- Voice Call Management
- Omnichannel inboxes

The entire customer experience revolves around the embedded website chatbot.

---

# Marketing Website

The marketing website should feel like a premium SaaS landing page.

Generate pages such as:

- Home
- Features
- Solutions
- Pricing
- FAQ
- About
- Contact
- Authentication

Design should prioritize conversion.

Use modern layouts with generous spacing.

---

# AI Chatbot Demo

The demo page represents a real business website.

It is **not** an admin interface.

A floating circular chatbot launcher must appear in the bottom-right corner.

When clicked:

- Expand into a chatbot window
- Keep the webpage visible
- Allow minimizing
- Preserve conversation history

The demo should simulate exactly how customers will experience the embedded widget.

Use realistic mock conversations.

Use JSON Server data.

Do not implement real AI.

---

# Administration Dashboard

The dashboard is desktop-first.

Maintain:

- Fixed sidebar
- Top navigation
- Card-based layout
- White workspace
- Dark navigation
- Spacious interface

Every page must belong to the same design system.

Do not redesign navigation between modules.

---

# Dashboard Modules

Generate only the following modules:

- Dashboard
- Inbox
- Contacts
- AI Agent Studio
- Knowledge Base
- Workflows
- Team & Queues
- Reports
- Settings

Do not generate:

- Channels
- Voice
- Omnichannel management

---

# User Roles

The application supports four user roles.

## Platform Admin

Platform-wide management.

Can access:

- All workspaces
- Platform reports
- Global settings
- Tenant overview

---

## Workspace Admin

Workspace management.

Full control over:

- Dashboard
- Inbox
- Contacts
- AI Agent Studio
- Knowledge Base
- Workflows
- Team & Queues
- Reports
- Settings

---

## Manager

Team supervision.

Can:

- Monitor team conversations
- View team reports
- Manage assignments
- Review AI results
- Test workflows

Cannot modify workspace-wide settings.

---

## Support Agent

Handles assigned customer conversations.

Can:

- View assigned conversations
- Reply to customers
- Add notes
- Add tags
- View personal performance

Cannot configure the platform.

---

# Role-Based Permissions

Every page must respect the active user's role.

Permissions should affect:

- Navigation visibility
- Editable fields
- Available actions
- Displayed data

Avoid hardcoding permission logic inside components.

Permissions should be centralized and reusable.

---

# Inbox

The Inbox is the most important page in the application.

Always maintain a three-column layout.

Column 1

Conversation List

Column 2

Conversation Thread

Column 3

Customer Information

Never change this layout.

---

# AI Agent Studio

The AI Agent Studio configures chatbot behavior.

Include sections for:

- General
- Instructions
- Knowledge Sources
- Guardrails
- Handoff Rules
- Test Playground
- AI Logs

Only build the interface.

Do not implement real AI functionality.

---

# Knowledge Base

The Knowledge Base stores information used by the AI assistant.

Support content such as:

- FAQs
- Products
- Services
- Policies
- Documentation

Use realistic mock data.

---

# Workflows

Generate a visual workflow builder.

Support:

- Triggers
- Conditions
- Actions
- Status

Workflow execution is simulated.

Do not implement automation engines.

---

# Team & Queues

Generate interfaces for:

- Team members
- Support queues
- Availability
- Assignments
- Team performance

---

# Reports

Generate professional analytics dashboards.

Focus on:

- Conversations
- AI performance
- Response times
- Customer satisfaction
- Team performance

Use realistic charts.

---

# Settings

Settings should include:

- Workspace
- Users
- Roles
- Business Hours
- Widget Configuration
- Notifications
- Audit Logs

The Website Chat Widget configuration belongs inside Settings.

---

# Website Chat Widget

The widget configuration should allow businesses to customize:

- Logo
- Brand colors
- Welcome message
- Suggested questions
- Widget position
- Business hours

This is a configuration interface only.

The live widget appears only on the Demo page.

---

# Data

Use JSON Server for all application data.

Generate realistic mock datasets.

Examples include:

- Users
- Roles
- Permissions
- Customers
- Teams
- Conversations
- Messages
- Dashboard metrics
- Reports
- Knowledge Base
- AI Agents
- Widget settings
- Workspace settings

Do not hardcode repetitive data.

---

# Components

Always create reusable components.

Split large pages into smaller components.

Each component should have one responsibility.

Prefer composition over duplication.

---

# Styling

Use Tailwind CSS.

Do not use inline styles.

Follow the design system consistently.

Maintain generous spacing.

Use rounded cards.

Use subtle shadows.

Avoid unnecessary visual effects.

---

# Design Language

Follow a modern enterprise SaaS dashboard style.

Characteristics:

- White workspace
- Dark sidebar
- Clean analytics
- Rounded cards
- Soft shadows
- Spacious layouts
- Minimal visual noise

The interface should feel professional and data-focused.

Purple is not the primary brand color.

Use neutral tones with blue accents.

Purple may appear only as a secondary accent where appropriate.

---

# Typography

Use:

Headings

Manrope

Body

Inter

Labels

JetBrains Mono

Maintain consistent hierarchy.

---

# Icons

Use Lucide React.

Icons should:

- Be minimal
- Use consistent sizing
- Clearly communicate purpose

---

# Accessibility

Follow accessibility best practices.

Maintain:

- Semantic HTML
- Keyboard navigation
- Focus states
- Proper contrast
- Accessible forms

---

# Performance

Prefer:

- Lazy loading
- Reusable components
- Efficient rendering

Avoid unnecessary re-renders.

---

# Code Quality

Generate production-quality React code.

Keep files organized.

Avoid duplicate logic.

Use meaningful names.

Write scalable code.

---

# Mock Features

Simulate using JSON Server:

- AI responses
- Conversation history
- Voice messages
- Human handoff
- Dashboard metrics
- Reports
- Knowledge Base
- Team management

Do not implement:

- OpenAI
- Speech recognition
- Authentication
- Backend services

---

# Future Ready

Structure the project so future versions can support:

- Backend APIs
- Authentication
- PostgreSQL
- AI providers
- Real-time messaging
- CRM integrations
- Third-party services

Do not implement these features in the MVP.

---

# Development Priorities

Always prioritize work in this order:

1. Clean architecture
2. Consistent design
3. Reusable components
4. Role-based permissions
5. User experience
6. Responsive layouts
7. Maintainable code
8. Performance
9. Scalability

When uncertain, choose the solution that best supports long-term consistency across the entire application.
