import {useWorkshop} from '@sanity/ui-workshop'
import {memo, useCallback, useEffect, useMemo, useState} from 'react'

import {_runTest} from './_runTest'
import {PerfMsg} from './msg'
import {PerfContext, PerfContextValue} from './PerfContext'
import {perfReducer} from './perfReducer'
import {PerfState, PerfTest, PerfTestRenderResult} from './types'

/** @internal */
export const PerfProvider = memo(function PerfProvider(props: {
  children?: React.ReactNode
}): React.ReactElement {
  const {children} = props
  const {broadcast, channel} = useWorkshop<PerfMsg>()
  const [{activeTest, results, testDetails, tests}, setState] = useState<PerfState>({
    results: [],
    testDetails: [],
    tests: [],
  })

  const addRenderResult = useCallback(
    (name: string, result: PerfTestRenderResult) => {
      broadcast({type: 'workshop/perf/addRenderResult', name, result})
    },
    [broadcast],
  )

  const clearResults = useCallback(
    (name: string) => {
      broadcast({type: 'workshop/perf/clearResults', name})
    },
    [broadcast],
  )

  const registerTest = useCallback(
    (test: PerfTest) => {
      broadcast({
        type: 'workshop/perf/registerTest',
        description: test.description,
        title: test.title,
        name: test.name,
      })

      setState((s) => ({...s, tests: s.tests.concat([test])}))

      return () => {
        broadcast({type: 'workshop/perf/unregisterTest', name: test.name})
        setState((s) => ({...s, tests: s.tests.filter((t) => t !== test)}))
      }
    },
    [broadcast],
  )

  const runTest = useCallback(
    (testName: string) => {
      broadcast({type: 'workshop/perf/runTest', name: testName})
    },
    [broadcast],
  )

  const perf: PerfContextValue = useMemo(
    () => ({
      activeTest,
      addRenderResult,
      clearResults,
      registerTest,
      results,
      runTest,
      testDetails,
      tests,
    }),
    [activeTest, addRenderResult, clearResults, registerTest, results, runTest, testDetails, tests],
  )

  useEffect(() => {
    return channel.subscribe((msg) => {
      setState((s) => perfReducer(s, msg))

      if (msg.type === 'workshop/perf/runTest') {
        setTimeout(() => {
          const test = tests.find((t) => t.name === msg.name)

          if (test) {
            const container = test.ref.current

            if (container !== null) {
              _runTest(test, container)
                .then((result) => {
                  broadcast({
                    type: 'workshop/perf/addResult',
                    name: test.name,
                    result,
                  })
                })
                .catch((err) => {
                  // eslint-disable-next-line no-console
                  console.error(err)
                })
            }
          }
        }, 0)

        return
      }
    })
  }, [broadcast, channel, tests])

  return <PerfContext.Provider value={perf}>{children}</PerfContext.Provider>
})
