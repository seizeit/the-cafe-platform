'use client'

import { useEffect, useState } from 'react'

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

type IntelligencePanelProps = {
  conversationTopic: string
  selectedAgentId?: string
  selectedProject: Project | null
}

type SuggestedAgent = {
  id: string
  name: string
  emoji: string
  matchReason: string
  matchScore: number
}

type MissingAgent = {
  suggestedName: string
  emoji: string
  reasoning: string
  domain: string
}

export default function IntelligencePanel({ conversationTopic, selectedAgentId, selectedProject }: IntelligencePanelProps) {
  const [suggestedAgents, setSuggestedAgents] = useState<SuggestedAgent[]>([])
  const [missingAgents, setMissingAgents] = useState<MissingAgent[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (conversationTopic || selectedProject) {
      analyzeTopicAndSuggest()
    }
  }, [conversationTopic, selectedProject])

  const analyzeTopicAndSuggest = async () => {
    setIsAnalyzing(true)

    // TODO: Call AI API to analyze topic and suggest agents
    // Project-aware analysis: If project is selected, analyze based on project context
    setTimeout(() => {
      if (selectedProject) {
        // Project-aware mode: Show agents in project and detect gaps
        const projectAgentIds = selectedProject.agents.map(a => a.id)

        // Suggest agents from the project that are relevant to the topic
        setSuggestedAgents([
          {
            id: '1',
            name: 'Marketing Strategist - B2B SaaS',
            emoji: '📊',
            matchReason: `Already in "${selectedProject.name}" - perfect for strategy`,
            matchScore: 98
          },
          {
            id: '3',
            name: 'Email Copywriter - Technical',
            emoji: '✍️',
            matchReason: `Already in "${selectedProject.name}" - handles copy`,
            matchScore: 92
          }
        ])

        // Detect gaps specific to this project
        setMissingAgents([
          {
            suggestedName: 'Campaign Manager - Drip Sequences',
            emoji: '📧',
            reasoning: `Missing from "${selectedProject.name}" - needed for email automation and sequencing`,
            domain: 'marketing'
          },
          {
            suggestedName: 'Data Analyst - Email Metrics',
            emoji: '📈',
            reasoning: `Gap in "${selectedProject.name}" - would track campaign performance and ROI`,
            domain: 'analytics'
          },
          {
            suggestedName: 'A/B Test Specialist',
            emoji: '🧪',
            reasoning: `Not in project - could optimize email variations and improve conversion rates`,
            domain: 'optimization'
          }
        ])
      } else {
        // General mode: Standard topic-based recommendations
        setSuggestedAgents([
          {
            id: '1',
            name: 'Marketing Strategist - B2B SaaS',
            emoji: '📊',
            matchReason: 'Expertise in B2B strategy and positioning',
            matchScore: 95
          },
          {
            id: '3',
            name: 'Email Copywriter - Technical',
            emoji: '✍️',
            matchReason: 'Can craft compelling technical email copy',
            matchScore: 88
          }
        ])

        setMissingAgents([
          {
            suggestedName: 'Campaign Manager - Drip Sequences',
            emoji: '📧',
            reasoning: 'Detected need for email campaign automation and sequencing expertise',
            domain: 'marketing'
          },
          {
            suggestedName: 'Data Analyst - Email Metrics',
            emoji: '📈',
            reasoning: 'Would help analyze campaign performance and optimize metrics',
            domain: 'analytics'
          }
        ])
      }

      setIsAnalyzing(false)
    }, 1500)
  }

  const handleAutoGenerate = (agent: MissingAgent) => {
    // TODO: Call API to auto-generate agent
    console.log('Auto-generating agent:', agent)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h3 className="font-serif text-lg font-semibold text-espresso mb-1">Intelligence Panel</h3>
        <p className="text-sm text-warm-gray">AI-powered agent recommendations</p>
      </div>

      {/* Project Context */}
      {selectedProject && (
        <div className="bg-cream p-4 rounded border-2 border-light-gray" style={{ borderColor: selectedProject.color }}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">{selectedProject.emoji}</span>
            <div className="flex-1">
              <h4 className="font-medium text-coffee mb-1">{selectedProject.name}</h4>
              <p className="text-sm text-charcoal">{selectedProject.description}</p>
            </div>
          </div>

          {/* Project Agents */}
          {selectedProject.agents.length > 0 && (
            <div className="mt-3 pt-3 border-t border-light-gray">
              <p className="text-xs font-medium text-warm-gray mb-2">AGENTS IN PROJECT</p>
              <div className="space-y-1">
                {selectedProject.agents.map(agent => (
                  <div key={agent.id} className="flex items-center gap-2 text-sm">
                    <span>{agent.emoji}</span>
                    <span className="text-coffee">{agent.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Topic Analysis */}
      {conversationTopic && (
        <div className="bg-cream p-4 rounded border border-light-gray">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-xl">🎯</span>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-coffee mb-1">Detected Topic</h4>
              <p className="text-sm text-charcoal">{conversationTopic}</p>
            </div>
          </div>
          {isAnalyzing && (
            <p className="text-xs text-warm-gray mt-2">Analyzing and recommending agents...</p>
          )}
        </div>
      )}

      {/* Suggested Agents */}
      {suggestedAgents.length > 0 && (
        <div>
          <h4 className="font-medium text-coffee mb-3">Suggested Agents</h4>
          <div className="space-y-2">
            {suggestedAgents.map(agent => (
              <div
                key={agent.id}
                className={`p-3 rounded border transition-all cursor-pointer ${
                  agent.id === selectedAgentId
                    ? 'bg-burgundy bg-opacity-10 border-burgundy'
                    : 'bg-cream border-light-gray hover:border-burgundy'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl">{agent.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-coffee mb-1">{agent.name}</h5>
                    <p className="text-xs text-charcoal">{agent.matchReason}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-light-gray rounded-full overflow-hidden">
                        <div
                          className="h-full bg-burgundy rounded-full"
                          style={{ width: `${agent.matchScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-warm-gray font-medium">{agent.matchScore}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Agents - Gap Detection */}
      {missingAgents.length > 0 && (
        <div>
          <h4 className="font-medium text-coffee mb-3 flex items-center gap-2">
            <span>Missing Agents</span>
            <span className="px-2 py-0.5 bg-gold bg-opacity-20 text-xs rounded text-coffee font-medium">
              ✨ Auto-generate
            </span>
          </h4>
          <div className="space-y-3">
            {missingAgents.map((agent, index) => (
              <div
                key={index}
                className="p-3 rounded border-2 border-dashed border-light-gray bg-cream hover:border-gold transition-colors"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-xl">{agent.emoji}</span>
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
                  className="w-full mt-2 px-3 py-2 bg-gold hover:bg-coffee text-espresso hover:text-cream rounded text-sm font-medium transition-colors"
                >
                  ✨ Generate Agent
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!conversationTopic && !selectedProject && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🤔</div>
          <p className="text-sm text-warm-gray">
            Select a project or start a conversation to see agent recommendations
          </p>
        </div>
      )}
    </div>
  )
}
