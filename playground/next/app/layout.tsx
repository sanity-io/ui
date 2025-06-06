import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {headers} from 'next/headers'
import {AppRoot} from '../components/AppRoot'
import {Metadata, Viewport} from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Sanity UI in Next.js',
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const prefersColorScheme = (await headers()).get(
    'Sec-CH-Prefers-Color-Scheme',
  ) as ThemeColorSchemeKey | null

  return <AppRoot initialPrefersDark={prefersColorScheme === 'dark'}>{children}</AppRoot>
}
