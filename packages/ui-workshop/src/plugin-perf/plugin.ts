import type {WorkshopPlugin} from '@sanity/ui-workshop'

import {PerfInspector} from './PerfInspector'
import {PerfProvider} from './PerfProvider'

/** @internal */
export function perfPlugin(): WorkshopPlugin {
  return {
    name: 'perf',
    title: 'Performance',
    inspector: PerfInspector,
    provider: PerfProvider,
  }
}
