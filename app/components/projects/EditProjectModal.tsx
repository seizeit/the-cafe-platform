'use client'

import { useState } from 'react'

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

type EditProjectModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (project: Project) => void
  onDelete: (projectId: string) => void
  project: Project
}

const EMOJI_OPTIONS = ['📁', '🎯', '🚀', '💼', '⚡', '🎨', '📊', '🔧', '💡', '🌟']
const COLOR_OPTIONS = [
  { value: '#8b4049', label: 'Burgundy' },
  { value: '#c9a961', label: 'Gold' },
  { value: '#8b9a7a', label: 'Sage' },
  { value: '#6b4e3d', label: 'Mocha' },
  { value: '#4a3428', label: 'Coffee' }
]

export default function EditProjectModal({ isOpen, onClose, onSave, onDelete, project }: EditProjectModalProps) {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    emoji: project.emoji,
    color: project.color
  })

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSave({
        ...project,
        ...formData
      })
      onClose()
    }
  }

  const handleDelete = () => {
    onDelete(project.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-espresso bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-cream rounded-lg max-w-lg w-full">
        {/* Header */}
        <div className="bg-espresso text-cream px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="font-serif text-2xl font-semibold">Edit Project</h2>
          <button onClick={onClose} className="text-cream hover:text-gold text-2xl">×</button>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="bg-burgundy bg-opacity-10 border-l-4 border-burgundy p-4 m-6">
            <p className="text-coffee font-medium mb-3">Are you sure you want to delete this project and remove all agents from it?</p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-burgundy hover:bg-coffee text-cream rounded transition-colors font-medium"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-light-gray rounded hover:bg-parchment transition-colors text-coffee"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-coffee mb-2">
              Project Name <span className="text-burgundy">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2.5 bg-parchment border rounded focus:outline-none focus:border-burgundy transition-colors ${
                errors.name ? 'border-burgundy' : 'border-light-gray'
              }`}
            />
            {errors.name && <p className="text-burgundy text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-coffee mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-parchment border border-light-gray rounded focus:outline-none focus:border-burgundy transition-colors resize-none"
            />
          </div>

          {/* Emoji */}
          <div>
            <label className="block text-sm font-medium text-coffee mb-2">
              Project Icon
            </label>
            <div className="flex gap-2 flex-wrap">
              {EMOJI_OPTIONS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, emoji })}
                  className={`text-3xl p-2 rounded transition-colors ${
                    formData.emoji === emoji
                      ? 'bg-burgundy bg-opacity-20 border-2 border-burgundy'
                      : 'bg-parchment border-2 border-light-gray hover:border-burgundy'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-coffee mb-2">
              Project Color
            </label>
            <div className="flex gap-3">
              {COLOR_OPTIONS.map(color => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`w-12 h-12 rounded-full transition-all ${
                    formData.color === color.value
                      ? 'ring-4 ring-offset-2 ring-burgundy'
                      : 'hover:ring-2 ring-offset-2 ring-light-gray'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-between pt-4 border-t border-light-gray">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2.5 bg-burgundy hover:bg-coffee text-cream rounded transition-colors font-medium"
            >
              Delete Project
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-light-gray rounded hover:bg-parchment transition-colors text-coffee"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-burgundy hover:bg-coffee text-cream rounded transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
