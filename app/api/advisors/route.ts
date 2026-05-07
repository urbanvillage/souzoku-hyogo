import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('POST /api/advisors body:', JSON.stringify(body))
    
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    const { data, error } = await client
      .from('advisors')
      .insert(body)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', JSON.stringify(error))
      throw error
    }
    
    return NextResponse.json(data, { status: 201 })
  } catch (e: any) {
    console.error('POST /api/advisors error:', e.message)
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}