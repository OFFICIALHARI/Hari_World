import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hari World | Interactive Portfolio',
  description: 'Explore my journey across continents - A map-based interactive portfolio by Harikrishnan S. Backend Developer, Full-Stack Engineer.',
  keywords: ['portfolio', 'developer', 'backend', 'java', 'spring boot', 'react', 'full-stack'],
  authors: [{ name: 'Harikrishnan S' }],
  creator: 'Harikrishnan S',
  openGraph: {
    type: 'website',
    title: 'Hari World | Interactive Portfolio',
    description: 'Explore my journey across continents - A map-based interactive portfolio',
    siteName: 'Hari World',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hari World | Interactive Portfolio',
    description: 'Explore my journey across continents - A map-based interactive portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0B0F14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-[#0B0F14] text-[#F5F5F5] min-h-dvh overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
