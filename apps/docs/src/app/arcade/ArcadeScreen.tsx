'use client'

import {lazy, ReactNode, startTransition, Suspense, useEffect, useState} from 'react'

import {Layout} from '@/components/Layout'

const LazyArcadeScreen = lazy(() => import('@/lib/arcade/default'))

export function ArcadeScreen(props: {basePath: string}): ReactNode {
  const {basePath} = props
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setMounted(true)
    })
  }, [])

  if (!mounted) return null

  return (
    <Layout slug={['arcade']}>
      <Suspense>
        <LazyArcadeScreen basePath={basePath} title="" description="" />
      </Suspense>
    </Layout>
  )
}
