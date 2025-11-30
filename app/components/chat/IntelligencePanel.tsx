'use client'

import { useEffect, useState } from 'react'

type IntelligencePanelProps = {
  conversationTopic: string
  selectedAgentId?: string
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

export default function IntelligencePanel({ conversationTopic, selectedAgentId }: IntelligencePanelProps) {
  const [suggestedAgents, setSuggestedAgents] = useState<SuggestedAgent[]>([])
  const [missingAgents, setMissingAgents] = useState<MissingAgent[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (conversationTopic) {
      analyzeTopicAndSuggest()
    }
  }, [conversationTopic])

  const analyzeTopicAndSuggest = async () => {
    setIsAnalyzing(true)

    // TODO: Call AI API to analyze topic and suggest agents
    // Simulating analysis
    setTimeout(() => {
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
      {!conversationTopic && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🤔</div>
          <p className="text-sm text-warm-gray">
            Start a conversation to see agent recommendations
          </p>
        </div>
      )}
    </div>
  )
}
