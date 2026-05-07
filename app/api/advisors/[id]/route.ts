import { NextRequest, NextResponse } from 'next/server'
import { updateAdvisor, deleteAdvisor } from '@/lib/advisors'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const advisor = await updateAdvisor(Number(params.id), body)
    return NextResponse.json(advisor)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteAdvisor(Number(params.id))
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
