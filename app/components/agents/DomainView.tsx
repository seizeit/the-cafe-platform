'use client'

import { useEffect, useState } from 'react'

// Domain organization structure
const DOMAINS = {
  marketing: {
    emoji: '📊',
    label: 'Marketing',
    color: 'burgundy',
    subCategories: ['strategy', 'copywriting', 'analytics', 'advertising']
  },
  engineering: {
    emoji: '⚙️',
    label: 'Engineering',
    color: 'coffee',
    subCategories: ['backend', 'frontend', 'devops', 'data']
  },
  design: {
    emoji: '🎨',
    label: 'Design',
    color: 'gold',
    subCategories: ['ui-ux', 'brand', 'motion', 'research']
  },
  content: {
    emoji: '✍️',
    label: 'Content',
    color: 'sage',
    subCategories: ['writing', 'editing', 'seo', 'video']
  },
  business: {
    emoji: '💼',
    label: 'Business',
    color: 'mocha',
    subCategories: ['strategy', 'operations', 'finance', 'sales']
  }
}

type Agent = {
  id: string
  name: string
  emoji: string
  domain: string
  subCategory?: string
  description?: string
}

export default function DomainView() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set(Object.keys(DOMAINS)))

  useEffect(() => {
    // TODO: Fetch agents from API
    // For now, showing placeholder data
    setAgents([
      {
        id: '1',
        name: 'Marketing Strategist - B2B SaaS',
        emoji: '📊',
        domain: 'marketing',
        subCategory: 'strategy',
        description: 'Specialized in B2B SaaS marketing strategy and positioning'
      },
      {
        id: '2',
        name: 'Code Reviewer - Python Backend',
        emoji: '🔍',
        domain: 'engineering',
        subCategory: 'backend',
        description: 'Expert code reviewer for Python backend systems'
      }
    ])
  }, [])

  const toggleDomain = (domain: string) => {
    const newExpanded = new Set(expandedDomains)
    if (newExpanded.has(domain)) {
      newExpanded.delete(domain)
    } else {
      newExpanded.add(domain)
    }
    setExpandedDomains(newExpanded)
  }

  const getAgentsByDomain = (domain: string) => {
    return agents.filter(agent => agent.domain === domain)
  }

  return (
    <div className="space-y-4">
      {Object.entries(DOMAINS).map(([domainKey, domain]) => {
        const domainAgents = getAgentsByDomain(domainKey)
        const isExpanded = expandedDomains.has(domainKey)

        return (
          <div key={domainKey} className="bg-parchment rounded border border-light-gray overflow-hidden">
            {/* Domain Header */}
            <button
              onClick={() => toggleDomain(domainKey)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-cream transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{domain.emoji}</span>
                <div className="text-left">
                  <h3 className="font-serif text-xl font-semibold text-espresso">{domain.label}</h3>
                  <p className="text-sm text-warm-gray">{domainAgents.length} agents</p>
                </div>
              </div>
              <span className="text-warm-gray text-xl">
                {isExpanded ? '−' : '+'}
              </span>
            </button>

            {/* Agents List */}
            {isExpanded && (
              <div className="px-6 pb-4 space-y-2">
                {domainAgents.length === 0 ? (
                  <p className="text-warm-gray italic py-4">No agents in this domain yet</p>
                ) : (
                  domainAgents.map(agent => (
                    <div
                      key={agent.id}
                      className="bg-cream p-4 rounded border border-light-gray hover:border-burgundy transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{agent.emoji}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-coffee mb-1">{agent.name}</h4>
                          {agent.description && (
                            <p className="text-sm text-charcoal">{agent.description}</p>
                          )}
                          {agent.subCategory && (
                            <span className="inline-block mt-2 text-xs px-2 py-1 bg-parchment rounded text-warm-gray">
                              {agent.subCategory}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
