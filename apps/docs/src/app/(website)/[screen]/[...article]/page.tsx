import {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

import {ArticleLoading} from '#app/(website)/[screen]/ArticleLoading.tsx'
import {
  articlesQuery,
  buildTargetByPathParams,
  targetByPathQuery,
  type ArticlesQueryParams,
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

export async function generateStaticParams() {
  const {data} = await cachedSanityStaticParams({
    query: articlesQuery,
    params: {id: primaryNavId} satisfies ArticlesQueryParams,
  })

  return data?.map(({screen, article}) => ({screen: screen!, article: article as string[]})) ?? []
}

export async function generateMetadata({
  params,
}: PageProps<'/[screen]/[...article]'>): Promise<Metadata> {
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

// The home page's three hero links ask for a full prefetch, so the article they
// all point at is resolved before the click; they dedupe into one cached read.
// The ~90 sidebar links deliberately don't — one prefetch per visible link is
// the case the guide warns about.
// See: https://nextjs.org/docs/app/guides/runtime-prefetching
//
// `params` identifies one article, so it can never be part of the App Shell
// that every link into this route shares. Awaiting it below a boundary lets
// the shell commit on navigation while the article streams in behind the
// segment's loading UI.
export default function ArticlePage({params}: PageProps<'/[screen]/[...article]'>) {
  return (
    <Suspense fallback={<ArticleLoading />}>
      <ScreenPage params={params} />
    </Suspense>
  )
}

async function ScreenPage({params}: Pick<PageProps<'/[screen]/[...article]'>, 'params'>) {
  const {isEnabled: isDraftMode} = await draftMode()
  if (!isDraftMode) {
    const {screen, article} = await params
    return (
      <CachedScreenPage screen={screen} article={article} perspective="published" stega={false} />
    )
  }
  const [{screen, article}, {perspective, stega}] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ])
  return (
    <CachedScreenPage screen={screen} article={article} perspective={perspective} stega={stega} />
  )
}

async function CachedScreenPage({
  screen,
  article,
  perspective,
  stega,
}: Awaited<PageProps<'/[screen]/[...article]'>['params']> & DynamicFetchOptions) {
  // Its own boundary rather than `cachedSanity`, so the Portable Text render
  // tree is cached alongside the data it comes from.
  'use cache'

  const {data} = await sanityFetch({
    query: targetByPathQuery,
    params: buildTargetByPathParams({screen, article}),
    perspective,
    stega,
  })

  if (!data?._id) notFound()

  if (data._type === 'article') {
    return <Article article={data} />
  }

  return <PageBuilder page={data} />
}
