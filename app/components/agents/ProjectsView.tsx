'use client'

import { useEffect, useState } from 'react'
import CreateProjectModal from '../projects/CreateProjectModal'
import EditProjectModal from '../projects/EditProjectModal'
import AddAgentToProjectModal from '../projects/AddAgentToProjectModal'

type Project = {
  id: string
  name: string
  description: string
  emoji: string
  color: string
  agentCount: number
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

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([])
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddAgentModalOpen, setIsAddAgentModalOpen] = useState(false)
  const [currentProjectForAgents, setCurrentProjectForAgents] = useState<string | null>(null)

  // Mock all available agents - TODO: Fetch from API
  const allAgents: Agent[] = [
    { id: '1', name: 'Marketing Strategist - B2B SaaS', emoji: '📊' },
    { id: '2', name: 'Code Reviewer - Python Backend', emoji: '🔍' },
    { id: '3', name: 'Email Copywriter - Technical', emoji: '✍️' }
  ]

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

  const handleCreateProject = (projectData: any) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData,
      agentCount: 0,
      agents: []
    }
    setProjects([...projects, newProject])
  }

  const handleEditProject = (project: Project) => {
    setSelectedProject(project)
    setIsEditModalOpen(true)
  }

  const handleSaveProject = (updatedProject: Project) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p))
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId))
  }

  const handleOpenAddAgents = (projectId: string) => {
    setCurrentProjectForAgents(projectId)
    setIsAddAgentModalOpen(true)
  }

  const handleAddAgentsToProject = (agentIds: string[]) => {
    if (!currentProjectForAgents) return

    const project = projects.find(p => p.id === currentProjectForAgents)
    if (!project) return

    const newAgents = allAgents.filter(a => agentIds.includes(a.id) && !project.agents.some(pa => pa.id === a.id))

    setProjects(projects.map(p => {
      if (p.id === currentProjectForAgents) {
        return {
          ...p,
          agents: [...p.agents, ...newAgents],
          agentCount: p.agents.length + newAgents.length
        }
      }
      return p
    }))
  }

  const handleRemoveAgentFromProject = (projectId: string, agentId: string) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        const updatedAgents = p.agents.filter(a => a.id !== agentId)
        return {
          ...p,
          agents: updatedAgents,
          agentCount: updatedAgents.length
        }
      }
      return p
    }))
  }

  const getAvailableAgents = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return allAgents
    return allAgents.filter(a => !project.agents.some(pa => pa.id === a.id))
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-espresso mb-1">Your Projects</h2>
          <p className="text-warm-gray">Organize agents into project collections</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-burgundy hover:bg-coffee text-cream px-5 py-2 rounded transition-colors font-medium"
        >
          + New Project
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="bg-parchment rounded border-2 border-dashed border-light-gray p-12 text-center">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="font-serif text-xl text-coffee mb-2">No projects yet</h3>
          <p className="text-warm-gray mb-4">Create your first project to organize agents</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-burgundy hover:bg-coffee text-cream px-6 py-2.5 rounded transition-colors font-medium"
          >
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
                <div className="px-6 py-4 flex items-center justify-between hover:bg-cream transition-colors">
                  <button
                    onClick={() => toggleProject(project.id)}
                    className="flex-1 flex items-center gap-3 text-left"
                  >
                    <span className="text-2xl">{project.emoji}</span>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-espresso">{project.name}</h3>
                      {project.description && (
                        <p className="text-sm text-charcoal">{project.description}</p>
                      )}
                      <p className="text-sm text-warm-gray mt-1">{project.agentCount} agents</p>
                    </div>
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEditProject(project)}
                      className="px-4 py-2 text-sm bg-parchment hover:bg-burgundy hover:text-cream rounded transition-colors"
                    >
                      Edit
                    </button>
                    <span className="text-warm-gray text-xl">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </div>
                </div>

                {/* Agents in Project */}
                {isExpanded && (
                  <div className="px-6 pb-4 space-y-2">
                    {project.agents.map(agent => (
                      <div
                        key={agent.id}
                        className="bg-cream p-4 rounded border border-light-gray hover:border-burgundy transition-colors group"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-2xl">{agent.emoji}</span>
                            <h4 className="font-medium text-coffee">{agent.name}</h4>
                          </div>
                          <button
                            onClick={() => handleRemoveAgentFromProject(project.id, agent.id)}
                            className="opacity-0 group-hover:opacity-100 px-3 py-1 text-sm bg-burgundy hover:bg-coffee text-cream rounded transition-all"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => handleOpenAddAgents(project.id)}
                      className="w-full mt-2 py-3 border-2 border-dashed border-light-gray rounded hover:border-burgundy hover:bg-cream transition-colors text-warm-gray hover:text-burgundy"
                    >
                      + Add Agent to Project
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Modals */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      {selectedProject && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProject}
          onDelete={handleDeleteProject}
          project={selectedProject}
        />
      )}

      {currentProjectForAgents && (
        <AddAgentToProjectModal
          isOpen={isAddAgentModalOpen}
          onClose={() => setIsAddAgentModalOpen(false)}
          onAdd={handleAddAgentsToProject}
          availableAgents={getAvailableAgents(currentProjectForAgents)}
          projectName={projects.find(p => p.id === currentProjectForAgents)?.name || ''}
        />
      )}
    </div>
  )
}
