'use client'

import {createElement, lazy, ReactNode, Suspense, useEffect, useState} from 'react'

import {Layout} from '@/components/Layout'

export function ArcadeScreen(): ReactNode {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Layout slug={['arcade']}>
      <Suspense>{createElement(lazy(() => import('@/lib/arcade/default')))}</Suspense>
    </Layout>
  )
}
