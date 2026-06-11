# Sinovex AI
### Multi-Channel AI Agent and Business Automation Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Sinovex AI is a premium, industry-grade AI automation platform designed to streamline business workflows, customer operations, and lead capture. It features live, fully simulated interfaces representing different digital customer touchpoints, all powered by a smart multi-model Node.js orchestration backend.

Strategic Technology Partner: [Vaster Global](https://vasterglobal.com)

---

## Core Modules and Features

### AI WhatsApp Bot Simulation
A replica of the WhatsApp interface running on an interactive iOS mockup.
- Multilingual Support: Fully understands and replies in natural English, Sinhala, and Singlish (Sri Lankan colloquial romanized script).
- Intent Detection: Instantly recognizes greetings, price inquiries, scheduling requests, and complaints.
- Interactive Calls-to-Action: Renders buttons for booking confirmation and automated transition to human agents.

### Website AI Sales Assistant (SinexaChat)
A full-featured floating chat interface deployed directly on the website.
- Lead Capture and Qualification: Collects and validates visitors' contact info, business requirements, and interests with country-code-aware phone input.
- Persistent Chat Sessions: Saves chat history and lead info to localStorage so returning users resume where they left off.
- Dynamic Recommendations: Evaluates user answers to recommend specific pricing tiers or packages.
- Sales Handoff: Transitions conversations to email or direct WhatsApp links.

### Sinexa Widget (Floating AI Chat Widget)
A lightweight, embeddable chat widget for any business website.
- Onboarding Flow: Collects visitor name and phone number with international prefix selection before starting a conversation.
- Live AI Responses: Connects to the backend API for real AI-generated replies with a typing indicator.
- Consent Gate: Requires the user to agree to terms before entering the chat.
- Session Memory: Stores lead info and full conversation history in localStorage across page refreshes.
- Multi-Country Support: Includes phone prefix selection for Sri Lanka, United States, United Kingdom, India, and Australia.

### AI Voice Call System
A voice agent call handler simulating business phone interactions.
- Real-time Transcription: Translates speech input directly on the screen.
- Speech Recognition and Synthesis: Utilizes browser-native speech synthesis and dictation to simulate an interactive voice call.
- Auto-Summary Generation: Formulates a structured call log summarizing caller intent and action items.

### Workflow Automation Engine
A pipeline processor showcasing how customer interactions feed directly into business CRM systems.
- Lead Assessment: Ranks and scores lead value automatically.
- Automated Step Updates: Visualizes pipeline progression from Lead Capture through Intent Scoring, CRM record creation, Follow-up scheduling, and Team summary generation.

### Intelligent Technology Suite (TechSuite)
An interactive landing section showcasing the four core AI capability modes.
- Interactive 3D Canvas Globe: A real-time WebGL-style sphere rendered on HTML Canvas using quad-mesh latitude-longitude grid, wave displacement math, and a Painter's Algorithm depth-sorted rendering system.
- Four AI Modes: Visioning (data analysis and custom model configuration), Thinking (intelligent predictions and advanced AI processing), Creating (AI-generated visuals, videos, and animations), and Automating (workflow integration and operations).
- Drag-to-Rotate Interaction: Users can click and drag the 3D sphere to rotate it freely on all axes.
- Dynamic Color States: The sphere, halo, and status text shift colors live as each mode card is hovered.

---

## Backend Intelligence and Architecture

Sinovex AI features a hybrid architecture built for maximum reliability:

1. Multi-Model LLM Routing:
   Connected to the OpenRouter API to query state-of-the-art models including `deepseek/deepseek-chat-v3`, `mistral-small-3.2-24b`, and `gemma-3-27b`.

2. Smart Client-Side Correction:
   The frontend intercepts weak or generic responses via a validation module and automatically enriches them using context-aware templates, keeping the user experience premium.

3. Local Rule-Engine Fallback:
   If LLM endpoints are rate-limited or experience downtime, the backend seamlessly routes processing to a local NLP rule engine to deliver continuous uptime.

4. Real-Time Knowledge Injection:
   Custom business details can be pasted or uploaded directly via `.txt`, `.md`, `.csv`, or `.json` files in the browser, instantly injecting this context into the active AI prompt template.

---

## Technology Stack

- Frontend: React (v19), Vite (v8), Tailwind CSS (v4), Framer Motion, Lucide React
- Backend: Node.js, Express.js (v5), Cors, Dotenv, Fetch APIs
- AI Orchestration: OpenRouter API with custom regex-based intent classification and local rule engine fallback
- Rendering: HTML Canvas API with custom 3D projection and wave displacement math

---

## Project Directory Structure

```text
sinovex-ai/
|
+-- server/
|   +-- server.js               # Express server, local rules engine, OpenRouter client, and rate limiters
|
+-- src/
|   +-- assets/                 # Logo, icons, and static design elements
|   +-- App.jsx                 # App entry point, landing page sections, footer, and page routing
|   +-- sitenavbar.jsx          # Site header navigation with mega-menu and mobile drawer
|   +-- TechSuite.jsx           # Intelligent Technology Suite with interactive 3D canvas globe
|   +-- SinexaWidget.jsx        # Embeddable floating AI chat widget with lead capture onboarding
|   +-- SinexaChat.jsx          # Full-page AI chat interface component
|   +-- platformDemo.jsx        # Multi-channel simulation panel (WhatsApp, Web, Voice, Automation)
|   +-- WhatsAppAIProduct.jsx   # WhatsApp AI service highlight page
|   +-- WebsiteAIProduct.jsx    # Web chatbot service highlight page
|   +-- VoiceAIProduct.jsx      # Voice agent service highlight page
|   +-- AutomationAIProduct.jsx # Business automation service highlight page
|   +-- Pricing.jsx             # Pricing structures and plan comparison page
|   +-- index.css               # Core styling variables and Tailwind configuration
|   +-- main.jsx                # React DOM render mounting point
|
+-- public/                     # Public static resources including avatar assets
+-- index.html                  # Main HTML document template
+-- package.json                # Project configurations and dependencies
+-- .env                        # Local environment credentials config
+-- README.md                   # Main documentation
```

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or later recommended).

### 1. Clone and Install
```bash
git clone https://github.com/senuja1/sinovex-ai.git
cd sinovex-ai
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root folder and provide your OpenRouter credentials:
```env
PORT=8787
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=deepseek/deepseek-chat-v3-0324:free
```

### 3. Run the Backend Server
```bash
node server/server.js
```

### 4. Run the Dev Client
In a separate terminal:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## Academic Credentials

**Developer**: Senuja Ekanayaka
**Degree**: Software Engineering Undergraduate
**Affiliation**: NSBM Green University
**GitHub**: [@senuja1](https://github.com/senuja1)

---

## License
This project is built for educational, research, and portfolio demonstration purposes. All rights reserved. Copyright 2026 Senuja Ekanayaka.
