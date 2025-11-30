'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Project = {
  id: string
  name: string
  description: string
  emoji: string
  color: string
  agentCount: number
  conversationCount: number
}

type RecentConversation = {
  id: string
  projectId: string
  projectName: string
  projectEmoji: string
  title: string
  timestamp: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [recentConversations, setRecentConversations] = useState<RecentConversation[]>([])
  const [stats, setStats] = useState({ totalProjects: 0, totalAgents: 0, totalConversations: 0 })

  useEffect(() => {
    // TODO: Fetch from API
    setProjects([
      {
        id: '1',
        name: 'B2B Email Campaign',
        description: 'Launch email campaign for new API product',
        emoji: '📧',
        color: '#8b4049',
        agentCount: 2,
        conversationCount: 3
      }
    ])

    setRecentConversations([
      {
        id: '1',
        projectId: '1',
        projectName: 'B2B Email Campaign',
        projectEmoji: '📧',
        title: 'Email sequence strategy',
        timestamp: '2 hours ago'
      },
      {
        id: '2',
        projectId: '1',
        projectName: 'B2B Email Campaign',
        projectEmoji: '📧',
        title: 'Subject line brainstorming',
        timestamp: 'Yesterday'
      }
    ])

    setStats({
      totalProjects: 1,
      totalAgents: 3,
      totalConversations: 3
    })
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-espresso text-cream border-b border-mocha">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <a href="/" className="font-serif text-xl font-semibold hover:text-gold transition-colors">
              The.Cafe
            </a>
            <div className="flex gap-6">
              <a href="/projects" className="text-parchment hover:text-gold transition-colors">
                Projects
              </a>
              <a href="/agents" className="text-parchment hover:text-gold transition-colors">
                Agents
              </a>
            </div>
          </div>
          <div>
            <h1 className="font-serif text-3xl font-semibold mb-1">Dashboard</h1>
            <p className="text-parchment text-sm opacity-80">Your AI Agent workspace</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-parchment p-6 rounded border-2 border-light-gray">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warm-gray mb-1">Projects</p>
                <p className="text-3xl font-serif font-semibold text-espresso">{stats.totalProjects}</p>
              </div>
              <span className="text-4xl">📁</span>
            </div>
          </div>
          <div className="bg-parchment p-6 rounded border-2 border-light-gray">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warm-gray mb-1">Agents</p>
                <p className="text-3xl font-serif font-semibold text-espresso">{stats.totalAgents}</p>
              </div>
              <span className="text-4xl">🤖</span>
            </div>
          </div>
          <div className="bg-parchment p-6 rounded border-2 border-light-gray">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warm-gray mb-1">Conversations</p>
                <p className="text-3xl font-serif font-semibold text-espresso">{stats.totalConversations}</p>
              </div>
              <span className="text-4xl">💬</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Projects */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl font-semibold text-espresso">Active Projects</h2>
              <Link
                href="/projects"
                className="text-sm bg-burgundy hover:bg-coffee text-cream px-4 py-2 rounded transition-colors"
              >
                + New Project
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="bg-parchment rounded border-2 border-dashed border-light-gray p-12 text-center">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="font-serif text-xl text-coffee mb-2">No projects yet</h3>
                <p className="text-warm-gray mb-4">Create your first project to get started</p>
                <Link
                  href="/projects"
                  className="inline-block bg-burgundy hover:bg-coffee text-cream px-6 py-2.5 rounded transition-colors font-medium"
                >
                  Create Project
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map(project => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block bg-parchment p-6 rounded border-2 border-light-gray hover:border-burgundy transition-all"
                    style={{ borderColor: project.color }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{project.emoji}</span>
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-espresso">{project.name}</h3>
                          <p className="text-sm text-charcoal">{project.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-warm-gray">
                      <div>
                        <span className="font-medium text-coffee">{project.agentCount}</span> agents
                      </div>
                      <div>
                        <span className="font-medium text-coffee">{project.conversationCount}</span> conversations
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Conversations & Quick Actions */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-espresso mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/projects"
                  className="block bg-burgundy hover:bg-coffee text-cream p-4 rounded transition-colors text-center font-medium"
                >
                  + New Project
                </Link>
                <Link
                  href="/agents"
                  className="block bg-parchment hover:bg-cream border border-light-gray text-coffee p-4 rounded transition-colors text-center font-medium"
                >
                  Browse Agents
                </Link>
              </div>
            </div>

            {/* Recent Conversations */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-espresso mb-4">Recent Conversations</h2>
              {recentConversations.length === 0 ? (
                <div className="bg-parchment rounded border-2 border-dashed border-light-gray p-6 text-center">
                  <div className="text-4xl mb-2">💬</div>
                  <p className="text-sm text-warm-gray">No conversations yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentConversations.map(conversation => (
                    <Link
                      key={conversation.id}
                      href={`/projects/${conversation.projectId}/chat/${conversation.id}`}
                      className="block bg-parchment p-4 rounded border border-light-gray hover:border-burgundy transition-colors"
                    >
                      <div className="flex items-start gap-2 mb-1">
                        <span className="text-xl">{conversation.projectEmoji}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-coffee text-sm">{conversation.title}</h4>
                          <p className="text-xs text-warm-gray">{conversation.projectName}</p>
                        </div>
                      </div>
                      <p className="text-xs text-warm-gray">{conversation.timestamp}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
