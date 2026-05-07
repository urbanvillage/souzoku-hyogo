'use client'
import { useState } from 'react'
import { HYOGO_CITIES, SPECIALTIES } from '@/types'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

export default function NewAdvisorPage() {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    name_kana: '',
    office_name: '',
    prefecture: '兵庫県',
    city: '',
    phone: '',
    email: '',
    website: '',
    profile: '',
    specialties: [] as string[],
    photo_url: null as string | null,
    license_no: '',
    is_published: true,
  })

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()
    if (data.url) setForm(f => ({ ...f, photo_url: data.url }))
    setUploading(false)
  }

  function toggleSpecialty(s: string) {
    setForm(f => ({
      ...f,
      specialties: f.specialties.includes(s)
        ? f.specialties.filter(x => x !== s)
        : [...f.specialties, s],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/advisors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      window.location.href = '/admin/advisors'
    } else {
      alert('保存に失敗しました。入力内容を確認してください。')
      setLoading(false)
    }
  }

  const field = 'w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hyogo-400'

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/admin/advisors" className="inline-flex items-center gap-1 text-sm text-hyogo-600 hover:text-hyogo-800 mb-6">
        <ArrowLeft size={14} />
        一覧に戻る
      </Link>
      <h1 className="font-serif text-2xl font-bold mb-6">相続診断士 新規登録</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="card space-y-4">
          <h2 className="font-medium text-gray-700 text-sm uppercase tracking-wide">顔写真</h2>
          <div className="flex items-center gap-4">
            {form.photo_url ? (
              <Image src={form.photo_url} alt="顔写真" width={80} height={80} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-hyogo-100 text-hyogo-800 flex items-center justify-center text-2xl font-medium">
                {form.name?.charAt(0) || '？'}
              </div>
            )}
            <div>
              <label className="btn-outline cursor-pointer inline-block">
                {uploading ? 'アップロード中...' : '写真を選択'}
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploading} />
              </label>
              {form.photo_url && (
                <button type="button" onClick={() => setForm(f => ({ ...f, photo_url: null }))}
                  className="ml-2 text-xs text-red-500 hover:underline">削除</button>
              )}
            </div>
          </div>
        </div>

        <div className="card space-y-4">
          <h2 className="font-medium text-gray-700 text-sm uppercase tracking-wide">基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">氏名 <span className="text-red-500">*</span></label>
              <input className={field} required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ふりがな <span className="text-red-500">*</span></label>
              <input className={field} required value={form.name_kana} onChange={e => setForm(f => ({ ...f, name_kana: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">事務所名 <span className="text-red-500">*</span></label>
              <input className={field} required value={form.office_name} onChange={e => setForm(f => ({ ...f, office_name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">市区町村 <span className="text-red-500">*</span></label>
              <select className={field} required value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}>
                <option value="">選択してください</option>
                {HYOGO_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">資格番号 <span className="text-red-500">*</span></label>
              <input className={field} required value={form.license_no} onChange={e => setForm(f => ({ ...f, license_no: e.target.value }))} placeholder="SD-H-00000" />
            </div>
          </div>
        </div>

        <div className="card space-y-4">
          <h2 className="font-medium text-gray-700 text-sm uppercase tracking-wide">連絡先</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
              <input className={field} type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <input className={field} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">ウェブサイト</label>
              <input className={field} type="url" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://example.com" />
            </div>
          </div>
        </div>

        <div className="card space-y-4">
          <h2 className="font-medium text-gray-700 text-sm uppercase tracking-wide">専門分野</h2>
          <div className="flex flex-wrap gap-2">
            {SPECIALTIES.map(s => (
              <button key={s} type="button" onClick={() => toggleSpecialty(s)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${form.specialties.includes(s) ? 'bg-hyogo-700 text-white border-hyogo-700' : 'border-stone-300 text-gray-600 hover:border-hyogo-400'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="card space-y-3">
          <h2 className="font-medium text-gray-700 text-sm uppercase tracking-wide">自己紹介</h2>
          <textarea className={`${field} h-32 resize-y`} value={form.profile}
            onChange={e => setForm(f => ({ ...f, profile: e.target.value }))}
            placeholder="診断士のプロフィール・得意分野・メッセージを入力してください" />
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.is_published}
              onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))}
              className="accent-hyogo-600" />
            <span>ウェブサイトに公開する</span>
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/advisors" className="btn-outline">キャンセル</Link>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? '登録中...' : '新規登録'}
          </button>
        </div>
      </form>
    </main>
  )
}