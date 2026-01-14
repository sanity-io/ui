import type {WorkshopPlugin} from '../../config/types'
import {PropsInspector} from './PropsInspector'
import {PropsProvider} from './PropsProvider'

/** @internal */
export function propsPlugin(): WorkshopPlugin {
  return {
    name: 'props',
    title: 'Properties',
    inspector: PropsInspector,
    provider: PropsProvider,
  }
}
