'use client'

import {createClient} from '@sanity/client'
import {enableOverlays, HistoryAdapter, HistoryAdapterNavigate} from '@sanity/overlays'
import {useLiveMode} from '@sanity/react-loader/rsc'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useMemo, useRef} from 'react'

export function VisualEditing(props: {dataset: string; projectId: string}) {
  const {dataset, projectId} = props

  const client = useMemo(
    () =>
      createClient({
        dataset,
        projectId,
        useCdn: true,
        apiVersion: '2023-12-01',
      }),
    [dataset, projectId],
  )

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const routerRef = useRef(router)
  const navigateRef = useRef<HistoryAdapterNavigate>()

  routerRef.current = router

  const history: HistoryAdapter = useMemo(
    () => ({
      subscribe(navigate) {
        navigateRef.current = navigate
        return () => {
          navigateRef.current = undefined
        }
      },
      update(update) {
        switch (update.type) {
          case 'push':
            return routerRef.current.push(update.url)
          case 'pop':
            return routerRef.current.back()
          case 'replace':
            return routerRef.current.replace(update.url)
          default:
            throw new Error(`Unknown update type: ${update.type}`)
        }
      },
    }),
    [],
  )

  useEffect(() => enableOverlays({history}), [history])

  useEffect(() => {
    navigateRef.current?.({
      type: 'push',
      url: `${pathname}${searchParams?.size ? `?${searchParams}` : ''}`,
    })
  }, [pathname, searchParams])

  useLiveMode({client})

  return null
}
