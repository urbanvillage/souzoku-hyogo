import { getAllAdvisorsAdmin } from '@/lib/advisors'
import Link from 'next/link'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

export default async function AdminAdvisorsPage() {
  const advisors = await getAllAdvisorsAdmin()

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold">相続診断士 管理</h1>
          <p className="text-sm text-gray-500 mt-1">登録数：{advisors.length}名</p>
        </div>
        <Link href="/admin/advisors/new" className="btn-primary flex items-center gap-2">
          <PlusCircle size={16} />
          新規登録
        </Link>
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">氏名</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">事務所</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">市区町村</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">専門分野</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">公開</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {advisors.map((a, i) => (
              <tr key={a.id} className={`border-b border-stone-100 hover:bg-stone-50 ${i % 2 === 0 ? '' : 'bg-stone-50/50'}`}>
                <td className="px-4 py-3 font-medium">{a.name}</td>
                <td className="px-4 py-3 text-gray-600">{a.office_name}</td>
                <td className="px-4 py-3 text-gray-600">{a.city}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {a.specialties.slice(0, 2).map(s => (
                      <span key={s} className="badge text-xs">{s}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${a.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {a.is_published ? '公開' : '非公開'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/admin/advisors/${a.id}`} className="p-1.5 hover:bg-stone-200 rounded transition-colors text-gray-500">
                      <Edit size={14} />
                    </Link>
                    <button
  onClick={async () => {
    if (!confirm(`${a.name}を削除しますか？`)) return
    await fetch(`/api/advisors/${a.id}`, { method: 'DELETE' })
    window.location.reload()
  }}
  className="p-1.5 hover:bg-red-100 rounded transition-colors text-gray-400 hover:text-red-500"
>
  <Trash2 size={14} />
</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
