import {WorkshopPlugin} from '../../types'
import {PropsInspector} from './PropsInspector'
import {PropsProvider} from './PropsProvider'

// export hooks
export * from './hooks'
export * from './useProps'

export function propsPlugin(): WorkshopPlugin {
  return {
    name: 'props',
    title: 'Properties',
    inspector: PropsInspector,
    provider: PropsProvider,
  }
}
