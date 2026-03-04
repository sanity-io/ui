'use client'

import {WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Code, Text} from '@sanity/ui'

import {useApp} from '@/app/useApp'
import {ArticlePage, PageBuilder} from '@/components/page'
import {TargetData} from '@/lib/data'

import {Layout} from '../Layout'

export interface PageProps {
  data: WrappedValue<TargetData> | null
  error: unknown
  slug: string[] | undefined
}

export function Page(props: PageProps) {
  const {data, error, slug} = props
  const {nav} = useApp()

  if (error) {
    return (
      <Layout slug={slug}>
        <Box flex={1} padding={[4, 4, 5]}>
          <Code size={1}>{error instanceof Error ? error.message : JSON.stringify(error)}</Code>
        </Box>
      </Layout>
    )
  }

  if (data === null) {
    return (
      <Layout slug={slug}>
        <Box flex={1} padding={[4, 4, 5]}>
          <Text muted size={1}>
            Page not found
          </Text>
        </Box>
      </Layout>
    )
  }

  if (data._type === 'article') {
    const pageNav = nav?.children?.find((item) => slug?.length && item.segment === slug[0])

    return (
      <Layout slug={slug}>
        <ArticlePage article={data} nav={pageNav} slug={slug} />
      </Layout>
    )
  }

  return (
    <Layout slug={slug}>
      <PageBuilder page={data} />
    </Layout>
  )
}
