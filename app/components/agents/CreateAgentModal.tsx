'use client'

import { useState, useEffect } from 'react'

type CreateAgentModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (agent: NewAgent) => void
  initialDomain?: string | null
}

type NewAgent = {
  role: string
  specialization: string
  emoji: string
  domain: string
  subCategory: string
  description: string
  defaultModel: string
  systemPrompt: string
}

const DOMAINS = [
  { value: 'marketing', label: '📊 Marketing', subCategories: ['strategy', 'copywriting', 'analytics', 'advertising'] },
  { value: 'engineering', label: '⚙️ Engineering', subCategories: ['backend', 'frontend', 'devops', 'data'] },
  { value: 'design', label: '🎨 Design', subCategories: ['ui-ux', 'brand', 'motion', 'research'] },
  { value: 'content', label: '✍️ Content', subCategories: ['writing', 'editing', 'seo', 'video'] },
  { value: 'business', label: '💼 Business', subCategories: ['strategy', 'operations', 'finance', 'sales'] }
]

const AI_MODELS = [
  { value: 'claude-sonnet-4', label: 'Claude Sonnet 4' },
  { value: 'claude-opus-4', label: 'Claude Opus 4' },
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  { value: 'gemini-pro', label: 'Gemini Pro' },
  { value: 'gemini-ultra', label: 'Gemini Ultra' }
]

export default function CreateAgentModal({ isOpen, onClose, onSubmit, initialDomain }: CreateAgentModalProps) {
  const [formData, setFormData] = useState<NewAgent>({
    role: '',
    specialization: '',
    emoji: '🤖',
    domain: initialDomain || 'marketing',
    subCategory: '',
    description: '',
    defaultModel: 'claude-sonnet-4',
    systemPrompt: ''
  })

  // Update domain when initialDomain prop changes
  useEffect(() => {
    if (initialDomain) {
      setFormData(prev => ({ ...prev, domain: initialDomain }))
    }
  }, [initialDomain])

  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isOpen) return null

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required'
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization = 'Specialization is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.systemPrompt.trim()) {
      newErrors.systemPrompt = 'System prompt is required'
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
        role: '',
        specialization: '',
        emoji: '🤖',
        domain: 'marketing',
        subCategory: '',
        description: '',
        defaultModel: 'claude-sonnet-4',
        systemPrompt: ''
      })
    }
  }

  const previewName = formData.role && formData.specialization
    ? `${formData.role} - ${formData.specialization}`
    : '[Role] - [Specialization]'

  const selectedDomain = DOMAINS.find(d => d.value === formData.domain)

  return (
    <div className="fixed inset-0 bg-espresso bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-cream rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-espresso text-cream px-6 py-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold">Create New Agent</h2>
          <button onClick={onClose} className="text-cream hover:text-gold text-2xl">×</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Preview */}
          <div className="bg-parchment p-4 rounded border border-light-gray">
            <p className="text-sm text-warm-gray mb-2">Agent Name Preview:</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{formData.emoji}</span>
              <p className="font-serif text-xl text-espresso font-semibold">{previewName}</p>
            </div>
          </div>

          {/* Role & Specialization */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee mb-2">
                Role <span className="text-burgundy">*</span>
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g., Marketing Strategist"
                className={`w-full px-4 py-2.5 bg-parchment border rounded focus:outline-none focus:border-burgundy transition-colors ${
                  errors.role ? 'border-burgundy' : 'border-light-gray'
                }`}
              />
              {errors.role && <p className="text-burgundy text-sm mt-1">{errors.role}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee mb-2">
                Specialization <span className="text-burgundy">*</span>
              </label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="e.g., B2B SaaS"
                className={`w-full px-4 py-2.5 bg-parchment border rounded focus:outline-none focus:border-burgundy transition-colors ${
                  errors.specialization ? 'border-burgundy' : 'border-light-gray'
                }`}
              />
              {errors.specialization && <p className="text-burgundy text-sm mt-1">{errors.specialization}</p>}
            </div>
          </div>

          {/* Emoji */}
          <div>
            <label className="block text-sm font-medium text-coffee mb-2">
              Emoji
            </label>
            <input
              type="text"
              value={formData.emoji}
              onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
              maxLength={2}
              className="w-24 px-4 py-2.5 bg-parchment border border-light-gray rounded focus:outline-none focus:border-burgundy transition-colors text-center text-2xl"
            />
          </div>

          {/* Domain & Sub-category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee mb-2">
                Domain <span className="text-burgundy">*</span>
              </label>
              <select
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value, subCategory: '' })}
                className="w-full px-4 py-2.5 bg-parchment border border-light-gray rounded focus:outline-none focus:border-burgundy transition-colors"
              >
                {DOMAINS.map(domain => (
                  <option key={domain.value} value={domain.value}>{domain.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee mb-2">
                Sub-category
              </label>
              <select
                value={formData.subCategory}
                onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                className="w-full px-4 py-2.5 bg-parchment border border-light-gray rounded focus:outline-none focus:border-burgundy transition-colors"
              >
                <option value="">Select...</option>
                {selectedDomain?.subCategories.map(subCat => (
                  <option key={subCat} value={subCat}>{subCat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-coffee mb-2">
              Description <span className="text-burgundy">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of what this agent does..."
              rows={3}
              className={`w-full px-4 py-2.5 bg-parchment border rounded focus:outline-none focus:border-burgundy transition-colors resize-none ${
                errors.description ? 'border-burgundy' : 'border-light-gray'
              }`}
            />
            {errors.description && <p className="text-burgundy text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Default AI Model */}
          <div>
            <label className="block text-sm font-medium text-coffee mb-2">
              Default AI Model <span className="text-burgundy">*</span>
            </label>
            <select
              value={formData.defaultModel}
              onChange={(e) => setFormData({ ...formData, defaultModel: e.target.value })}
              className="w-full px-4 py-2.5 bg-parchment border border-light-gray rounded focus:outline-none focus:border-burgundy transition-colors"
            >
              {AI_MODELS.map(model => (
                <option key={model.value} value={model.value}>{model.label}</option>
              ))}
            </select>
          </div>

          {/* System Prompt */}
          <div>
            <label className="block text-sm font-medium text-coffee mb-2">
              System Prompt <span className="text-burgundy">*</span>
            </label>
            <textarea
              value={formData.systemPrompt}
              onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
              placeholder="You are a specialized AI agent that..."
              rows={6}
              className={`w-full px-4 py-2.5 bg-parchment border rounded focus:outline-none focus:border-burgundy transition-colors resize-none font-mono text-sm ${
                errors.systemPrompt ? 'border-burgundy' : 'border-light-gray'
              }`}
            />
            {errors.systemPrompt && <p className="text-burgundy text-sm mt-1">{errors.systemPrompt}</p>}
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
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
