'use client'

import {createClient} from '@sanity/client'
import {useLiveMode} from '@sanity/react-loader/rsc'
import {enableVisualEditing, HistoryAdapterNavigate} from '@sanity/visual-editing'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useMemo, useRef, useState} from 'react'

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
  const [navigate, setNavigate] = useState<HistoryAdapterNavigate | undefined>()

  useEffect(() => {
    routerRef.current = router
  }, [router])

  useEffect(() => {
    return enableVisualEditing({
      history: {
        subscribe: (navigate) => {
          setNavigate(() => navigate)
          return () => setNavigate(undefined)
        },
        update: (update) => {
          const url = update.url.replace(/^(\/ui)/, '')
          switch (update.type) {
            case 'push':
              return routerRef.current.push(url)
            case 'pop':
              return routerRef.current.back()
            case 'replace':
              return routerRef.current.replace(url)
            default:
              throw new Error(`Unknown update type: ${update.type}`)
          }
        },
      },
    })
  }, [])

  useEffect(() => {
    if (navigate) {
      const basePath = '/ui'
      const path = pathname === '/' ? basePath : `${basePath}${pathname}`
      const url = `${path}${searchParams?.size ? `?${searchParams}` : ''}`
      navigate({type: 'push', url})
    }
  }, [navigate, pathname, searchParams])

  useLiveMode({client})

  return null
}
