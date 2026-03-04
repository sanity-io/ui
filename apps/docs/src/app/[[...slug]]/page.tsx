import {wrapData} from '@sanity/react-loader/jsx'
import {Metadata} from 'next'

import {Page} from '@/components/page'
import {TARGET_QUERY, TargetData} from '@/lib/data'
import createImageUrlBuilder from '@sanity/image-url'

import {DEFAULT_META_DESCRIPTION} from '../constants'
import {getContext} from '../context'
import {ArcadeScreen} from '../ArcadeScreen'

export async function generateMetadata(props: PageProps<'/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params

  const {dataset, projectId, slug, sanityFetch, version} = await getContext(params.slug)

  const imageUrlBuilder = createImageUrlBuilder({
    projectId,
    dataset,
  })

  const result = await sanityFetch({
    query: TARGET_QUERY,
    params: {
      navId: version,
      path: slug ?? [null],
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

export default async function SlugPage(props: PageProps<'/[[...slug]]'>) {
  const params = await props.params

  const {isDraftMode, studioBaseUrl, sanityFetch, slug, version} = await getContext(params.slug)

  if (slug && slug[0] === 'arcade') {
    return <ArcadeScreen />
  }

  try {
    const result = await sanityFetch({
      query: TARGET_QUERY,
      params: {
        navId: version,
        path: slug ? (slug.length === 0 ? [null] : slug) : [null],
      },
    })

    const rawData = result.data as TargetData | null
    const sourceMap = result.sourceMap || undefined

    const isArcade =
      rawData?._type === 'screen' &&
      rawData.sections?.some((s) => s._type === 'screenSection.arcade')

    if (isArcade) {
      const ArcadeScreen = await import('@/lib/arcade/ArcadeScreen').then(
        (module) => module.ArcadeScreen,
      )

      return <ArcadeScreen title="" description="" />
    }

    if (isDraftMode) {
      const PreviewPage = await import('@/components/page/PreviewPage').then(
        (module) => module.PreviewPage,
      )

      return <PreviewPage initial={{data: rawData, sourceMap}} slug={slug} />
    }

    const data = rawData ? wrapData({baseUrl: studioBaseUrl}, rawData, sourceMap) : null

    return <Page data={data} error={undefined} slug={slug ?? []} />
  } catch (error) {
    return <Page data={null} error={error} slug={slug ?? []} />
  }
}
