'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ChatInterface from '@/app/components/chat/ChatInterface'
import AgentSelector from '@/app/components/chat/AgentSelector'
import IntelligencePanel from '@/app/components/chat/IntelligencePanel'

type Agent = {
  id: string
  name: string
  emoji: string
  defaultModel: string
}

type Project = {
  id: string
  name: string
  description: string
  emoji: string
  color: string
  agents: {
    id: string
    name: string
    emoji: string
  }[]
}

export default function ConversationPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const conversationId = params.conversationId as string

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [currentModel, setCurrentModel] = useState<string>('claude-sonnet-4')
  const [conversationTopic, setConversationTopic] = useState<string>('')
  const [showIntelligencePanel, setShowIntelligencePanel] = useState(true)
  const [project, setProject] = useState<Project | null>(null)

  // Mock agents - TODO: Fetch from project
  const agents: Agent[] = [
    { id: '1', name: 'Marketing Strategist - B2B SaaS', emoji: '📊', defaultModel: 'claude-sonnet-4' },
    { id: '2', name: 'Code Reviewer - Python Backend', emoji: '🔍', defaultModel: 'claude-sonnet-4' },
    { id: '3', name: 'Email Copywriter - Technical', emoji: '✍️', defaultModel: 'gpt-4' }
  ]

  useEffect(() => {
    // TODO: Fetch project from API
    setProject({
      id: projectId,
      name: 'B2B Email Campaign',
      description: 'Launch email campaign for new API product',
      emoji: '📧',
      color: '#8b4049',
      agents: [
        { id: '1', name: 'Marketing Strategist - B2B SaaS', emoji: '📊' },
        { id: '3', name: 'Email Copywriter - Technical', emoji: '✍️' }
      ]
    })

    // TODO: Load conversation history if existing conversation
  }, [projectId, conversationId])

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent)
    setCurrentModel(agent.defaultModel)
  }

  return (
    <div className="h-screen flex flex-col bg-cream">
      {/* Header */}
      <header className="bg-espresso text-cream border-b border-mocha flex-shrink-0">
        <div className="px-8 py-4">
          {/* Top Nav */}
          <div className="flex items-center justify-between mb-4">
            <a href="/" className="font-serif text-xl font-semibold hover:text-gold transition-colors">
              The.Cafe
            </a>
            <div className="flex gap-6">
              <a href="/projects" className="text-gold font-medium border-b-2 border-gold pb-1">
                Projects
              </a>
              <a href="/agents" className="text-parchment hover:text-gold transition-colors">
                Agents
              </a>
            </div>
          </div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-parchment mb-4">
            <a href="/projects" className="hover:text-gold transition-colors">Projects</a>
            <span>›</span>
            <a href={`/projects/${projectId}`} className="hover:text-gold transition-colors">
              {project?.emoji} {project?.name}
            </a>
            <span>›</span>
            <span className="text-cream">Conversation</span>
          </div>
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl font-semibold">Conversation</h1>
              <p className="text-parchment text-sm opacity-80">Chat with your AI agents</p>
            </div>
            {/* Intelligence Panel Toggle */}
            <button
              onClick={() => setShowIntelligencePanel(!showIntelligencePanel)}
              className="px-4 py-2 bg-mocha hover:bg-coffee rounded transition-colors text-sm"
            >
              {showIntelligencePanel ? '← Hide' : 'Show →'} Intelligence Panel
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Agent Selector */}
          <div className="bg-parchment border-b border-light-gray px-8 py-4">
            <AgentSelector
              agents={agents}
              selectedAgent={selectedAgent}
              onSelectAgent={handleAgentSelect}
              currentModel={currentModel}
              onModelChange={setCurrentModel}
            />
          </div>

          {/* Chat Interface */}
          <div className="flex-1 overflow-hidden">
            {selectedAgent ? (
              <ChatInterface
                agent={selectedAgent}
                currentModel={currentModel}
                onTopicDetected={setConversationTopic}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">☕</div>
                  <h2 className="font-serif text-2xl text-coffee mb-2">Select an agent to begin</h2>
                  <p className="text-warm-gray">Choose from your project agents or all available agents</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Intelligence Panel */}
        {showIntelligencePanel && (
          <div className="w-96 border-l border-light-gray bg-parchment overflow-y-auto">
            <IntelligencePanel
              conversationTopic={conversationTopic}
              selectedAgentId={selectedAgent?.id}
              selectedProject={project}
            />
          </div>
        )}
      </div>
    </div>
  )
}
