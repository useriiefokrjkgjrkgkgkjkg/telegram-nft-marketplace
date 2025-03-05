import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NFT Market',
  description: 'NFT Marketplace on TON',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  )
} 