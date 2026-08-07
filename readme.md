# TruthLens

AI-powered misinformation checker. Paste a headline or claim, get a credibility score (0-100), verdict, and reasoning.

Built solo in an 8-hour hackathon.

## Tech Stack
- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express
- AI: Gemini API

## Setup

1. Clone the repo
2. In `server/`: run `npm install`, add a `.env` file with `GEMINI_API_KEY=your_key`, then `node index.js`
3. In `client/`: run `npm install`, then `npm run dev`

## Features
- Paste any headline or claim
- Get a 0-100 credibility score with color-coded gauge
- See AI reasoning and flagged red flags (emotional language, missing sources, etc.)