import {useWorkshop} from '@sanity/ui-workshop'
import axe, {AxeResults} from 'axe-core'
import {useEffect, useMemo, useRef, useState} from 'react'

import {A11yContext, type A11yContextValue} from './A11yContext'
import type {A11yMsg} from './msg'

/** @internal */
export function A11yProvider(props: {children?: React.ReactNode}) {
  const {children} = props
  const {broadcast, channel, origin, path} = useWorkshop<A11yMsg>()
  const [{error, results}, setState] = useState<{
    error: {message: string} | null
    results: AxeResults | null
  }>({
    error: null,
    results: null,
  })
  const runPromiseRef = useRef<Promise<AxeResults> | null>(null)

  const a11y: A11yContextValue = useMemo(() => ({error, results}), [error, results])

  useEffect(() => {
    if (origin === 'main') return

    const runAxe = async () => {
      // Wait for previous run to complete if it exists
      if (runPromiseRef.current) {
        try {
          await runPromiseRef.current
        } catch {
          // Ignore errors from previous run
        }
      }

      // Start new run
      const promise = axe.run()
      runPromiseRef.current = promise

      try {
        const _results = await promise
        broadcast({type: 'workshop/a11y/setResults', path, results: _results})
      } catch (_error) {
        broadcast({type: 'workshop/a11y/setError', message: (_error as Error).message})
      } finally {
        // Clear the ref if this is still the current run
        if (runPromiseRef.current === promise) {
          runPromiseRef.current = null
        }
      }
    }

    runAxe()
  }, [broadcast, origin, path])

  useEffect(() => {
    const unsubscribe = channel.subscribe((msg) => {
      if (msg.type === 'workshop/setPath') {
        setState((s) => ({...s, error: null, results: null}))
      }

      if (msg.type === 'workshop/a11y/setResults') {
        setState((s) => ({...s, error: null, results: msg.results}))
      }

      if (msg.type === 'workshop/a11y/setError') {
        setState((s) => ({...s, error: {message: msg.message}, results: null}))
      }
    })

    return unsubscribe
  }, [channel])

  return <A11yContext.Provider value={a11y}>{children}</A11yContext.Provider>
}
