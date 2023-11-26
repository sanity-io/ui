import {WorkshopPlugin} from '@sanity/ui-workshop'

import {A11yInspector} from './A11yInspector'
import {A11yProvider} from './A11yProvider'

/** @internal */
export function a11yPlugin(): WorkshopPlugin {
  return {
    name: 'a11y',
    title: 'A11y',
    inspector: A11yInspector,
    provider: A11yProvider,
  }
}
