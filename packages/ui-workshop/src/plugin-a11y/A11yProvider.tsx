import {useWorkshop} from '@sanity/ui-workshop'
import axe, {AxeResults} from 'axe-core'
import {memo, useEffect, useMemo, useState} from 'react'

import {A11yContext, A11yContextValue} from './A11yContext'
import {A11yMsg} from './msg'

/** @internal */
export const A11yProvider = memo(function A11yProvider(props: {
  children?: React.ReactNode
}): React.ReactNode {
  const {children} = props
  const {broadcast, channel, origin, path} = useWorkshop<A11yMsg>()
  const [{error, results}, setState] = useState<{
    error: {message: string} | null
    results: AxeResults | null
  }>({
    error: null,
    results: null,
  })

  const a11y: A11yContextValue = useMemo(() => ({error, results}), [error, results])

  useEffect(() => {
    if (origin === 'main') return

    axe
      .run()
      .then((_results) => {
        broadcast({type: 'workshop/a11y/setResults', path, results: _results})
      })
      .catch((_error) => {
        broadcast({type: 'workshop/a11y/setError', message: _error.message})
      })
  }, [broadcast, origin, path])

  useEffect(() => {
    channel.subscribe((msg) => {
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
  }, [channel])

  return <A11yContext.Provider value={a11y}>{children}</A11yContext.Provider>
})
