import {wrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {SpeedInsights} from '@vercel/speed-insights/next'
import {Metadata} from 'next'
import {VisualEditing} from 'next-sanity/visual-editing'

import {GLOBAL_QUERY, GlobalData} from '@/lib/data'
import {datasets, projectId} from '@/sanity/env'

import {DEFAULT_META_DESCRIPTION, DEFAULT_META_OG_IMAGE} from '../constants'
import {DisableDraftMode} from '../DisableDraftMode'
import {RootLayout} from '../RootLayout'
import {getContext} from '../context'

export async function generateMetadata(props: LayoutProps<'/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params

  const {basePath} = await getContext(params.slug)

  return {
    title: 'Sanity UI',
    description: DEFAULT_META_DESCRIPTION,
    icons: [
      {
        type: 'image/png',
        url: `${basePath}/android-icon-192x192.png`,
        sizes: '192x192',
        rel: 'icon',
      },
      {
        type: 'image/png',
        url: `${basePath}/favicon-96x96.png`,
        sizes: '96x96',
        rel: 'icon',
      },
      {
        type: 'image/png',
        url: `${basePath}/favicon-32x32.png`,
        sizes: '32x32',
        rel: 'icon',
      },
      {
        type: 'image/png',
        url: `${basePath}/favicon-16x16.png`,
        sizes: '16x16',
        rel: 'icon',
      },
      {
        // type: 'image/svg+xml',
        url: `${basePath}/safari-pinned-tab.svg`,
        color: 'black',
        rel: 'apple-touch-icon',
      },
      {
        type: 'image/png',
        url: `${basePath}/apple-icon-57x57.png`,
        sizes: '57x57',
        rel: 'apple-touch-icon',
      },
      {
        type: 'image/png',
        url: `${basePath}/apple-icon-60x60.png`,
        sizes: '60x60',
        rel: 'apple-touch-icon',
      },
      {
        type: 'image/png',
        url: `${basePath}/apple-icon-72x72.png`,
        sizes: '72x72',
        rel: 'apple-touch-icon',
      },
      {
        type: 'image/png',
        url: `${basePath}/apple-icon-76x76.png`,
        sizes: '76x76',
        rel: 'apple-touch-icon',
      },
      {
        type: 'image/png',
        url: `${basePath}/apple-icon-114x114.png`,
        sizes: '114x114',
        rel: 'apple-touch-icon',
      },
      {
        type: 'image/png',
        url: `${basePath}/apple-icon-120x120.png`,
        sizes: '120x120',
        rel: 'apple-touch-icon',
      },
      {
        type: 'image/png',
        url: `${basePath}/apple-icon-144x144.png`,
        sizes: '144x144',
        rel: 'apple-touch-icon',
      },
      {
        type: 'image/png',
        url: `${basePath}/apple-icon-152x152.png`,
        sizes: '152x152',
        rel: 'apple-touch-icon',
      },
      {
        type: 'image/png',
        url: `${basePath}/apple-icon-180x180.png`,
        sizes: '180x180',
        rel: 'apple-touch-icon',
      },
    ],
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
}

export default async function SlugLayout(props: LayoutProps<'/[[...slug]]'>) {
  const children = props.children
  const params = await props.params

  const {
    basePath,
    defaultVersion,
    env,
    initialScheme,
    isDraftMode,
    perspective,
    studioBaseUrl,
    sanityFetch,
    SanityLive,
    version,
  } = await getContext(params.slug)

  const result = await sanityFetch({
    query: GLOBAL_QUERY,
    params: {
      navId: version,
    },
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
      basePath={basePath}
      data={data}
      defaultVersion={defaultVersion}
      draftMode={isDraftMode}
      env={env}
      dataset={datasets[env]}
      perspective={perspective}
      hintHiddenContent={process.env.APP_FEATURE_HINT_HIDDEN_CONTENT === 'true'}
      initialScheme={initialScheme}
      projectId={projectId}
      studioBaseUrl={studioBaseUrl}
      version={version}
    >
      {(env !== 'production' || isDraftMode) && <DisableDraftMode />}
      {isDraftMode && <VisualEditing basePath={basePath} />}
      {children}
      <SanityLive />
      <SpeedInsights />
    </RootLayout>
  )
}
