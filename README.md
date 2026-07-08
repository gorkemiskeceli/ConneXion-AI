# AI Chatbot – Customer Service Platform

A modern multi-tenant AI-powered customer support platform that enables businesses to provide intelligent customer service directly through their websites using an embedded AI chat widget.

---

# Overview

AI Chatbot is a frontend-only SaaS application that allows businesses to deploy an AI customer support assistant on their websites.

Customers interact with the AI through a live website chat widget where they can send text or voice messages. The AI answers questions using the configured Knowledge Base and, when necessary, transfers conversations to human support agents.

Businesses manage their AI assistant, conversations, customers, knowledge sources, workflows, teams, and analytics through a centralized administration dashboard.

This project is built as a realistic frontend MVP using React and JSON Server without any backend implementation.

---

# Product Goals

The platform aims to help businesses:

- Deliver fast AI-powered customer support
- Reduce repetitive customer inquiries
- Improve response times
- Organize customer conversations
- Configure chatbot behavior without coding
- Assist support teams with AI-powered workflows
- Monitor customer service performance
- Scale customer support operations

---

# Application Structure

The project consists of three main applications within a single React project.

## 1. Marketing Website

The public-facing website introduces the product and explains its capabilities.

Pages include:

- Home
- Features
- Solutions
- Pricing
- FAQ
- About
- Contact
- Authentication

Purpose:

- Present the platform
- Explain features
- Showcase benefits
- Generate leads
- Encourage sign-ups

---

## 2. AI Chatbot Demo

The AI Chatbot Demo allows visitors to experience the product exactly as customers would.

The demo is included inside the same React application and is not a separate website.

The page simulates a real business website with an embedded AI chat widget.

### Demo Experience

A floating circular chatbot launcher appears in the bottom-right corner of the page.

When clicked:

- Opens the chatbot window
- Keeps the website visible
- Allows minimizing
- Preserves conversation history

Visitors can:

- Start conversations
- Send text messages
- Send voice messages
- Receive simulated AI responses
- Experience human handoff scenarios

The demo uses JSON Server data and simulated AI behavior.

---

## 3. Admin Dashboard

The administration dashboard enables businesses to manage every aspect of their AI customer support operation.

Main modules include:

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

# Customer Communication

Customers communicate exclusively through the embedded website chat widget.

Supported communication methods:

- Text messages
- Voice messages

Voice messages appear within the same conversation timeline as text messages.

No external messaging platforms are included in this MVP.

---

# Website Chat Widget

The website chat widget is the primary customer communication interface.

Businesses can embed the widget directly into their websites.

Features include:

- Welcome message
- Suggested questions
- Text messaging
- Voice messaging
- AI-generated responses
- Human handoff simulation
- Conversation history

Businesses can customize:

- Logo
- Brand colors
- Welcome message
- Suggested questions
- Widget position
- Business hours

---

# User Roles

The platform supports four different user roles with role-based access control.

## Platform Admin

Responsible for managing the entire platform.

Capabilities include:

- View all workspaces
- Monitor platform health
- Access tenant-level reports
- Manage global settings

---

## Workspace Admin

Responsible for managing a single business workspace.

Capabilities include:

- Configure AI agents
- Manage users
- Manage Knowledge Base
- Configure workflows
- View reports
- Manage settings
- Manage customer support operations

---

## Manager

Responsible for supervising customer support teams.

Capabilities include:

- Monitor team conversations
- View team performance
- Test AI configurations
- Manage assigned teams
- Access operational reports

---

## Support Agent

Responsible for handling assigned customer conversations.

Capabilities include:

- View assigned conversations
- Reply to customers
- View assigned customer profiles
- Add notes and tags
- View personal performance metrics

---

# AI Capabilities (Mock)

The project demonstrates AI-assisted customer support using realistic UI interactions and JSON Server data.

Capabilities include:

- FAQ responses
- Knowledge Base search
- Suggested replies
- Customer summaries
- Conversation summaries
- Human handoff suggestions
- Voice message transcription (mock)
- AI conversation logs

No real AI model is integrated.

---

# Data Source

The application uses JSON Server as the only data source.

Mock data includes:

- Dashboard metrics
- Customers
- Conversations
- Messages
- AI agents
- Knowledge Base
- Reports
- Teams
- Widget configuration
- Workflows
- User roles
- Permissions
- Settings

No backend services are implemented.

---

# User Experience

## Marketing Website

The marketing website follows a modern SaaS landing page structure.

Characteristics:

- Clean layouts
- Large hero sections
- Conversion-focused design
- Responsive pages
- Clear call-to-actions

---

## AI Chatbot Demo

Visitors interact with the chatbot exactly as customers would on a business website.

The chatbot appears as a floating launcher positioned in the bottom-right corner.

Clicking the launcher expands the chatbot while keeping the page visible.

Visitors can:

- Send text messages
- Send voice messages
- Receive AI responses
- Experience handoff simulations
- Minimize and reopen the chatbot

---

## Admin Dashboard

The administration dashboard is desktop-first and optimized for productivity.

Characteristics:

- Fixed navigation sidebar
- Top navigation bar
- KPI-driven dashboard
- Card-based layouts
- Data visualization
- Three-column inbox
- Professional enterprise interface

---

# Design Language

The platform follows a modern enterprise SaaS design system.

Design principles:

- Clean layouts
- Large spacing
- White surfaces
- Dark navigation sidebar
- Rounded cards
- Subtle shadows
- Consistent typography
- Minimal visual clutter
- Professional analytics dashboard

The interface emphasizes clarity, usability, and data visibility over decorative elements.

---

# Responsive Design

Marketing Website

Fully responsive.

AI Chatbot Demo

Fully responsive with a responsive embedded chatbot widget.

Admin Dashboard

Desktop-first while remaining usable on large tablets.

---

# Technology Stack

Frontend

- React
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS

Mock Backend

- JSON Server

Charts

- Recharts

Icons

- Lucide React

Notifications

- React Hot Toast

Utilities

- Day.js

---

# Project Scope

Included

- Marketing website
- Embedded AI chatbot demo
- Admin dashboard
- Dashboard analytics
- Inbox
- Contacts
- AI Agent Studio
- Knowledge Base
- Workflows
- Team & Queues
- Reports
- Settings
- Role-based permissions
- JSON Server integration
- Responsive marketing pages

---

# Out of Scope

The MVP intentionally excludes:

- Backend development
- Authentication services
- Database implementation
- OpenAI integration
- Real AI models
- Real-time messaging
- CRM integrations
- External messaging platforms
- Payment processing
- Subscription billing
- Production deployment

---

# Future Expansion

The project architecture allows future integration of:

- OpenAI-compatible LLMs
- Authentication
- PostgreSQL
- Real-time messaging
- CRM systems
- Voice AI
- Advanced analytics
- Additional workflow automation
- Third-party integrations

---

# License

This project is intended for educational and portfolio purposes as a production-quality frontend SaaS application.
