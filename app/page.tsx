import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee to-espresso text-cream">
      {/* Header */}
      <header className="border-b border-mocha">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="font-serif text-2xl font-semibold">The.Cafe</h1>
          <p className="text-parchment text-sm opacity-80">AI Agent Operating System</p>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-8 py-24">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-6xl font-semibold leading-tight">
              One agent.<br />
              <span className="text-gold italic">Any AI model.</span>
            </h2>
            <p className="text-xl text-parchment max-w-2xl mx-auto leading-relaxed">
              Create intelligent AI agents that work across Claude, GPT-4, and Gemini.
              Switch models on the fly. Let the system recommend and generate agents based on your needs.
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-8">
            <Link
              href="/agents"
              className="bg-burgundy hover:bg-coffee text-cream px-8 py-4 rounded font-medium text-lg transition-colors"
            >
              Open Agent Library
            </Link>
            <Link
              href="/chat"
              className="bg-transparent border-2 border-cream hover:bg-cream hover:text-espresso text-cream px-8 py-4 rounded font-medium text-lg transition-colors"
            >
              Start Conversation
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 pt-24">
            <div className="bg-mocha bg-opacity-30 p-8 rounded">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-serif text-xl font-semibold mb-2">Multi-Model Agents</h3>
              <p className="text-parchment">
                Create once, run on any AI model. Switch between Claude, GPT-4, and Gemini instantly.
              </p>
            </div>

            <div className="bg-mocha bg-opacity-30 p-8 rounded">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-serif text-xl font-semibold mb-2">Intelligent Suggestions</h3>
              <p className="text-parchment">
                Topic analysis recommends relevant agents and detects gaps in your library.
              </p>
            </div>

            <div className="bg-mocha bg-opacity-30 p-8 rounded">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-serif text-xl font-semibold mb-2">Auto-Generation</h3>
              <p className="text-parchment">
                Missing an agent? The system generates it automatically based on your conversation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
