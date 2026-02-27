import type {WorkshopMsg} from '@sanity/ui-workshop'

import type {PerfMsg} from './msg'
import type {PerfState} from './types'

/** @internal */
export function perfReducer(state: PerfState, msg: PerfMsg | WorkshopMsg): PerfState {
  if (msg.type === 'workshop/perf/clearResults') {
    return {...state, results: state.results.filter((d) => d.name !== msg.name)}
  }

  if (msg.type === 'workshop/perf/registerTest') {
    return {
      ...state,
      testDetails: state.testDetails.concat([
        {
          description: msg.description,
          name: msg.name,
          title: msg.title,
        },
      ]),
    }
  }

  if (msg.type === 'workshop/perf/unregisterTest') {
    return {...state, testDetails: state.testDetails.filter((d) => d.name !== msg.name)}
  }

  if (msg.type === 'workshop/perf/runTest') {
    return {
      ...state,
      activeTest: msg.name,
      results: state.results.concat([
        {
          name: msg.name,
          renders: [],
        },
      ]),
    }
  }

  if (msg.type === 'workshop/perf/addResult') {
    if (state.activeTest === msg.name) {
      const result = state.results.filter((r) => r.name === msg.name)
      const lastResult = result[result.length - 1]

      if (lastResult) {
        return {
          ...state,
          results: state.results.map((r) => {
            if (r === lastResult) {
              return {...r, timing: msg.result}
            }

            return r
          }),
        }
      }
    }

    return state
  }

  if (msg.type === 'workshop/perf/addRenderResult') {
    if (state.activeTest === msg.name) {
      const result = state.results.filter((r) => r.name === msg.name)
      const lastResult = result[result.length - 1]

      if (lastResult) {
        return {
          ...state,
          results: state.results.map((r) => {
            if (r === lastResult) {
              return {...r, renders: r.renders.concat([msg.result])}
            }

            return r
          }),
        }
      }
    }

    return state
  }

  return state
}
