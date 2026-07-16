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
import {getImageUrlBuilder} from '@/lib/sanity/image'
import {
  DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from '@/lib/sanity/live'

import {ArcadePage} from './ArcadePage'

export async function generateStaticParams() {
  const {data} = await sanityFetchStaticParams({
    query: screensQuery,
    params: {id: primaryNavId} satisfies ScreensQueryParams,
  })

  return data
}

export async function generateMetadata({params}: PageProps<'/[screen]'>): Promise<Metadata> {
  const [{screen}, {perspective}] = await Promise.all([params, getDynamicFetchOptions()])
  const {data: target} = await sanityFetchMetadata({
    query: targetByPathQuery,
    params: buildTargetByPathParams({screen}),
    perspective,
  })

  const title = target?.title
  const ogImage = target?.seo?.og?.image
  const ogImageUrl = ogImage?.asset
    ? getImageUrlBuilder({
        projectId: process.env.SANITY_PROJECT_ID!,
        dataset: process.env.SANITY_DATASET!,
      })
        .imageUrlBuilder.image(ogImage.asset)
        .url()
    : null

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

export default async function ScreenPage({params}: PageProps<'/[screen]'>) {
  const {isEnabled: isDraftMode} = await draftMode()
  if (!isDraftMode) {
    const {screen} = await params
    return <CachedScreenPage screen={screen} perspective="published" stega={false} />
  }
  return (
    <Suspense>
      <DynamicScreenPage params={params} />
    </Suspense>
  )
}

async function DynamicScreenPage({params}: Pick<PageProps<'/[screen]'>, 'params'>) {
  const [{screen}, {perspective, stega}] = await Promise.all([params, getDynamicFetchOptions()])
  return <CachedScreenPage screen={screen} perspective={perspective} stega={stega} />
}

async function CachedScreenPage({
  screen,
  perspective,
  stega,
}: Awaited<PageProps<'/[screen]'>['params']> & DynamicFetchOptions) {
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
