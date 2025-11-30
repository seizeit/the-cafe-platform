'use client'

import { useState } from 'react'

type NewProject = {
  name: string
  description: string
  emoji: string
  color: string
}

type CreateProjectModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (project: NewProject) => void
}

const EMOJI_OPTIONS = ['📁', '🎯', '🚀', '💼', '⚡', '🎨', '📊', '🔧', '💡', '🌟']
const COLOR_OPTIONS = [
  { value: '#8b4049', label: 'Burgundy' },
  { value: '#c9a961', label: 'Gold' },
  { value: '#8b9a7a', label: 'Sage' },
  { value: '#6b4e3d', label: 'Mocha' },
  { value: '#4a3428', label: 'Coffee' }
]

export default function CreateProjectModal({ isOpen, onClose, onSubmit }: CreateProjectModalProps) {
  const [formData, setFormData] = useState<NewProject>({
    name: '',
    description: '',
    emoji: '📁',
    color: '#8b4049'
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
      onClose()
      // Reset form
      setFormData({
        name: '',
        description: '',
        emoji: '📁',
        color: '#8b4049'
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-espresso bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-cream rounded-lg max-w-lg w-full">
        {/* Header */}
        <div className="bg-espresso text-cream px-6 py-4 flex items-center justify-between rounded-t-lg">
          <h2 className="font-serif text-2xl font-semibold">Create New Project</h2>
          <button onClick={onClose} className="text-cream hover:text-gold text-2xl">×</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-coffee mb-2">
              Project Name <span className="text-burgundy">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., B2B Email Campaign"
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
              placeholder="Brief description of this project..."
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
          <div className="flex gap-3 justify-end pt-4 border-t border-light-gray">
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
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
