import {wrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {SpeedInsights} from '@vercel/speed-insights/next'
import {Metadata} from 'next'
import {VisualEditing} from 'next-sanity/visual-editing'
import {PropsWithChildren} from 'react'

import {basePath} from '@/env'
import {GLOBAL_QUERY, GlobalData} from '@/lib/data'
import {datasets, projectId} from '@/sanity/env'

import {DEFAULT_META_DESCRIPTION, DEFAULT_META_OG_IMAGE} from './constants'
import {DisableDraftMode} from './DisableDraftMode'
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
  const {children, ...restProps} = props

  const {env, initialScheme, isDraftMode, perspective, studioBaseUrl, sanityFetch, SanityLive} =
    await getContext()

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
      {...restProps}
      data={data}
      env={env}
      dataset={datasets[env]}
      perspective={perspective}
      hintHiddenContent={process.env.APP_FEATURE_HINT_HIDDEN_CONTENT === 'true'}
      initialScheme={initialScheme}
      projectId={projectId}
      studioBaseUrl={studioBaseUrl}
    >
      {isDraftMode && <DisableDraftMode />}
      {isDraftMode && <VisualEditing basePath={basePath} />}
      {children}
      <SanityLive />
      <SpeedInsights />
    </RootLayout>
  )
}
