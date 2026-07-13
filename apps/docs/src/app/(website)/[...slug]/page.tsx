import {Metadata} from 'next'
import {groq} from 'next-sanity'

import {DEFAULT_META_DESCRIPTION} from '@/app/constants'
import {Page} from '@/components/page'
import {API_DOCUMENT_TYPES, TARGET_QUERY, TargetData} from '@/lib/data'
import {getImageUrlBuilder} from '@/lib/sanity/image'
import {
  DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
  sanityFetchStaticParams,
} from '@/lib/sanity/live'

const NAV_PATHS_QUERY = groq`
*[_type == "nav" && id == "main"][0]{
  items[]{
    segment,
    items[]{
      segment,
      items[]{
        segment
      }
    }
  }
}`

interface NavPathItem {
  segment: string | null
  items?: NavPathItem[] | null
}

function collectPaths(items: NavPathItem[] | null | undefined, prefix: string[]): string[][] {
  const paths: string[][] = []

  for (const item of items ?? []) {
    if (!item.segment) continue

    const path = [...prefix, item.segment]

    paths.push(path)
    paths.push(...collectPaths(item.items, path))
  }

  return paths
}

export async function generateStaticParams() {
  const {data} = await sanityFetchStaticParams({query: NAV_PATHS_QUERY})
  const nav = data as {items: NavPathItem[] | null} | null

  return collectPaths(nav?.items, []).map((slug) => ({slug}))
}

export async function generateMetadata(props: {
  params: Promise<{slug: string[]}>
}): Promise<Metadata> {
  const [{slug}, {perspective}] = await Promise.all([props.params, getDynamicFetchOptions()])

  const {data} = await sanityFetchMetadata({
    query: TARGET_QUERY,
    params: {memberTypes: API_DOCUMENT_TYPES, path: slug},
    perspective,
  })
  const target = data as TargetData | null

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

export default async function SlugRoute(props: {params: Promise<{slug: string[]}>}) {
  // The sibling `loading.tsx` provides the fallback UI, so `params` and the
  // dynamic fetch options can be awaited directly. In published mode only
  // `draftMode()` is read, which keeps the route statically prerenderable.
  const [{slug}, {perspective, stega}] = await Promise.all([props.params, getDynamicFetchOptions()])

  return <CachedSlugPage perspective={perspective} slug={slug} stega={stega} />
}

async function CachedSlugPage(props: {slug: string[]} & DynamicFetchOptions) {
  'use cache'
  const {perspective, slug, stega} = props
  const {data} = await sanityFetch({
    query: TARGET_QUERY,
    params: {memberTypes: API_DOCUMENT_TYPES, path: slug},
    perspective,
    stega,
  })

  return <Page data={data as TargetData | null} path={slug} />
}
