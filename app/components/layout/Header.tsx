'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  // Don't show header on login page
  if (pathname === '/login') return null

  return (
    <header className="bg-black text-white border-b border-gray-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/assets/images/logo-transparent.png"
              alt="The.Cafe"
              className="w-12 h-12"
            />
            <span className="text-xl font-semibold">
              <span className="text-red">T</span>he.Cafe
            </span>
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/projects"
              className={`transition-colors ${
                pathname.startsWith('/projects')
                  ? 'text-red'
                  : 'text-gray-light hover:text-white'
              }`}
            >
              Projects
            </Link>
            <Link
              href="/agents"
              className={`transition-colors ${
                pathname === '/agents'
                  ? 'text-red'
                  : 'text-gray-light hover:text-white'
              }`}
            >
              Agents
            </Link>
            <Link
              href="/chat"
              className={`transition-colors ${
                pathname === '/chat'
                  ? 'text-red'
                  : 'text-gray-light hover:text-white'
              }`}
            >
              Chat
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
