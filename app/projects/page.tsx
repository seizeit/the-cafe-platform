'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CreateProjectModal from '@/app/components/projects/CreateProjectModal'
import EditProjectModal from '@/app/components/projects/EditProjectModal'

type Project = {
  id: string
  name: string
  description: string
  emoji: string
  color: string
  agentCount: number
  conversationCount: number
  agents: {
    id: string
    name: string
    emoji: string
  }[]
}

export default function ProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  useEffect(() => {
    // TODO: Fetch projects from API
    setProjects([
      {
        id: '1',
        name: 'B2B Email Campaign',
        description: 'Launch email campaign for new API product',
        emoji: '📧',
        color: '#8b4049',
        agentCount: 2,
        conversationCount: 3,
        agents: [
          { id: '1', name: 'Marketing Strategist - B2B SaaS', emoji: '📊' },
          { id: '3', name: 'Email Copywriter - Technical', emoji: '✍️' }
        ]
      }
    ])
  }, [])

  const handleCreateProject = (projectData: any) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData,
      agentCount: 0,
      conversationCount: 0,
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

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`)
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
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-semibold mb-1">Projects</h1>
              <p className="text-parchment text-sm opacity-80">Organize agents and conversations by project</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-burgundy hover:bg-coffee text-cream px-6 py-2.5 rounded transition-colors font-medium"
            >
              + New Project
            </button>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {projects.length === 0 ? (
          <div className="bg-parchment rounded border-2 border-dashed border-light-gray p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="font-serif text-xl text-coffee mb-2">No projects yet</h3>
            <p className="text-warm-gray mb-4">Create your first project to organize agents and conversations</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-burgundy hover:bg-coffee text-cream px-6 py-2.5 rounded transition-colors font-medium"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div
                key={project.id}
                className="bg-parchment rounded border-2 border-light-gray hover:border-burgundy transition-all cursor-pointer group"
                style={{ borderColor: project.color }}
              >
                {/* Project Card */}
                <div onClick={() => handleProjectClick(project.id)} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{project.emoji}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditProject(project)
                      }}
                      className="opacity-0 group-hover:opacity-100 px-3 py-1 text-sm bg-parchment hover:bg-burgundy hover:text-cream rounded transition-all"
                    >
                      Edit
                    </button>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-espresso mb-2">{project.name}</h3>
                  <p className="text-sm text-charcoal mb-4 line-clamp-2">{project.description}</p>

                  {/* Stats */}
                  <div className="flex gap-4 text-sm text-warm-gray">
                    <div>
                      <span className="font-medium text-coffee">{project.agentCount}</span> agents
                    </div>
                    <div>
                      <span className="font-medium text-coffee">{project.conversationCount}</span> conversations
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

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
    </div>
  )
}
