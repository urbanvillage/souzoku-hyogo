import Link from 'next/link'

type Props = {
  currentPage: number
  totalPages: number
  searchParams: Record<string, string | undefined>
}

export default function Pagination({ currentPage, totalPages, searchParams }: Props) {
  function buildUrl(page: number) {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([k, v]) => { if (v && k !== 'page') params.set(k, v) })
    params.set('page', String(page))
    return `/?${params.toString()}`
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2
  )

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      {currentPage > 1 && (
        <Link href={buildUrl(currentPage - 1)} className="px-3 py-1.5 text-sm border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors">
          前へ
        </Link>
      )}
      {pages.map((p, i) => {
        const prev = pages[i - 1]
        return (
          <span key={p} className="flex items-center gap-1">
            {prev && p - prev > 1 && <span className="text-gray-400 px-1">…</span>}
            <Link
              href={buildUrl(p)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                p === currentPage
                  ? 'bg-hyogo-700 text-white'
                  : 'border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {p}
            </Link>
          </span>
        )
      })}
      {currentPage < totalPages && (
        <Link href={buildUrl(currentPage + 1)} className="px-3 py-1.5 text-sm border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors">
          次へ
        </Link>
      )}
    </div>
  )
}
