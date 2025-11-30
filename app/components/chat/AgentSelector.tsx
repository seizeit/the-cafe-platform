'use client'

type Agent = {
  id: string
  name: string
  emoji: string
  defaultModel: string
}

type AgentSelectorProps = {
  agents: Agent[]
  selectedAgent: Agent | null
  onSelectAgent: (agent: Agent) => void
  currentModel: string
  onModelChange: (model: string) => void
}

const AI_MODELS = [
  { value: 'claude-sonnet-4', label: 'Claude Sonnet 4', color: 'burgundy' },
  { value: 'claude-opus-4', label: 'Claude Opus 4', color: 'burgundy' },
  { value: 'gpt-4', label: 'GPT-4', color: 'sage' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', color: 'sage' },
  { value: 'gemini-pro', label: 'Gemini Pro', color: 'gold' },
  { value: 'gemini-ultra', label: 'Gemini Ultra', color: 'gold' }
]

export default function AgentSelector({
  agents,
  selectedAgent,
  onSelectAgent,
  currentModel,
  onModelChange
}: AgentSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Agent Dropdown */}
      <div className="flex-1">
        <label className="block text-xs text-warm-gray mb-1">Active Agent</label>
        <select
          value={selectedAgent?.id || ''}
          onChange={(e) => {
            const agent = agents.find(a => a.id === e.target.value)
            if (agent) onSelectAgent(agent)
          }}
          className="w-full px-4 py-2.5 bg-cream border border-light-gray rounded focus:outline-none focus:border-burgundy transition-colors"
        >
          <option value="">Select an agent...</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.emoji} {agent.name}
            </option>
          ))}
        </select>
      </div>

      {/* Model Switcher */}
      {selectedAgent && (
        <div className="w-56">
          <label className="block text-xs text-warm-gray mb-1">
            AI Model
            <span className="ml-1 text-burgundy">● Live</span>
          </label>
          <select
            value={currentModel}
            onChange={(e) => onModelChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-cream border border-light-gray rounded focus:outline-none focus:border-burgundy transition-colors"
          >
            {AI_MODELS.map(model => (
              <option key={model.value} value={model.value}>
                {model.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Create New Agent */}
      <div className="pt-5">
        <button className="px-4 py-2.5 bg-burgundy hover:bg-coffee text-cream rounded transition-colors text-sm font-medium">
          + New Agent
        </button>
      </div>
    </div>
  )
}
