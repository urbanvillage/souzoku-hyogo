'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search } from 'lucide-react'

type Props = {
  cities: readonly string[]
  specialties: readonly string[]
  current: { city?: string; keyword?: string; specialty?: string }
}

export default function SearchForm({ cities, specialties, current }: Props) {
  const router = useRouter()
  const [city, setCity] = useState(current.city ?? '')
  const [keyword, setKeyword] = useState(current.keyword ?? '')
  const [specialty, setSpecialty] = useState(current.specialty ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (keyword) params.set('keyword', keyword)
    if (specialty) params.set('specialty', specialty)
    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        <select
          value={city}
          onChange={e => setCity(e.target.value)}
          className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-hyogo-400"
        >
          <option value="" className="bg-hyogo-900">市区町村を選択</option>
          {cities.map(c => (
            <option key={c} value={c} className="bg-hyogo-900">{c}</option>
          ))}
        </select>

        <select
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
          className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-hyogo-400"
        >
          <option value="" className="bg-hyogo-900">専門分野を選択</option>
          {specialties.map(s => (
            <option key={s} value={s} className="bg-hyogo-900">{s}</option>
          ))}
        </select>

        <input
          type="text"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="氏名・事務所名で検索"
          className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-3 py-2 text-sm flex-1 min-w-40 focus:outline-none focus:ring-2 focus:ring-hyogo-400"
        />

        <button
          type="submit"
          className="bg-hyogo-600 hover:bg-hyogo-400 text-white rounded-lg px-5 py-2 text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <Search size={16} />
          検索
        </button>
      </div>

      {(city || keyword || specialty) && (
        <button
          type="button"
          onClick={() => { setCity(''); setKeyword(''); setSpecialty(''); router.push('/'); }}
          className="text-xs text-hyogo-300 hover:text-white underline"
        >
          条件をクリア
        </button>
      )}
    </form>
  )
}
