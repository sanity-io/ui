import {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

import {
  buildTargetByPathParams,
  screensQuery,
  targetByPathQuery,
  type ScreensQueryParams,
} from '#lib/sanity/queries.ts'
import {DEFAULT_META_DESCRIPTION} from '@/app/constants'
import {Article} from '@/components/page/article/Article'
import {PageBuilder} from '@/components/page/PageBuilder'
import {primaryNavId} from '@/constants'
import {imageUrlBuilder} from '@/lib/sanity/image'
import {
  DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  cachedSanityMetadata,
  cachedSanityStaticParams,
} from '@/lib/sanity/live'

import {ArcadePage} from './ArcadePage'
import {ArticleLoading} from './ArticleLoading'

export async function generateStaticParams() {
  const {data} = await cachedSanityStaticParams({
    query: screensQuery,
    params: {id: primaryNavId} satisfies ScreensQueryParams,
  })

  return data?.map(({screen}) => ({screen: screen!})) ?? []
}

export async function generateMetadata({params}: PageProps<'/[screen]'>): Promise<Metadata> {
  const [{screen}, {perspective}] = await Promise.all([params, getDynamicFetchOptions()])
  const {data: target} = await cachedSanityMetadata({
    query: targetByPathQuery,
    params: buildTargetByPathParams({screen}),
    perspective,
  })

  const title = target?.title
  const ogImage = target?.seo?.og?.image
  const ogImageUrl = ogImage?.asset ? imageUrlBuilder.image(ogImage.asset).url() : null

  return {
    title: title ? `${title} | Sanity UI` : 'Sanity UI',
    description: target?.seo?.description || DEFAULT_META_DESCRIPTION,
    openGraph: {
      type: target?.seo?.og?.type || 'website',
      title: target?.seo?.og?.title || target?.title || 'Sanity UI',
      description: target?.seo?.og?.description || DEFAULT_META_DESCRIPTION,
      siteName: 'Sanity UI',
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    twitter: {
      card: target?.seo?.twitter?.cardType || 'summary',
      site: '@sanity_io',
    },
  }
}

// TODO(runtime-prefetch): assess with the user whether URL data should resolve before click.
// See: https://nextjs.org/docs/app/guides/runtime-prefetching
// The navbar links here still ask for a full prefetch, which resolves this
// page's content ahead of the click at the cost of a server render per link.
//
// Same boundary as `[...article]`: the screen's own landing page is keyed by
// `params`, so it streams in behind the shell instead of blocking it.
export default function ScreenPage({params}: PageProps<'/[screen]'>) {
  return (
    <Suspense fallback={<ArticleLoading />}>
      <ScreenRoute params={params} />
    </Suspense>
  )
}

async function ScreenRoute({params}: Pick<PageProps<'/[screen]'>, 'params'>) {
  const {isEnabled: isDraftMode} = await draftMode()
  if (!isDraftMode) {
    const {screen} = await params
    return <CachedScreenPage screen={screen} perspective="published" stega={false} />
  }
  const [{screen}, {perspective, stega}] = await Promise.all([params, getDynamicFetchOptions()])
  return <CachedScreenPage screen={screen} perspective={perspective} stega={stega} />
}

async function CachedScreenPage({
  screen,
  perspective,
  stega,
}: Awaited<PageProps<'/[screen]'>['params']> & DynamicFetchOptions) {
  // Its own boundary rather than `cachedSanity`, so the rendered page tree is
  // cached alongside the data it comes from.
  'use cache'

  if (screen === 'arcade') {
    return <ArcadePage />
  }

  const {data} = await sanityFetch({
    query: targetByPathQuery,
    params: buildTargetByPathParams({screen}),
    perspective,
    stega,
  })

  if (!data?._id) notFound()

  if (data._type === 'article') {
    return <Article article={data} />
  }

  return <PageBuilder page={data} />
}
