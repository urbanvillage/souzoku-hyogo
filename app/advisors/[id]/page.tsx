import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAdvisorById } from '@/lib/advisors'
import { MapPin, Phone, Mail, Globe, ArrowLeft, Award } from 'lucide-react'
import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const advisor = await getAdvisorById(Number(id))
  if (!advisor) return { title: '診断士が見つかりません' }
  return {
    title: `${advisor.name}｜${advisor.office_name}｜兵庫県相続診断士協会`,
    description: advisor.profile ?? undefined,
  }
}

export default async function AdvisorDetailPage({ params }: Props) {
  const { id } = await params
  const advisor = await getAdvisorById(Number(id))
  if (!advisor) notFound()

  const initial = advisor.name.charAt(0)

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-hyogo-600 hover:text-hyogo-800 mb-6 transition-colors">
        <ArrowLeft size={14} />
        診断士一覧に戻る
      </Link>

      <div className="card mb-6">
        <div className="flex items-start gap-5 mb-6">
          {advisor.photo_url ? (
            <Image src={advisor.photo_url} alt={advisor.name} width={80} height={80} className="w-20 h-20 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-hyogo-100 text-hyogo-800 flex items-center justify-center text-2xl font-medium flex-shrink-0">
              {initial}
            </div>
          )}
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">{advisor.name}</h1>
            <p className="text-sm text-gray-400 mt-0.5">{advisor.name_kana}</p>
            <p className="text-sm text-gray-600 mt-1">{advisor.office_name}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <Award size={14} className="text-hyogo-600" />
              <span className="text-xs text-hyogo-700 font-medium">相続診断士 認定資格　{advisor.license_no}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-2">専門分野</h2>
          <div className="flex flex-wrap gap-2">
            {advisor.specialties.map(s => (
              <span key={s} className="badge text-sm px-3 py-1">{s}</span>
            ))}
          </div>
        </div>

        {advisor.profile && (
          <div className="mb-6">
            <h2 className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-2">自己紹介</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{advisor.profile}</p>
          </div>
        )}

        <div className="border-t border-stone-100 pt-5">
          <h2 className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-3">連絡先</h2>
          <dl className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={15} className="text-gray-400 flex-shrink-0" />
              <span className="text-gray-600">兵庫県 {advisor.city}</span>
            </div>
            {advisor.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone size={15} className="text-gray-400 flex-shrink-0" />
                <a href={`tel:${advisor.phone}`} className="text-hyogo-700 hover:underline">{advisor.phone}</a>
              </div>
            )}
            {advisor.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail size={15} className="text-gray-400 flex-shrink-0" />
                <a href={`mailto:${advisor.email}`} className="text-hyogo-700 hover:underline break-all">{advisor.email}</a>
              </div>
            )}
          </dl>
        </div>
      </div>

      <div className="card text-center py-8 bg-hyogo-50 border-hyogo-200">
        <h2 className="font-serif text-lg font-bold mb-1">{advisor.name}に相談する</h2>
        <p className="text-sm text-gray-500 mb-5">まずはお気軽にお問い合わせください</p>
        <div className="flex justify-center gap-3 flex-wrap">
          {advisor.phone && (
            <a href={`tel:${advisor.phone}`} className="btn-primary">📞 電話で問い合わせる</a>
          )}
          {advisor.email && (
            <a href={`mailto:${advisor.email}`} className="btn-outline">✉️ メールで問い合わせる</a>
          )}
        </div>
      </div>
    </main>
  )
}