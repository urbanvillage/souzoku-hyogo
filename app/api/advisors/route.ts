import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const client = createServerClient()
    const { data, error } = await client
      .from('advisors')
      .insert(body)
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (e: any) {
    console.error('POST /api/advisors error:', e)
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}