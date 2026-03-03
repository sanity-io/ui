import {wrapData} from '@sanity/react-loader/jsx'
import {Metadata} from 'next'
import {draftMode} from 'next/headers'

import {Page, PreviewPage} from '@/components/page'
import {API_DOCUMENT_TYPES, TARGET_QUERY, TargetData} from '@/lib/data'
import {getImageUrlBuilder} from '@/lib/sanity/image'
import {loadQuery} from '@/lib/sanity/loadQuery'

import {DEFAULT_META_DESCRIPTION} from '../constants'

export async function generateMetadata(props: {
  params: Promise<{slug: string[]}>
}): Promise<Metadata> {
  const slug = (await props.params).slug

  const {data} = await loadQuery<TargetData | null>(TARGET_QUERY, {
    memberTypes: API_DOCUMENT_TYPES,
    path: slug,
  })

  const title = data?.title
  const ogImage = data?.seo?.og?.image
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
    description: data?.seo?.description || DEFAULT_META_DESCRIPTION,
    openGraph: {
      type: data?.seo?.og?.type || 'website',
      title: data?.seo?.og?.title || data?.title || 'Sanity UI',
      description: data?.seo?.og?.description || DEFAULT_META_DESCRIPTION,
      siteName: 'Sanity UI',
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    twitter: {
      card: data?.seo?.twitter?.cardType || 'summary',
      site: '@sanity_io',
    },
  }
}

export default async function SlugRoute(props: {params: Promise<{slug: string[]}>}) {
  const {params} = props

  const slug = (await params).slug

  try {
    const {data: rawData, sourceMap} = await loadQuery<TargetData | null>(TARGET_QUERY, {
      memberTypes: API_DOCUMENT_TYPES,
      path: slug,
    })

    if ((await draftMode()).isEnabled) {
      return <PreviewPage initial={{data: rawData, sourceMap}} path={slug} />
    }

    const data = rawData ? wrapData({baseUrl: '/studio'}, rawData, sourceMap) : null

    return <Page data={data} path={slug} />
  } catch (error) {
    return <Page error={error as Error} path={slug} />
  }
}
