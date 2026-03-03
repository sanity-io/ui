import {wrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Metadata} from 'next'
import {draftMode, headers} from 'next/headers'
import {PropsWithChildren} from 'react'

import {GLOBAL_QUERY, GlobalData} from '@/lib/data'
import {loadQuery} from '@/lib/sanity/loadQuery'

import {DEFAULT_META_DESCRIPTION, DEFAULT_META_OG_IMAGE} from './constants'
import {RootLayout} from './RootLayout'

export const metadata: Metadata = {
  title: 'Sanity UI',
  description: DEFAULT_META_DESCRIPTION,
  icons: {
    icon: '/sanity-favicon-48.png',
    shortcut: '/sanity-favicon-32.png',
    apple: '/sanity-favicon-57.png',
  },
  openGraph: {
    type: 'website',
    title: 'Sanity UI',
    description: DEFAULT_META_DESCRIPTION,
    siteName: 'Sanity UI',
    images: [DEFAULT_META_OG_IMAGE],
  },
  twitter: {
    card: 'summary',
    site: '@sanity_io',
  },
}

export default async function RootLayoutLoader(props: PropsWithChildren) {
  const {data: rawData, sourceMap} = await loadQuery<GlobalData>(GLOBAL_QUERY)
  const data: WrappedValue<GlobalData> = wrapData({baseUrl: '/studio'}, rawData, sourceMap)
  const initialScheme = (await headers()).get('sec-ch-prefers-color-scheme') as
    | 'dark'
    | 'light'
    | null

  return (
    <RootLayout
      {...props}
      data={data}
      dataset={process.env.SANITY_DATASET!}
      draftMode={(await draftMode()).isEnabled}
      hintHiddenContent={process.env.APP_FEATURE_HINT_HIDDEN_CONTENT === 'true'}
      initialScheme={initialScheme}
      projectId={process.env.SANITY_PROJECT_ID!}
      studioOrigin={process.env.SANITY_STUDIO_ORIGIN}
    />
  )
}
