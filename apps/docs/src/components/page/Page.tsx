'use client'

import {Card, Text} from '@sanity/ui'

import {useApp} from '@/app/useApp'
import {ArticlePage, PageBuilder} from '@/components/page'
import {TargetData} from '@/lib/data'

export interface PageProps {
  data?: TargetData | null
  error?: Error
  path: string[]
}

export function Page(props: PageProps) {
  const {data, error, path} = props
  const {nav} = useApp()

  const pageNav = nav?.children?.find((item) => path.length && item.segment === path[0])

  if (error) {
    return (
      <Card flex={1}>
        <pre>{error.message}</pre>
      </Card>
    )
  }

  if (data === null) {
    return (
      <Card flex={1}>
        <div>no target</div>
      </Card>
    )
  }

  if (pageNav) {
    return (
      <ArticlePage
        article={data?._type === 'article' ? data : undefined}
        nav={pageNav}
        path={path}
      />
    )
  }

  if (!data) {
    return (
      <Card flex={1} padding={[4, 4, 5]}>
        <Text muted size={1}>
          Loading…
        </Text>
      </Card>
    )
  }

  if (data._type === 'article') {
    return <ArticlePage article={data} nav={pageNav} path={path} />
  }

  return <PageBuilder page={data} />
}
