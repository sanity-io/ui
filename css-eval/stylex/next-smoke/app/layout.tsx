import 'stylex-button-v1/styles.css'
import type {ReactNode} from 'react'

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
