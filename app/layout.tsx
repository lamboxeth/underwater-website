import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Underwater Experience',
  description: 'An immersive underwater interactive experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
