import {wrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {PropsWithChildren} from 'react'

import {GLOBAL_QUERY, GlobalData} from '@/lib/data'

import {DEFAULT_META_DESCRIPTION, DEFAULT_META_OG_IMAGE} from './constants'
import {RootLayout} from './RootLayout'
import {getContext} from './context'

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
  const {dataset, initialScheme, projectId, studioBaseUrl, sanityFetch} = await getContext()

  const result = await sanityFetch({
    query: GLOBAL_QUERY,
  })

  const rawData = result.data as GlobalData
  const sourceMap = result.sourceMap || undefined

  const data: WrappedValue<GlobalData> = wrapData(
    {
      baseUrl: studioBaseUrl,
    },
    rawData,
    sourceMap,
  )

  return (
    <RootLayout
      {...props}
      data={data}
      dataset={dataset}
      draftMode={(await draftMode()).isEnabled}
      hintHiddenContent={process.env.APP_FEATURE_HINT_HIDDEN_CONTENT === 'true'}
      initialScheme={initialScheme}
      projectId={projectId}
      studioBaseUrl={studioBaseUrl}
    />
  )
}
