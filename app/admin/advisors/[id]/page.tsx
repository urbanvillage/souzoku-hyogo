'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { HYOGO_CITIES, SPECIALTIES } from '@/types'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function EditAdvisorPage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/advisors/list`)
      .then(r => r.json())
      .then((data: any[]) => {
        const advisor = data.find((a: any) => a.id === Number(id))
        if (advisor) setForm(advisor)
      })
  }, [id])

  function toggleSpecialty(s: string) {
    setForm((f: any) => ({
      ...f,
      specialties: f.specialties?.includes(s)
        ? f.specialties.filter((x: string) => x !== s)
        : [...(f.specialties ?? []), s],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(`/api/advisors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      window.location.href = '/admin/advisors'
    } else {
      alert('保存に失敗しました')
      setLoading(false)
    }
  }

  if (!form) return <div className="p-8">読み込み中...</div>

  const field = 'w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hyogo-400'

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/admin/advisors" className="inline-flex items-center gap-1 text-sm text-hyogo-600 hover:text-hyogo-800 mb-6">
        <ArrowLeft size={14} />
        一覧に戻る
      </Link>
      <h1 className="font-serif text-2xl font-bold mb-6">診断士情報を編集</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card space-y-4">
          <h2 className="font-medium text-gray-700 text-sm uppercase tracking-wide">基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">氏名</label>
              <input className={field} value={form.name || ''} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ふりがな</label>
              <input className={field} value={form.name_kana || ''} onChange={e => setForm((f: any) => ({ ...f, name_kana: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">事務所名</label>
              <input className={field} value={form.office_name || ''} onChange={e => setForm((f: any) => ({ ...f, office_name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">市区町村</label>
              <select className={field} value={form.city || ''} onChange={e => setForm((f: any) => ({ ...f, city: e.target.value }))}>
                <option value="">選択してください</option>
                {HYOGO_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">資格番号</label>
              <input className={field} value={form.license_no || ''} onChange={e => setForm((f: any) => ({ ...f, license_no: e.target.value }))} />
            </div>
          </div>
        </div>
        <div className="card space-y-4">
          <h2 className="font-medium text-gray-700 text-sm uppercase tracking-wide">連絡先</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
              <input className={field} value={form.phone || ''} onChange={e => setForm((f: any) => ({ ...f, phone: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <input className={field} type="email" value={form.email || ''} onChange={e => setForm((f: any) => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">ウェブサイト</label>
              <input className={field} value={form.website || ''} onChange={e => setForm((f: any) => ({ ...f, website: e.target.value }))} />
            </div>
          </div>
        </div>
        <div className="card space-y-4">
          <h2 className="font-medium text-gray-700 text-sm uppercase tracking-wide">専門分野</h2>
          <div className="flex flex-wrap gap-2">
            {SPECIALTIES.map(s => (
              <button key={s} type="button" onClick={() => toggleSpecialty(s)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${form.specialties?.includes(s) ? 'bg-hyogo-700 text-white border-hyogo-700' : 'border-stone-300 text-gray-600 hover:border-hyogo-400'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="card space-y-3">
          <h2 className="font-medium text-gray-700 text-sm uppercase tracking-wide">自己紹介</h2>
          <textarea className={`${field} h-32 resize-y`} value={form.profile || ''} onChange={e => setForm((f: any) => ({ ...f, profile: e.target.value }))} />
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.is_published} onChange={e => setForm((f: any) => ({ ...f, is_published: e.target.checked }))} className="accent-hyogo-600" />
            <span>ウェブサイトに公開する</span>
          </label>
        </div>
        <div className="flex justify-end gap-3">
          <Link href="/admin/advisors" className="btn-outline">キャンセル</Link>
          <button type="submit" disabled={loading} className="btn-primary">{loading ? '保存中...' : '変更を保存'}</button>
        </div>
      </form>
    </main>
  )
}