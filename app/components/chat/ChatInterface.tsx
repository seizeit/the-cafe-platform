'use client'

import { useState, useEffect, useRef } from 'react'

type Agent = {
  id: string
  name: string
  emoji: string
  defaultModel: string
}

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  model: string
  timestamp: Date
}

type ChatInterfaceProps = {
  agent: Agent
  currentModel: string
  onTopicDetected: (topic: string) => void
}

export default function ChatInterface({ agent, currentModel, onTopicDetected }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      model: currentModel,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate topic detection
    if (messages.length === 0) {
      onTopicDetected(input.trim())
    }

    // TODO: Call AI API with currentModel
    // Simulating response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `[${currentModel}] This is a simulated response from ${agent.name}. In production, this would call the actual ${currentModel} API.`,
        model: currentModel,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-full flex flex-col bg-cream">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">{agent.emoji}</div>
            <h3 className="font-serif text-xl text-coffee mb-2">{agent.name}</h3>
            <p className="text-warm-gray">Start a conversation...</p>
          </div>
        )}

        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-2xl ${message.role === 'user' ? 'ml-12' : 'mr-12'}`}>
              {/* Message Header */}
              <div className={`flex items-center gap-2 mb-1 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className="text-xs text-warm-gray">
                  {message.role === 'assistant' && `${agent.emoji} ${agent.name} · `}
                  {message.model}
                  {message.role === 'user' && ' · You'}
                </span>
              </div>

              {/* Message Bubble */}
              <div
                className={`px-5 py-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-burgundy text-cream'
                    : 'bg-parchment text-charcoal border border-light-gray'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>

              {/* Timestamp */}
              <div className={`text-xs text-warm-gray mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-2xl mr-12">
              <div className="bg-parchment border border-light-gray px-5 py-3 rounded-lg">
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-warm-gray rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-warm-gray rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-warm-gray rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-light-gray bg-parchment px-8 py-4">
        <div className="flex gap-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${agent.name}...`}
            rows={1}
            className="flex-1 px-4 py-3 bg-cream border border-light-gray rounded-lg focus:outline-none focus:border-burgundy transition-colors resize-none"
            style={{ minHeight: '52px', maxHeight: '200px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              input.trim() && !isLoading
                ? 'bg-burgundy hover:bg-coffee text-cream'
                : 'bg-light-gray text-warm-gray cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </div>
        <p className="text-xs text-warm-gray mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
