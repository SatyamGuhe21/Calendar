import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gujarati Calendar',
  description: 'Created with react',
  generator: 'satyam Guhe',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
