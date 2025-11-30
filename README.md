# The.Cafe - AI Agent Operating System

One agent. Any AI model. Intelligent agent recommendations and auto-generation.

## Features

- **Multi-Model Agents**: Create agents that work across Claude, GPT-4, and Gemini
- **Agent Library**: Organize by domain, projects, or view all agents
- **Smart Recommendations**: AI analyzes your conversation and suggests relevant agents
- **Gap Detection**: Identifies missing agents you need
- **Auto-Generation**: Creates new agents based on detected gaps
- **Password Protection**: MVP access control before user authentication

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your values
```

3. Set up database:
```bash
npx prisma db push
```

4. Run development server:
```bash
npm run dev
```

Visit http://localhost:3000 and login with your MVP_PASSWORD (default: `thecafe2025`)

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `MVP_PASSWORD` - Password for MVP access
- `ANTHROPIC_API_KEY` - For Claude models
- `OPENAI_API_KEY` - For GPT-4 models
- `GOOGLE_AI_API_KEY` - For Gemini models

## Deployment

Optimized for Vercel - just import from GitHub and add environment variables.

## Tech Stack

- Next.js 15, TypeScript, Tailwind CSS
- Prisma + PostgreSQL
- Multi-AI integration (Claude, GPT-4, Gemini)
# Force rebuild
