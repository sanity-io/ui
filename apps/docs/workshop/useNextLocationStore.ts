import {WorkshopLocation, WorkshopLocationStore} from '@sanity/ui-workshop'
import {useRouter} from 'next/router'
import {useEffect, useMemo, useRef} from 'react'

export function useNextLocationStore(): WorkshopLocationStore {
  const {beforePopState, events, push: pushLocation, query, replace: replaceLocation} = useRouter()

  const ctxRef = useRef({
    beforePopState,
    events,
    query,
    pushLocation,
    replaceLocation,
  })

  useEffect(() => {
    ctxRef.current.beforePopState = beforePopState
    ctxRef.current.events = events
    ctxRef.current.query = query
    ctxRef.current.pushLocation = pushLocation
    ctxRef.current.replaceLocation = replaceLocation
  }, [beforePopState, events, query, pushLocation, replaceLocation])

  const locationStore: WorkshopLocationStore = useMemo(() => {
    const _subscribers = new Set<(nextLocation: WorkshopLocation) => void>()

    function _get(): Omit<WorkshopLocation, 'type'> {
      const ctx = ctxRef.current
      const {path, ...query} = ctx.query

      return {
        path: (path || '/') as string,
        query: query as any,
      }
    }

    function _handleChange() {
      setTimeout(() => {
        for (const sub of _subscribers) {
          sub({type: 'pop', ..._get()})
        }
      }, 0)
    }

    function _mount() {
      ctxRef.current.events.on('routeChangeComplete', _handleChange)
    }

    function _unmount() {
      ctxRef.current.events.off('routeChangeComplete', _handleChange)
    }

    return {
      get() {
        return _get()
      },
      push(loc) {
        const ctx = ctxRef.current

        ctx.pushLocation({pathname: `/workshop`, query: {path: loc.path, ...loc.query} as any})
      },
      replace(loc) {
        const ctx = ctxRef.current

        ctx.replaceLocation({pathname: `/workshop`, query: {path: loc.path, ...loc.query} as any})
      },
      subscribe(subscriber) {
        if (_subscribers.size === 0) _mount()

        _subscribers.add(subscriber)

        return () => {
          _subscribers.delete(subscriber)

          if (_subscribers.size === 0) _unmount()
        }
      },
    }
  }, [])

  return locationStore
}
