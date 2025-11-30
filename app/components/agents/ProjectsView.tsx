'use client'

import { useEffect, useState } from 'react'

type Project = {
  id: string
  name: string
  description?: string
  emoji: string
  color: string
  agentCount: number
  agents: {
    id: string
    name: string
    emoji: string
  }[]
}

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([])
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())

  useEffect(() => {
    // TODO: Fetch projects from API
    // Placeholder data
    setProjects([
      {
        id: '1',
        name: 'B2B Email Campaign',
        description: 'Launch email campaign for new API product',
        emoji: '📧',
        color: '#8b4049',
        agentCount: 2,
        agents: [
          { id: '1', name: 'Marketing Strategist - B2B SaaS', emoji: '📊' },
          { id: '2', name: 'Email Copywriter - Technical', emoji: '✍️' }
        ]
      }
    ])
  }, [])

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects)
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId)
    } else {
      newExpanded.add(projectId)
    }
    setExpandedProjects(newExpanded)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-espresso mb-1">Your Projects</h2>
          <p className="text-warm-gray">Organize agents into project collections</p>
        </div>
        <button className="bg-burgundy hover:bg-coffee text-cream px-5 py-2 rounded transition-colors font-medium">
          + New Project
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="bg-parchment rounded border-2 border-dashed border-light-gray p-12 text-center">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="font-serif text-xl text-coffee mb-2">No projects yet</h3>
          <p className="text-warm-gray mb-4">Create your first project to organize agents</p>
          <button className="bg-burgundy hover:bg-coffee text-cream px-6 py-2.5 rounded transition-colors font-medium">
            Create Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map(project => {
            const isExpanded = expandedProjects.has(project.id)

            return (
              <div key={project.id} className="bg-parchment rounded border border-light-gray overflow-hidden">
                {/* Project Header */}
                <button
                  onClick={() => toggleProject(project.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-cream transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{project.emoji}</span>
                    <div className="text-left">
                      <h3 className="font-serif text-xl font-semibold text-espresso">{project.name}</h3>
                      {project.description && (
                        <p className="text-sm text-charcoal">{project.description}</p>
                      )}
                      <p className="text-sm text-warm-gray mt-1">{project.agentCount} agents</p>
                    </div>
                  </div>
                  <span className="text-warm-gray text-xl">
                    {isExpanded ? '−' : '+'}
                  </span>
                </button>

                {/* Agents in Project */}
                {isExpanded && (
                  <div className="px-6 pb-4 space-y-2">
                    {project.agents.map(agent => (
                      <div
                        key={agent.id}
                        className="bg-cream p-4 rounded border border-light-gray hover:border-burgundy transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{agent.emoji}</span>
                          <h4 className="font-medium text-coffee">{agent.name}</h4>
                        </div>
                      </div>
                    ))}
                    <button className="w-full mt-2 py-3 border-2 border-dashed border-light-gray rounded hover:border-burgundy hover:bg-cream transition-colors text-warm-gray hover:text-burgundy">
                      + Add Agent to Project
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
