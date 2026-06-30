import type {Metadata} from 'next'

import '@sanity-labs/ui-poc/styles.css'

export const metadata: Metadata = {
  title: 'Sanity UI in Next.js',
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
