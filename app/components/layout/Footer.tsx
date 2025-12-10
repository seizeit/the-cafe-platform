'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  // Don't show footer on login page
  if (pathname === '/login') return null

  return (
    <footer className="bg-black border-t border-gray-dark mt-16">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-2">
            <img
              src="/assets/images/logo-transparent.png"
              alt="The.Cafe"
              className="w-24 h-24"
            />
            <p className="text-gray-light text-sm">AI-Native Agency & Consultancy</p>
          </div>
          <div className="flex gap-8 text-gray-light">
            <Link href="/projects" className="hover:text-white transition-colors">
              Projects
            </Link>
            <Link href="/agents" className="hover:text-white transition-colors">
              Agents
            </Link>
            <Link href="/chat" className="hover:text-white transition-colors">
              Chat
            </Link>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-gray-dark">
          <p className="text-gray text-sm">
            &copy; 2025 The.Cafe. Humans, agents, and systems gathering to create.
          </p>
        </div>
      </div>
    </footer>
  )
}
