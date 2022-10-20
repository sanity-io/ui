export type {PropsContextValue} from './PropsContext'

import {WorkshopPlugin} from '../../types'
import {PropsInspector} from './PropsInspector'
import {PropsProvider} from './PropsProvider'

export * from './types'

// export hooks
export * from './hooks'
export * from './useProps'

/** @internal */
export function propsPlugin(): WorkshopPlugin {
  return {
    name: 'props',
    title: 'Properties',
    inspector: PropsInspector,
    provider: PropsProvider,
  }
}
