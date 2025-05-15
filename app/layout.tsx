import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  metadataBase: new URL('https://neocut.app'),
  title: "NeoCut",
  description: "NeoCut turns your words into precise edits — instantly, locally, and without a timeline.",
  generator: 'v0.dev',
  openGraph: {
    title: 'NeoCut',
    description: 'Edit videos by chatting — instantly, locally, and without a timeline.',
    images: [
      {
        url: '/images/neocut-logo.png',
        width: 1200,
        height: 630,
        alt: 'NeoCut Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeoCut',
    description: 'Edit videos by chatting — instantly, locally, and without a timeline.',
    images: ['/images/neocut-logo.png'],
  },
  icons: {
    icon: '/images/neocut-logo.png',
    apple: '/images/neocut-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
