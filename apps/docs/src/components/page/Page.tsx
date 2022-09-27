'use client'

import {WrappedValue} from '@sanity/react-loader/jsx'
import {Card, Text} from '@sanity/ui'

import {useApp} from '@/app/useApp'
import {ArticlePage, PageBuilder} from '@/components/page'
import {TargetData} from '@/lib/data'

import {Layout} from '../Layout'

export interface PageProps {
  data?: WrappedValue<TargetData> | null
  error?: Error
  path: string[]
}

export function Page(props: PageProps) {
  const {data, error, path} = props
  const {nav} = useApp()

  const pageNav = nav?.children?.find((item) => path.length && item.segment === path[0])

  if (error) {
    return (
      <Layout path={path}>
        <Card flex={1}>
          <pre>{error.message}</pre>
        </Card>
      </Layout>
    )
  }

  if (data === null) {
    return (
      <Layout path={path}>
        <Card flex={1}>
          <div>no target</div>
        </Card>
      </Layout>
    )
  }

  if (pageNav) {
    return (
      <Layout path={path}>
        <ArticlePage
          article={(data?._type === 'article' ? data : undefined) as any}
          nav={pageNav}
          path={path}
        />
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout path={path}>
        <Card flex={1} padding={[4, 4, 5]}>
          <Text muted size={1}>
            Loading…
          </Text>
        </Card>
      </Layout>
    )
  }

  if (data._type === 'article') {
    return (
      <Layout path={path}>
        <ArticlePage article={data} nav={pageNav} path={path} />
      </Layout>
    )
  }

  return (
    <Layout path={path}>
      <PageBuilder page={data} />
    </Layout>
  )
}
