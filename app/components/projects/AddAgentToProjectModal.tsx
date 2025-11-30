'use client'

import { useState } from 'react'

type Agent = {
  id: string
  name: string
  emoji: string
}

type AddAgentToProjectModalProps = {
  isOpen: boolean
  onClose: () => void
  onAdd: (agentIds: string[]) => void
  availableAgents: Agent[]
  projectName: string
}

export default function AddAgentToProjectModal({
  isOpen,
  onClose,
  onAdd,
  availableAgents,
  projectName
}: AddAgentToProjectModalProps) {
  const [selectedAgents, setSelectedAgents] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')

  if (!isOpen) return null

  const filteredAgents = availableAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleAgent = (agentId: string) => {
    const newSelected = new Set(selectedAgents)
    if (newSelected.has(agentId)) {
      newSelected.delete(agentId)
    } else {
      newSelected.add(agentId)
    }
    setSelectedAgents(newSelected)
  }

  const handleAdd = () => {
    onAdd(Array.from(selectedAgents))
    setSelectedAgents(new Set())
    setSearchQuery('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-espresso bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-cream rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-espresso text-cream px-6 py-4 flex items-center justify-between rounded-t-lg flex-shrink-0">
          <div>
            <h2 className="font-serif text-2xl font-semibold">Add Agents to Project</h2>
            <p className="text-sm text-parchment opacity-80">{projectName}</p>
          </div>
          <button onClick={onClose} className="text-cream hover:text-gold text-2xl">×</button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-light-gray flex-shrink-0">
          <input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-parchment border border-light-gray rounded focus:outline-none focus:border-burgundy transition-colors"
          />
        </div>

        {/* Agent List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredAgents.length === 0 ? (
            <div className="text-center py-8 text-warm-gray">
              {availableAgents.length === 0
                ? 'No agents available to add'
                : `No agents match "${searchQuery}"`}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredAgents.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => toggleAgent(agent.id)}
                  className={`w-full p-4 rounded border-2 transition-all text-left ${
                    selectedAgents.has(agent.id)
                      ? 'border-burgundy bg-burgundy bg-opacity-10'
                      : 'border-light-gray hover:border-burgundy bg-parchment'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{agent.emoji}</span>
                    <span className="font-medium text-coffee flex-1">{agent.name}</span>
                    {selectedAgents.has(agent.id) && (
                      <span className="text-burgundy font-medium">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-light-gray flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-warm-gray">
              {selectedAgents.size} {selectedAgents.size === 1 ? 'agent' : 'agents'} selected
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-light-gray rounded hover:bg-parchment transition-colors text-coffee"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={selectedAgents.size === 0}
              className={`px-6 py-2.5 rounded transition-colors font-medium ${
                selectedAgents.size > 0
                  ? 'bg-burgundy hover:bg-coffee text-cream'
                  : 'bg-light-gray text-warm-gray cursor-not-allowed'
              }`}
            >
              Add {selectedAgents.size > 0 && `(${selectedAgents.size})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
