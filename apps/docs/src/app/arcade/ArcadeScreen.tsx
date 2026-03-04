'use client'

import {lazy, ReactNode, startTransition, Suspense, useEffect, useState} from 'react'

import {Layout} from '@/components/Layout'

const LazyArcadeScreen = lazy(() => import('@/lib/arcade/default'))

export function ArcadeScreen(): ReactNode {
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
        <LazyArcadeScreen title="" description="" />
      </Suspense>
    </Layout>
  )
}
