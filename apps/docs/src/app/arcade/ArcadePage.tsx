'use client'

import {createElement, lazy, ReactNode, Suspense, useEffect, useState} from 'react'

import {Layout} from '@/components/Layout'

export function ArcadePage(props: {
  searchParams: Promise<{
    title?: string
    description?: string
  }>
}): ReactNode {
  const {searchParams: _searchParams} = props

  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Layout path={['arcade']}>
      <Suspense>{createElement(lazy(() => import('@/lib/arcade/default')))}</Suspense>
    </Layout>
  )
}
