import { searchAdvisors } from '@/lib/advisors'
import { HYOGO_CITIES, SPECIALTIES } from '@/types'
import AdvisorCard from '@/components/AdvisorCard'
import SearchForm from '@/components/SearchForm'
import Pagination from '@/components/Pagination'

type Props = {
  searchParams: { city?: string; keyword?: string; specialty?: string; page?: string }
}

export default async function HomePage({ searchParams }: Props) {
  const page = Number(searchParams.page ?? 1)
  const { advisors, total, pageSize } = await searchAdvisors({
    city: searchParams.city,
    keyword: searchParams.keyword,
    specialty: searchParams.specialty,
    page,
  })
  const totalPages = Math.ceil(total / pageSize)

  return (
    <main>
      {/* Hero */}
      <section className="bg-hyogo-900 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-hyogo-300 text-xs tracking-widest uppercase mb-2">兵庫県の相続専門家ネットワーク</p>
          <h1 className="font-serif text-3xl font-bold mb-2">相続のプロを、兵庫から探す</h1>
          <p className="text-hyogo-200 text-sm mb-8">地域・専門分野から、あなたに合った相続診断士を検索できます</p>
          <SearchForm cities={HYOGO_CITIES} specialties={SPECIALTIES} current={searchParams} />
        </div>
      </section>

      {/* Results */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {searchParams.city || searchParams.keyword || searchParams.specialty
              ? `検索結果：${total}名`
              : `兵庫県の相続診断士：${total}名`}
          </p>
        </div>

        {advisors.length === 0 ? (
          <div className="card text-center py-16 text-gray-400">
            <p className="text-lg mb-2">該当する診断士が見つかりませんでした</p>
            <p className="text-sm">条件を変えてお試しください</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advisors.map((advisor) => (
              <AdvisorCard key={advisor.id} advisor={advisor} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination currentPage={page} totalPages={totalPages} searchParams={searchParams} />
        )}
      </section>
    </main>
  )
}
