import { NextRequest, NextResponse } from 'next/server'
import { createAdvisor } from '@/lib/advisors'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const advisor = await createAdvisor(body)
    return NextResponse.json(advisor, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
