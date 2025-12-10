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
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-8 py-8 geometric-bg">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-light">Your AI Agent workspace</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-charcoal p-6 rounded border border-gray-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-light mb-1">Projects</p>
                <p className="text-3xl font-semibold text-white">{stats.totalProjects}</p>
              </div>
              <span className="text-4xl">📁</span>
            </div>
          </div>
          <div className="bg-charcoal p-6 rounded border border-gray-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-light mb-1">Agents</p>
                <p className="text-3xl font-semibold text-white">{stats.totalAgents}</p>
              </div>
              <span className="text-4xl">🤖</span>
            </div>
          </div>
          <div className="bg-charcoal p-6 rounded border border-gray-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-light mb-1">Conversations</p>
                <p className="text-3xl font-semibold text-white">{stats.totalConversations}</p>
              </div>
              <span className="text-4xl">💬</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Projects */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">Active Projects</h2>
              <Link
                href="/projects"
                className="text-sm bg-burgundy hover:opacity-90 text-white px-4 py-2 rounded transition-opacity"
              >
                + New Project
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="bg-charcoal rounded border-2 border-dashed border-gray-dark p-12 text-center">
                <div className="text-6xl mb-4">📁</div>
                <h3 className="text-xl text-white mb-2">No projects yet</h3>
                <p className="text-gray-light mb-4">Create your first project to get started</p>
                <Link
                  href="/projects"
                  className="inline-block bg-burgundy hover:opacity-90 text-white px-6 py-2.5 rounded transition-opacity font-medium"
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
                    className="block bg-charcoal p-6 rounded border border-gray-dark hover:border-red transition-all"
                    style={{ borderColor: project.color }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{project.emoji}</span>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                          <p className="text-sm text-gray-light">{project.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-light">
                      <div>
                        <span className="font-medium text-white">{project.agentCount}</span> agents
                      </div>
                      <div>
                        <span className="font-medium text-white">{project.conversationCount}</span> conversations
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
              <h2 className="text-2xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/projects"
                  className="block bg-burgundy hover:opacity-90 text-white p-4 rounded transition-opacity text-center font-medium"
                >
                  + New Project
                </Link>
                <Link
                  href="/agents"
                  className="block bg-charcoal hover:bg-gray-dark border border-gray-dark text-white p-4 rounded transition-colors text-center font-medium"
                >
                  Browse Agents
                </Link>
              </div>
            </div>

            {/* Recent Conversations */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Recent Conversations</h2>
              {recentConversations.length === 0 ? (
                <div className="bg-charcoal rounded border-2 border-dashed border-gray-dark p-6 text-center">
                  <div className="text-4xl mb-2">💬</div>
                  <p className="text-sm text-gray-light">No conversations yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentConversations.map(conversation => (
                    <Link
                      key={conversation.id}
                      href={`/projects/${conversation.projectId}/chat/${conversation.id}`}
                      className="block bg-charcoal p-4 rounded border border-gray-dark hover:border-red transition-colors"
                    >
                      <div className="flex items-start gap-2 mb-1">
                        <span className="text-xl">{conversation.projectEmoji}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white text-sm">{conversation.title}</h4>
                          <p className="text-xs text-gray-light">{conversation.projectName}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-light">{conversation.timestamp}</p>
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
