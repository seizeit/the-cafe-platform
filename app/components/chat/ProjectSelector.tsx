'use client'

type Project = {
  id: string
  name: string
  description: string
  emoji: string
  color: string
}

type ProjectSelectorProps = {
  projects: Project[]
  selectedProject: Project | null
  onSelectProject: (project: Project | null) => void
}

export default function ProjectSelector({
  projects,
  selectedProject,
  onSelectProject
}: ProjectSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-coffee whitespace-nowrap">
        Project Context:
      </label>
      <select
        value={selectedProject?.id || ''}
        onChange={(e) => {
          const project = projects.find(p => p.id === e.target.value)
          onSelectProject(project || null)
        }}
        className="flex-1 px-4 py-2 bg-cream border border-light-gray rounded focus:outline-none focus:border-burgundy transition-colors text-coffee"
      >
        <option value="">No project selected</option>
        {projects.map(project => (
          <option key={project.id} value={project.id}>
            {project.emoji} {project.name}
          </option>
        ))}
      </select>
      {selectedProject && (
        <button
          onClick={() => onSelectProject(null)}
          className="px-3 py-2 text-sm text-warm-gray hover:text-burgundy transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  )
}
