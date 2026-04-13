import {wrapData} from '@sanity/react-loader/jsx'
import {Metadata} from 'next'
import {draftMode} from 'next/headers'

import {Page, PreviewPage} from '@/components/page'
import {TARGET_QUERY, TargetData} from '@/lib/data'
import createImageUrlBuilder from '@sanity/image-url'

import {DEFAULT_META_DESCRIPTION} from '../constants'
import {getContext} from '../context'

export async function generateMetadata(props: {
  params: Promise<{slug: string[]}>
}): Promise<Metadata> {
  const slug = (await props.params).slug

  const {dataset, projectId, sanityFetch} = await getContext()

  const imageUrlBuilder = createImageUrlBuilder({
    projectId,
    dataset,
  })

  const result = await sanityFetch({
    query: TARGET_QUERY,
    params: {
      path: slug,
    },
  })

  const data = result.data as TargetData | null

  const title = data?.title
  const ogImage = data?.seo?.og?.image
  const ogImageUrl = ogImage?.asset ? imageUrlBuilder.image(ogImage.asset).url() : null

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
    const {studioBaseUrl, sanityFetch} = await getContext()

    const result = await sanityFetch({
      query: TARGET_QUERY,
      params: {
        path: slug,
      },
    })

    const rawData = result.data as TargetData | null

    const sourceMap = result.sourceMap || undefined // {data: rawData, sourceMap}

    if ((await draftMode()).isEnabled) {
      // eslint-disable-next-line react-hooks/error-boundaries
      return <PreviewPage initial={{data: rawData, sourceMap}} path={slug} />
    }

    const data = rawData
      ? wrapData(
          {
            baseUrl: studioBaseUrl,
          },
          rawData,
          sourceMap,
        )
      : null

    // eslint-disable-next-line react-hooks/error-boundaries
    return <Page data={data} path={slug} />
  } catch (error) {
    return <Page error={error as Error} path={slug} />
  }
}
