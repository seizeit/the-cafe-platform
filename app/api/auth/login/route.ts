import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    // Get MVP password from environment variable
    const mvpPassword = process.env.MVP_PASSWORD || 'thecafe2025'

    // Debug logging
    console.log('Login attempt:', {
      receivedLength: password?.length,
      expectedLength: mvpPassword.length,
      match: password === mvpPassword,
      receivedTrimmed: password?.trim(),
      expectedTrimmed: mvpPassword.trim()
    })

    if (password === mvpPassword) {
      // Create response with success
      const response = NextResponse.json({ success: true })

      // Set authentication cookie
      response.cookies.set('thecafe_auth', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

      return response
    } else {
      return NextResponse.json(
        {
          error: 'Invalid password',
          debug: {
            receivedLength: password?.length,
            expectedLength: mvpPassword.length
          }
        },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
