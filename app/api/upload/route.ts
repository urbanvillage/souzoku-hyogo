import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'ファイルがありません' }, { status: 400 })

    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`
    const buffer = await file.arrayBuffer()

    const { error } = await client.storage
      .from('advisor-photos')
      .upload(fileName, buffer, { contentType: file.type })

    if (error) throw error

    const { data } = client.storage
      .from('advisor-photos')
      .getPublicUrl(fileName)

    return NextResponse.json({ url: data.publicUrl })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}