import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scallop Rewind 2025 | A Year of Scallop',
  description: 'Dive into a year of Scallop Achievements and Milestones! Explore the journey of Scallop in the Sui ecosystem.',
  keywords: ['Scallop', 'DeFi', 'Sui', 'Cryptocurrency', 'Blockchain', '2025'],
  openGraph: {
    title: 'Scallop Rewind 2025 | A Year of Scallop',
    description: 'Dive into a year of Scallop Achievements and Milestones!',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-cyan-500/30">{children}</body>
    </html>
  )
}
