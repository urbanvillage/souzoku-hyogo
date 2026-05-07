import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone } from 'lucide-react'
import type { Advisor } from '@/types'

const AVATAR_COLORS = [
  { bg: 'bg-hyogo-100', text: 'text-hyogo-800' },
  { bg: 'bg-amber-100', text: 'text-amber-800' },
  { bg: 'bg-blue-100', text: 'text-blue-800' },
  { bg: 'bg-rose-100', text: 'text-rose-800' },
  { bg: 'bg-violet-100', text: 'text-violet-800' },
]

export default function AdvisorCard({ advisor }: { advisor: Advisor }) {
  const colorIdx = advisor.id % AVATAR_COLORS.length
  const { bg, text } = AVATAR_COLORS[colorIdx]
  const initial = advisor.name.charAt(0)

  return (
    <Link
      href={`/advisors/${advisor.id}`}
      className="card hover:border-hyogo-400 hover:shadow-md transition-all group flex flex-col"
    >
      <div className="flex items-start gap-3 mb-3">
        {advisor.photo_url ? (
          <Image
            src={advisor.photo_url}
            alt={advisor.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${bg} ${text} text-lg font-medium`}>
            {initial}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-medium text-gray-900 group-hover:text-hyogo-700 transition-colors">{advisor.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{advisor.name_kana}</p>
          <p className="text-xs text-gray-500 mt-1 truncate">{advisor.office_name}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
        <MapPin size={12} />
        <span>{advisor.city}</span>
        {advisor.phone && (
          <>
            <span className="mx-1">·</span>
            <Phone size={12} />
            <span>{advisor.phone}</span>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1 mt-auto">
        {advisor.specialties.map(s => (
          <span key={s} className="badge">{s}</span>
        ))}
      </div>
    </Link>
  )
}
