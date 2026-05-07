import AdvisorForm from '@/components/AdvisorForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewAdvisorPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/admin/advisors" className="inline-flex items-center gap-1 text-sm text-hyogo-600 hover:text-hyogo-800 mb-6">
        <ArrowLeft size={14} />
        一覧に戻る
      </Link>
      <h1 className="font-serif text-2xl font-bold mb-6">相続診断士 新規登録</h1>
      <AdvisorForm />
    </main>
  )
}
