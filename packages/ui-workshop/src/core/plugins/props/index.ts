import {WorkshopPlugin} from '../../config'
import {PropsInspector} from './PropsInspector'
import {PropsProvider} from './PropsProvider'

export type {PropsContextValue} from './PropsContext'

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
