import {useWorkshop, type WorkshopMsg} from '@sanity/ui-workshop'
import isEqual from 'lodash/isEqual'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {_runTest} from './_runTest'
import type {PerfMsg} from './msg'
import {
  PerfInspectorContext,
  type PerfInspectorContextValue,
  PerfTestContext,
  type PerfTestContextValue,
} from './PerfContext'
import {perfReducer} from './perfReducer'
import type {PerfState, PerfTest, PerfTestRenderResult} from './types'

/** @internal */
export function PerfProvider(props: {children?: React.ReactNode}) {
  const {children} = props
  const {broadcast, channel} = useWorkshop<PerfMsg>()
  const [{activeTest, results, testDetails}, setState] = useState<Omit<PerfState, 'tests'>>({
    activeTest: undefined,
    results: [],
    testDetails: [],
  })
  const testsRef = useRef<PerfTest[]>([])
  const broadcastRef = useRef(broadcast)
  const stateRef = useRef({activeTest, results, testDetails})

  // Keep refs in sync
  useEffect(() => {
    broadcastRef.current = broadcast
  }, [broadcast])

  useEffect(() => {
    stateRef.current = {activeTest, results, testDetails}
  }, [activeTest, results, testDetails])

  const addRenderResult = useCallback((name: string, result: PerfTestRenderResult) => {
    broadcastRef.current({type: 'workshop/perf/addRenderResult', name, result})
  }, [])

  const clearResults = useCallback((name: string) => {
    broadcastRef.current({type: 'workshop/perf/clearResults', name})
  }, [])

  const registerTest = useCallback((test: PerfTest) => {
    // Store test in ref only (not in state)
    testsRef.current = testsRef.current.concat([test])

    // Broadcast testDetails to main window
    broadcastRef.current({
      type: 'workshop/perf/registerTest',
      description: test.description,
      title: test.title,
      name: test.name,
    })

    return () => {
      // Remove from ref only (not from state)
      testsRef.current = testsRef.current.filter((t) => t !== test)

      // Broadcast testDetails to main window
      broadcastRef.current({type: 'workshop/perf/unregisterTest', name: test.name})
    }
  }, [])

  const runTest = useCallback((testName: string) => {
    broadcastRef.current({type: 'workshop/perf/runTest', name: testName})
  }, [])

  // Split context into test context (stable, rarely changes) and inspector context (changes frequently)
  const testContext: PerfTestContextValue = useMemo(
    () => ({
      activeTest,
      addRenderResult,
      registerTest,
    }),
    [activeTest, addRenderResult, registerTest],
  )

  const inspectorContext: PerfInspectorContextValue = useMemo(
    () => ({
      clearResults,
      results,
      runTest,
      testDetails,
    }),
    [clearResults, results, runTest, testDetails],
  )

  useEffect(() => {
    let mounted = true
    let pendingMessages: (PerfMsg | WorkshopMsg)[] = []
    let updateScheduled = false

    const processPendingMessages = () => {
      updateScheduled = false
      if (!mounted || pendingMessages.length === 0) {
        return
      }

      const messages = pendingMessages
      pendingMessages = []

      setState((s) => {
        let nextState = s as PerfState
        for (const msg of messages) {
          nextState = perfReducer(nextState, msg) as PerfState
        }

        // Only update if state actually changed
        if (isEqual(s, nextState)) {
          return s
        }

        return nextState as Omit<PerfState, 'tests'>
      })
    }

    const unsubscribe = channel.subscribe((msg) => {
      if (!mounted) {
        return
      }

      // Batch messages together
      pendingMessages.push(msg)

      if (!updateScheduled) {
        updateScheduled = true
        queueMicrotask(processPendingMessages)
      }

      if (msg.type === 'workshop/perf/runTest') {
        // Use setTimeout to ensure state update has been processed
        setTimeout(() => {
          if (!mounted) {
            return
          }

          const test = testsRef.current.find((t) => t.name === msg.name)

          if (test) {
            const container = test.ref.current

            if (container !== null) {
              _runTest(test, container)
                .then((result) => {
                  if (mounted) {
                    broadcastRef.current({
                      type: 'workshop/perf/addResult',
                      name: test.name,
                      result,
                    })
                  }
                })
                .catch((err) => {
                  if (mounted) {
                    // eslint-disable-next-line no-console
                    console.error(err)

                    // broadcastRef.current({
                    //   type: 'workshop/perf/addResult',
                    //   name: test.name,
                    //   result,
                    // })
                    broadcastRef.current({
                      type: 'workshop/perf/addResult',
                      name: test.name,
                      result: {
                        avgDuration: 0,
                        sumDuration: 0,
                        runs: 0,
                      },
                    })
                  }
                })
            }
          }
        }, 0)

        return
      }
    })

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [channel])

  return (
    <PerfTestContext.Provider value={testContext}>
      <PerfInspectorContext.Provider value={inspectorContext}>
        {children}
      </PerfInspectorContext.Provider>
    </PerfTestContext.Provider>
  )
}
