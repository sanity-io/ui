'use client'
import dynamic from 'next/dynamic'
import {ReactNode, useDeferredValue, useSyncExternalStore} from 'react'

const ArcadeScreen = dynamic(() => import('@/lib/arcade/default'), {
  ssr: false,
})

// The arcade can only run in the browser: `useSyncExternalStore` renders the
// server snapshot (`false`) on the server and during hydration, and flips to
// the client snapshot (`true`) right after
const emptySubscribe = () => () => {}
const getIsMounted = () => true
const getServerIsMounted = () => false

export function ArcadePage(): ReactNode {
  // `useDeferredValue` with the server snapshot as its initial value keeps
  // hydration non-blocking: the arcade mounts in a deferred re-render instead
  // of forcing a synchronous one
  const mounted = useDeferredValue(
    useSyncExternalStore(emptySubscribe, getIsMounted, getServerIsMounted),
    getServerIsMounted(),
  )

  if (!mounted) return null

  return <ArcadeScreen />
}
