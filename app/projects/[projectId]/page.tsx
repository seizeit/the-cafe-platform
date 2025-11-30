'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AddAgentToProjectModal from '@/app/components/projects/AddAgentToProjectModal'

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

type Agent = {
  id: string
  name: string
  emoji: string
}

type Conversation = {
  id: string
  title: string
  lastMessage: string
  timestamp: string
  agentUsed: string
}

type MissingAgent = {
  suggestedName: string
  emoji: string
  reasoning: string
  domain: string
}

export default function ProjectDetailPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string

  const [project, setProject] = useState<Project | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [missingAgents, setMissingAgents] = useState<MissingAgent[]>([])
  const [isAddAgentModalOpen, setIsAddAgentModalOpen] = useState(false)

  // Mock all available agents - TODO: Fetch from API
  const allAgents: Agent[] = [
    { id: '1', name: 'Marketing Strategist - B2B SaaS', emoji: '📊' },
    { id: '2', name: 'Code Reviewer - Python Backend', emoji: '🔍' },
    { id: '3', name: 'Email Copywriter - Technical', emoji: '✍️' }
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

    // TODO: Fetch conversations from API
    setConversations([
      {
        id: '1',
        title: 'Email sequence strategy',
        lastMessage: 'Let\'s focus on nurturing leads...',
        timestamp: '2 hours ago',
        agentUsed: 'Marketing Strategist'
      },
      {
        id: '2',
        title: 'Subject line brainstorming',
        lastMessage: 'Here are 10 compelling subject lines...',
        timestamp: 'Yesterday',
        agentUsed: 'Email Copywriter'
      }
    ])

    // Analyze project and detect gaps
    setMissingAgents([
      {
        suggestedName: 'Campaign Manager - Drip Sequences',
        emoji: '📧',
        reasoning: 'Missing automation expertise for email sequencing',
        domain: 'marketing'
      },
      {
        suggestedName: 'Data Analyst - Email Metrics',
        emoji: '📈',
        reasoning: 'No agent to track campaign performance and ROI',
        domain: 'analytics'
      },
      {
        suggestedName: 'A/B Test Specialist',
        emoji: '🧪',
        reasoning: 'Could optimize email variations for better conversion',
        domain: 'optimization'
      }
    ])
  }, [projectId])

  const handleAddAgentsToProject = (agentIds: string[]) => {
    if (!project) return

    const newAgents = allAgents.filter(a => agentIds.includes(a.id) && !project.agents.some(pa => pa.id === a.id))

    setProject({
      ...project,
      agents: [...project.agents, ...newAgents]
    })
  }

  const handleRemoveAgentFromProject = (agentId: string) => {
    if (!project) return

    setProject({
      ...project,
      agents: project.agents.filter(a => a.id !== agentId)
    })
  }

  const getAvailableAgents = () => {
    if (!project) return allAgents
    return allAgents.filter(a => !project.agents.some(pa => pa.id === a.id))
  }

  const handleAutoGenerate = (agent: MissingAgent) => {
    // TODO: Call API to auto-generate agent
    console.log('Auto-generating agent:', agent)
  }

  const handleStartConversation = () => {
    // Create new conversation and navigate to it
    const newConversationId = Date.now().toString()
    router.push(`/projects/${projectId}/chat/${newConversationId}`)
  }

  const handleOpenConversation = (conversationId: string) => {
    router.push(`/projects/${projectId}/chat/${conversationId}`)
  }

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-espresso text-cream border-b border-mocha">
        <div className="max-w-7xl mx-auto px-8 py-4">
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
            <span className="text-cream">{project.name}</span>
          </div>
          {/* Project Header */}
          <div className="flex items-center gap-4">
            <span className="text-5xl">{project.emoji}</span>
            <div className="flex-1">
              <h1 className="font-serif text-3xl font-semibold mb-1">{project.name}</h1>
              <p className="text-parchment text-sm opacity-80">{project.description}</p>
            </div>
            <button
              onClick={handleStartConversation}
              className="bg-burgundy hover:bg-coffee text-cream px-6 py-2.5 rounded transition-colors font-medium"
            >
              + New Conversation
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Agents & Intelligence */}
          <div className="lg:col-span-2 space-y-8">
            {/* Agents in Project */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-2xl font-semibold text-espresso">Agents</h2>
                <button
                  onClick={() => setIsAddAgentModalOpen(true)}
                  className="text-sm bg-burgundy hover:bg-coffee text-cream px-4 py-2 rounded transition-colors"
                >
                  + Add Agent
                </button>
              </div>
              <div className="space-y-3">
                {project.agents.map(agent => (
                  <div
                    key={agent.id}
                    className="bg-parchment p-4 rounded border border-light-gray hover:border-burgundy transition-colors group"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">{agent.emoji}</span>
                        <h4 className="font-medium text-coffee">{agent.name}</h4>
                      </div>
                      <button
                        onClick={() => handleRemoveAgentFromProject(agent.id)}
                        className="opacity-0 group-hover:opacity-100 px-3 py-1 text-sm bg-burgundy hover:bg-coffee text-cream rounded transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Project Intelligence */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-serif text-2xl font-semibold text-espresso">Project Intelligence</h2>
                <span className="px-2 py-0.5 bg-gold bg-opacity-20 text-xs rounded text-coffee font-medium">
                  ✨ Auto-generate
                </span>
              </div>
              <div className="space-y-3">
                {missingAgents.map((agent, index) => (
                  <div
                    key={index}
                    className="bg-cream p-4 rounded border-2 border-dashed border-light-gray hover:border-gold transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{agent.emoji}</span>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-coffee mb-1">{agent.suggestedName}</h5>
                        <p className="text-xs text-charcoal mb-2">{agent.reasoning}</p>
                        <span className="inline-block text-xs px-2 py-0.5 bg-parchment rounded text-warm-gray">
                          {agent.domain}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAutoGenerate(agent)}
                      className="w-full px-3 py-2 bg-gold hover:bg-coffee text-espresso hover:text-cream rounded text-sm font-medium transition-colors"
                    >
                      ✨ Generate Agent
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Conversations */}
          <div>
            <h2 className="font-serif text-2xl font-semibold text-espresso mb-4">Conversations</h2>
            {conversations.length === 0 ? (
              <div className="bg-parchment rounded border-2 border-dashed border-light-gray p-8 text-center">
                <div className="text-4xl mb-2">💬</div>
                <p className="text-sm text-warm-gray mb-3">No conversations yet</p>
                <button
                  onClick={handleStartConversation}
                  className="text-sm bg-burgundy hover:bg-coffee text-cream px-4 py-2 rounded transition-colors"
                >
                  Start First Conversation
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {conversations.map(conversation => (
                  <button
                    key={conversation.id}
                    onClick={() => handleOpenConversation(conversation.id)}
                    className="w-full bg-parchment p-4 rounded border border-light-gray hover:border-burgundy transition-colors text-left"
                  >
                    <h4 className="font-medium text-coffee mb-1">{conversation.title}</h4>
                    <p className="text-sm text-charcoal mb-2 line-clamp-1">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between text-xs text-warm-gray">
                      <span>{conversation.agentUsed}</span>
                      <span>{conversation.timestamp}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Agent Modal */}
      <AddAgentToProjectModal
        isOpen={isAddAgentModalOpen}
        onClose={() => setIsAddAgentModalOpen(false)}
        onAdd={handleAddAgentsToProject}
        availableAgents={getAvailableAgents()}
        projectName={project.name}
      />
    </div>
  )
}
