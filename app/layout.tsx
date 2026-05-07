import type { Metadata } from 'next'
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-sans' })
const notoSerif = Noto_Serif_JP({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: '相続診断士を探す｜兵庫県相続診断士協会',
  description: '兵庫県の相続診断士を地域・専門分野から検索できます。相続のお悩みは、専門家にご相談ください。',
  openGraph: {
    title: '相続診断士を探す｜兵庫県相続診断士会',
    description: '兵庫県の相続診断士を地域・専門分野から検索できます。',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="bg-stone-50 text-gray-800 font-sans antialiased">
        <header className="bg-hyogo-900 text-white">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xs tracking-widest text-hyogo-200 uppercase">Hyogo</span>
              <span className="text-base font-medium">兵庫県相続診断士会</span>
            </a>
            <nav className="flex items-center gap-6 text-sm text-hyogo-200">
              <a href="/" className="hover:text-white transition-colors">診断士を探す</a>
              <a href="/about" className="hover:text-white transition-colors">診断士会について</a>
              <a href="/contact" className="hover:text-white transition-colors">お問い合わせ</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-16 bg-hyogo-900 text-hyogo-200 text-xs">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <p className="font-medium text-white mb-1">兵庫県相続診断士会</p>
            <p>© {new Date().getFullYear()} 兵庫県相続診断士会. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
