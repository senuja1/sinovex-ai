# Sinovex AI 🚀
### Modern Multi-Channel AI Agent & Business Automation System

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Sinovex AI is a premium, industry-grade AI automation platform designed to streamline business workflows, customer operations, and lead capture. It features live, fully simulated interfaces representing different digital customer touchpoints—all powered by a smart, multi-model Node.js orchestration backend.

---

## 🌟 Core Modules & Features

### 💬 AI WhatsApp Bot Simulation
A replica of the WhatsApp interface running on an interactive iOS mockup.
*   **Multilingual Support**: Fully understands and replies in natural **English, Sinhala, and Singlish** (Sri Lankan colloquial romanized script).
*   **Intent Detection**: Instantly recognizes greetings, price inquiries, scheduling requests, and complaints.
*   **Interactive Calls-to-Action**: Renders buttons for booking confirmation and automated transition to human agents.

### 🌐 Website AI Sales Assistant
A modern, floating live chat widget that sits on business websites.
*   **Lead Capture & Qualification**: Collects and validates visitors' contact info, business requirements, and interests.
*   **Dynamic Recommendations**: Evaluates user answers to recommend specific pricing tiers or packages.
*   **Sales Handoff**: Transitions conversations to email or direct WhatsApp links.

### 📞 AI Voice Call System
A voice agent call handler simulating business phone interactions.
*   **Real-time Transcription**: Translates speech input directly on the screen.
*   **Speech Recognition & Synthesis**: Utilizes browser-native speech synthesis and dictation to simulate an interactive voice call.
*   **Auto-Summary generation**: Formulates a structural call log summarizing caller intent and action items.

### ⚙️ Workflow Automation Engine
A pipeline processor showcasing how customer interactions feed directly into business CRM systems.
*   **Lead Assessment**: Ranks and scores lead value.
*   **Automated Step Updates**: Visualizes pipeline progression (Lead Capture ➡️ Intent Scoring ➡️ CRM record creation ➡️ Follow-up scheduling ➡️ Team summary).

---

## 🧠 Backend Intelligence & Architecture

Sinovex AI features a hybrid architecture built for maximum reliability:

1.  **Multi-Model LLM Routing**: 
    Connected to the **OpenRouter API** to query state-of-the-art models like `deepseek-chat-v3`, `gpt-oss-20b`, `mistral-small-3.2-24b`, and `gemma-3-27b`.
2.  **Smart Client-Side Correction**: 
    The frontend intercepts weak or generic responses via a validation module (`looksWeakAiReply`) and automatically enriches them using context-aware templates, keeping the user experience premium.
3.  **Local Rule-Engine Fallback**: 
    If the LLM endpoints are rate-limited or experience downtime, the backend seamlessly routes processing to a local NLP rule engine (`fallbackReply`) to deliver continuous uptime.
4.  **Real-Time Knowledge Training**:
    The system allows custom business details to be pasted or uploaded directly via `.txt`, `.md`, `.csv`, or `.json` files in the browser, instantly injecting this context into the active AI prompt template.

---

## 🛠️ Technology Stack

*   **Frontend**: React (v19), Vite (v8), Tailwind CSS (v4), Framer Motion (animations), Lucide React (icons)
*   **Backend**: Node.js, Express.js (v5), Cors, Dotenv, Fetch APIs
*   **Orchestration**: OpenRouter API & custom regex-based intent classification systems

---

## 📂 Project Directory Structure

```text
sinovex-ai/
│
├── server/
│   └── server.js               # Express server, local rules engine, OpenRouter client & rate limiters
│
├── src/
│   ├── assets/                 # Icons, vectors, and static design elements
│   ├── App.jsx                 # App entry point, landing page, and navigation routing
│   ├── sitenavbar.jsx          # Premium site header navigation component
│   ├── platformDemo.jsx        # Multi-channel simulation panel wrapper (WhatsApp, Web, Voice, Automation)
│   ├── WhatsAppAIProduct.jsx   # WhatsApp service highlight page
│   ├── WebsiteAIProduct.jsx    # Web chatbot service highlight page
│   ├── VoiceAIProduct.jsx      # Voice agent service highlight page
│   ├── AutomationAIProduct.jsx # Business automation service highlight page
│   ├── SinexaChat.jsx          # floating web widget interface component
│   ├── Pricing.jsx             # Pricing structures page
│   ├── index.css               # Core styling variables and Tailwind configuration
│   └── main.jsx                # React DOM render mounting point
│
├── public/                     # Public static resources
├── index.html                  # Main HTML document template
├── package.json                # Project configurations and dependencies
├── .env                        # Local environment credentials config
└── README.md                   # Main documentation
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/senuja1/sinovex-ai.git

# Navigate into the project folder
cd sinovex-ai

# Install dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root folder (or rename `.env.example` if available) and provide your OpenRouter credentials:
```env
PORT=8787
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=deepseek/deepseek-chat-v3-0324:free
```

### 3. Run the Backend Server
```bash
# Start Node API backend
node server/server.js
```

### 4. Run the Dev Client
In a separate terminal tab:
```bash
# Start Vite React dev server
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 🎓 Academic Credentials

**Developer**: Senuja Ekanayaka  
**Degree**: Software Engineering Undergraduate  
**Affiliation**: NSBM Green University  
**GitHub**: [@senuja1](https://github.com/senuja1)  

---

## 📜 License
This project is built for educational, research, and portfolio demonstration purposes. All rights reserved. © 2026 Senuja Ekanayaka.
