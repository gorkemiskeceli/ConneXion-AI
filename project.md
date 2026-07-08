# Project Overview

## Project Name

AI Chatbot – AI Customer Service Platform

---

# Project Description

AI Chatbot is a modern multi-tenant SaaS platform that enables businesses to deploy AI-powered customer support directly on their websites through an embedded live chat widget.

Instead of communicating through multiple external platforms, customers interact with businesses exclusively through the website chatbot using text and voice messages.

Businesses configure their AI assistant, manage conversations, organize customers, build knowledge bases, automate support workflows, supervise teams, and monitor performance through a centralized administration dashboard.

This project is built as a frontend-only MVP using React and JSON Server with realistic business data.

---

# Vision

Build a production-quality enterprise SaaS platform that demonstrates how modern AI customer support software operates.

The platform should emphasize usability, scalability, role-based management, and professional dashboard experiences while remaining frontend-only.

---

# Target Users

## Businesses

- E-commerce Stores
- SaaS Companies
- Service Businesses
- Healthcare Clinics
- Educational Institutions
- Agencies
- Enterprise Companies

---

## Platform Users

- Platform Admin
- Workspace Admin
- Manager
- Support Agent

---

## End Users

Customers visiting a business website who need customer support through the embedded AI chatbot.

---

# Product Structure

The application consists of three major sections.

---

## 1. Marketing Website

The public website introduces the platform and explains its capabilities.

Purpose

- Product presentation
- Feature showcase
- Pricing
- Frequently Asked Questions
- Contact
- Authentication
- Lead generation

Pages

- Home
- Features
- Solutions
- Pricing
- FAQ
- About
- Contact
- Login
- Register

---

## 2. AI Chatbot Demo

The AI Chatbot Demo allows visitors to experience the product from a customer's perspective.

The demo is included inside the same React application.

It simulates a real company website where the chatbot has already been embedded.

### Demo Experience

Visitors initially see a floating circular chatbot launcher located in the bottom-right corner.

When clicked:

- Opens the chatbot
- Keeps the webpage visible
- Supports minimizing
- Preserves conversation history

Visitors can:

- Start conversations
- Send text messages
- Send voice messages
- Receive simulated AI responses
- Experience AI-to-human handoff

The demo uses JSON Server and simulated AI responses.

---

## 3. Administration Dashboard

The dashboard allows businesses to manage their AI customer support operations.

---

# Dashboard Modules

## Dashboard

Provides a real-time overview of customer support performance.

Includes

- KPI cards
- Active conversations
- Waiting conversations
- AI Resolution Rate
- Customer Satisfaction
- Average Response Time
- Recent conversations
- Team overview
- Performance charts

---

## Inbox

Central workspace for customer conversations.

Layout

- Conversation List
- Conversation Thread
- Customer Information

Features

- Search
- Filters
- Assign conversation
- Internal notes
- Conversation status
- AI suggestions
- Human handoff
- Message composer

---

## Contacts

Customer management system.

Features

- Customer list
- Customer profiles
- Conversation history
- Notes
- Tags
- Search
- Filters
- Customer summaries

---

## AI Agent Studio

Configuration interface for AI behavior.

Includes

- General Settings
- Instructions
- Knowledge Sources
- Guardrails
- Handoff Rules
- Test Playground
- AI Logs

Only the interface is implemented.

No real AI configuration exists.

---

## Knowledge Base

Content management system used by the AI.

Supports

- FAQs
- Products
- Services
- Policies
- Documents
- Categories

---

## Workflows

Business automation builder.

Includes

- Trigger
- Conditions
- Actions
- Workflow templates
- Status management

Workflow execution is simulated using JSON Server.

---

## Team & Queues

Support team management.

Includes

- Team members
- Queues
- Assignments
- Availability
- Performance overview

---

## Reports

Business analytics dashboard.

Includes

- Conversation Reports
- AI Performance
- Response Times
- Customer Satisfaction
- Team Performance
- Trends

---

## Settings

Workspace configuration.

Includes

- Workspace
- Users
- Roles
- Business Hours
- Widget Configuration
- Notifications
- Integrations
- Audit Logs

Widget configuration includes

- Logo
- Brand colors
- Welcome message
- Suggested questions
- Widget position
- Business hours

---

# Website Chat Widget

The embedded website chat widget is the only communication channel supported by the platform.

Customers can

- Send text messages
- Send voice messages
- Receive AI responses
- Request a human support agent

Businesses configure the widget through the Settings module.

---

# User Roles

The platform uses role-based access control.

---

## Platform Admin

Responsible for the entire SaaS platform.

Permissions

- View all workspaces
- Global reports
- Global settings
- Platform monitoring
- Tenant overview

---

## Workspace Admin

Responsible for one company workspace.

Permissions

- Full workspace management
- User management
- AI Agent management
- Knowledge Base
- Workflows
- Reports
- Settings

---

## Manager

Responsible for supervising support operations.

Permissions

- Team conversations
- Team reports
- Team assignments
- AI testing
- Team performance

Managers cannot modify global workspace settings.

---

## Support Agent

Responsible for handling assigned conversations.

Permissions

- Assigned conversations
- Assigned customers
- Notes
- Tags
- Personal dashboard
- Personal performance

Agents cannot configure AI or workspace settings.

---

# Permission Model

Every dashboard page respects the active user's role.

The interface adapts by:

- Showing permitted navigation items
- Restricting editing capabilities
- Displaying only accessible data
- Limiting available actions

This creates a realistic enterprise SaaS experience.

---

# Customer Journey

1. Visitor opens a business website.

2. A floating AI chatbot launcher appears.

3. Visitor opens the chatbot.

4. AI greets the visitor.

5. Customer sends a text or voice message.

6. AI searches the configured Knowledge Base.

7. AI responds.

8. If necessary, the conversation is transferred to a support agent.

9. The assigned agent continues the conversation inside the Inbox.

10. Conversation history becomes available for reporting.

---

# AI Capabilities

The project simulates AI-assisted customer support.

Capabilities include

- FAQ answering
- Knowledge Base search
- Suggested replies
- Customer summaries
- Conversation summaries
- AI confidence indicators
- Human handoff suggestions
- Voice transcription (mock)
- AI activity logs

No real AI model is connected.

---

# Data Management

The project uses JSON Server exclusively.

Mock data includes

- Users
- Roles
- Permissions
- Customers
- Teams
- Conversations
- Messages
- AI Agents
- Dashboard Metrics
- Reports
- Knowledge Base
- Workflows
- Widget Settings
- Workspace Settings

---

# Design Principles

The interface follows a modern enterprise SaaS dashboard.

Characteristics

- Fixed sidebar
- Top navigation
- White workspace
- Dark navigation
- Card-based layouts
- Professional analytics
- Rounded components
- Soft shadows
- Spacious layouts
- Clear typography

Dashboard pages should emphasize clarity and productivity.

---

# MVP Scope

Included

- Marketing Website
- AI Chatbot Demo
- Embedded Website Chat Widget
- Administration Dashboard
- Dashboard Analytics
- Inbox
- Contacts
- AI Agent Studio
- Knowledge Base
- Workflows
- Team & Queues
- Reports
- Settings
- Role-based access control
- JSON Server

---

# Out of Scope

The MVP intentionally excludes

- Backend
- Authentication services
- Database implementation
- Real AI models
- OpenAI APIs
- Real-time communication
- CRM integrations
- External messaging platforms
- Payment processing
- Subscription management
- Production deployment

---

# Future Expansion

The architecture allows future support for

- Authentication
- PostgreSQL
- OpenAI-compatible LLMs
- Real-time messaging
- CRM integrations
- Third-party APIs
- Voice AI
- Advanced analytics
- Additional automation features

---

# Success Criteria

The project is considered successful if it delivers

- Production-quality UI
- Realistic enterprise dashboard
- Consistent design system
- Role-based permissions
- Reusable React architecture
- Responsive marketing pages
- Interactive AI chatbot demo
- Scalable frontend structure
- Realistic JSON Server data
