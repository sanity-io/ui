import {ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import type {Decorator} from '@storybook/react-vite'
import {type ComponentType, createElement, type CSSProperties, Fragment, Profiler} from 'react'
import {addons} from 'storybook/preview-api'

import {
  ADDON_ID,
  EVENTS,
  GLOBAL_BENCHMARK_KEY,
  GLOBAL_COUNT_KEY,
  PERFORMANCE_COUNT_OPTIONS,
} from './constants'
import type {PerformanceParameters, ProfilerSlot} from './types'

const channel = addons.getChannel()

const HIDDEN_BENCHMARK_STYLE: CSSProperties = {
  border: 0,
  clip: 'rect(0, 0, 0, 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
}

function createProfilerElement(
  component: ComponentType<Record<string, unknown>>,
  slot: ProfilerSlot,
  context: Parameters<Decorator>[1],
  count: number,
) {
  return createElement(
    'section',
    null,
    createElement(
      Profiler,
      {
        id: `${slot === 'compare' ? 'V3 Comparison' : context.component?.displayName} (${count}x)`,
        onRender: (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
          channel.emit(EVENTS.RENDER, {
            actualDuration,
            baseDuration,
            commitTime,
            id,
            phase,
            slot,
            startTime,
          })
        },
      },
      Array.from({length: count}, (_, index) =>
        createElement(Fragment, {key: index}, createElement(component, context.args)),
      ),
    ),
  )
}

export const withProfiler: Decorator = (Story, context) => {
  const globals = context.globals as Record<string, unknown>
  const parameters = context.parameters[ADDON_ID] as PerformanceParameters | undefined
  const count = (globals?.[GLOBAL_COUNT_KEY] as number) ?? PERFORMANCE_COUNT_OPTIONS[0]
  const benchmarkRun = Number(globals[GLOBAL_BENCHMARK_KEY] ?? 0) || 0
  const Primary = parameters?.component || context.component

  if (!Primary || benchmarkRun === 0) {
    return createElement(Story)
  }

  const Compare = parameters?.compareComponent

  return createElement(
    Fragment,
    null,
    createElement(Story),
    createElement(
      'div',
      {'aria-hidden': true, 'style': HIDDEN_BENCHMARK_STYLE},
      createElement(
        'div',
        {key: benchmarkRun},
        createProfilerElement(Primary, 'primary', context, count),
        Compare &&
          createElement(
            ThemeProvider,
            {theme: buildTheme()},
            createProfilerElement(Compare, 'compare', context, count),
          ),
      ),
    ),
  )
}
