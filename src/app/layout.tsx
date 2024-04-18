import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { ReactNode, Suspense } from 'react'

import { CircularProgress, CssBaseline } from '@mui/material'

import Provider from '../components/Provider'

const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title      : 'カレンダーのプロトタイプ',
  description: 'スマートフォン向けカレンダー',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJp.className}>
        <CssBaseline />
        <Suspense fallback={<CircularProgress />}>
          <Provider>
            {children}
          </Provider>
        </Suspense>
      </body>
    </html>
  )
}
