'use client'
import {
  createElement,
  lazy,
  ReactNode,
  Suspense,
  useDeferredValue,
  useSyncExternalStore,
} from 'react'

import {Layout} from '@/components/Layout'

// The arcade can only run in the browser: `useSyncExternalStore` renders the
// server snapshot (`false`) on the server and during hydration, and flips to
// the client snapshot (`true`) right after
const emptySubscribe = () => () => {}
const getIsMounted = () => true
const getServerIsMounted = () => false

export function ArcadePage(props: {
  searchParams: {
    title?: string
    description?: string
  }
}): ReactNode {
  const {searchParams: _searchParams} = props

  // `useDeferredValue` with the server snapshot as its initial value keeps
  // hydration non-blocking: the arcade mounts in a deferred re-render instead
  // of forcing a synchronous one
  const mounted = useDeferredValue(
    useSyncExternalStore(emptySubscribe, getIsMounted, getServerIsMounted),
    getServerIsMounted(),
  )

  if (!mounted) return null

  return (
    <Layout path={['arcade']}>
      <Suspense>{createElement(lazy(() => import('@/lib/arcade/default')))}</Suspense>
    </Layout>
  )
}
