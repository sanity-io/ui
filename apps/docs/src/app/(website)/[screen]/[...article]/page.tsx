import {Metadata} from 'next'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

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
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from '@/lib/sanity/live'

export async function generateStaticParams() {
  const {data: screens} = await sanityFetchStaticParams({
    query: articlesQuery,
    params: {id: primaryNavId} satisfies ArticlesQueryParams,
  })

  return screens
}

export async function generateMetadata({
  params,
}: PageProps<'/[screen]/[...article]'>): Promise<Metadata> {
  const [{screen}, {perspective}] = await Promise.all([params, getDynamicFetchOptions()])
  const {data: target} = await sanityFetchMetadata({
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

export default async function ArticlePage({params}: PageProps<'/[screen]/[...article]'>) {
  const {isEnabled: isDraftMode} = await draftMode()
  if (!isDraftMode) {
    const {screen, article} = await params
    return (
      <CachedScreenPage screen={screen} article={article} perspective="published" stega={false} />
    )
  }
  return (
    <Suspense>
      <DynamicScreenPage params={params} />
    </Suspense>
  )
}

async function DynamicScreenPage({params}: Pick<PageProps<'/[screen]/[...article]'>, 'params'>) {
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
