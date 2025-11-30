'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (response.ok) {
        // Password correct, redirect to home
        router.push('/')
      } else {
        setError('Incorrect password')
        setIsLoading(false)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee to-espresso flex items-center justify-center p-4">
      <div className="bg-cream rounded-lg shadow-2xl max-w-md w-full p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-semibold text-espresso mb-2">The.Cafe</h1>
          <p className="text-warm-gray">AI Agent Operating System</p>
          <div className="mt-4 pt-4 border-t border-light-gray">
            <p className="text-sm text-coffee">MVP Access</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-coffee mb-2">
              Access Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter MVP password"
              className={`w-full px-4 py-3 bg-parchment border rounded-lg focus:outline-none transition-colors ${
                error ? 'border-burgundy focus:border-burgundy' : 'border-light-gray focus:border-burgundy'
              }`}
              disabled={isLoading}
            />
            {error && (
              <p className="mt-2 text-sm text-burgundy">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!password || isLoading}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              password && !isLoading
                ? 'bg-burgundy hover:bg-coffee text-cream'
                : 'bg-light-gray text-warm-gray cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Verifying...' : 'Access Platform'}
          </button>
        </form>

        {/* Info */}
        <div className="mt-8 pt-6 border-t border-light-gray text-center">
          <p className="text-xs text-warm-gray">
            This is an MVP preview. Full authentication coming soon.
          </p>
        </div>
      </div>
    </div>
  )
}
