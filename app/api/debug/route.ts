import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasPassword: !!process.env.MVP_PASSWORD,
    passwordLength: process.env.MVP_PASSWORD?.length || 0,
    nodeEnv: process.env.NODE_ENV
  })
}
