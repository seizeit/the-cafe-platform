'use client'

import { useState } from 'react'
import DomainView from '@/app/components/agents/DomainView'
import ProjectsView from '@/app/components/agents/ProjectsView'
import AllAgentsView from '@/app/components/agents/AllAgentsView'
import CreateAgentModal from '@/app/components/agents/CreateAgentModal'

type ViewType = 'domain' | 'projects' | 'all'

export default function AgentsPage() {
  const [activeView, setActiveView] = useState<ViewType>('domain')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleCreateAgent = (agentData: any) => {
    // TODO: Save agent to database via API
    console.log('Creating agent:', agentData)
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-espresso text-cream border-b border-mocha">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-semibold mb-1">Agent Library</h1>
              <p className="text-parchment text-sm opacity-80">Your conversational AI workforce</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-burgundy hover:bg-coffee text-cream px-6 py-2.5 rounded transition-colors font-medium"
            >
              + New Agent
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-parchment border-b border-light-gray">
        <div className="max-w-7xl mx-auto px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveView('domain')}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                activeView === 'domain'
                  ? 'border-burgundy text-espresso'
                  : 'border-transparent text-warm-gray hover:text-coffee'
              }`}
            >
              📁 Domain Hierarchy
            </button>
            <button
              onClick={() => setActiveView('projects')}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                activeView === 'projects'
                  ? 'border-burgundy text-espresso'
                  : 'border-transparent text-warm-gray hover:text-coffee'
              }`}
            >
              🎯 Projects
            </button>
            <button
              onClick={() => setActiveView('all')}
              className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                activeView === 'all'
                  ? 'border-burgundy text-espresso'
                  : 'border-transparent text-warm-gray hover:text-coffee'
              }`}
            >
              🤖 All Agents
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {activeView === 'domain' && <DomainView />}
        {activeView === 'projects' && <ProjectsView />}
        {activeView === 'all' && <AllAgentsView />}
      </main>

      {/* Create Agent Modal */}
      <CreateAgentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAgent}
      />
    </div>
  )
}
