import {_composeClassNames} from '../../_composeClassNames'
import {elementTone} from '../../props/elementTone/elementTone'
import {box} from '../box/box'
import {hotkeys, root, selectableVarsClassName} from './selectable.css'
import type {SelectableStyleProps} from './types'

/** @public */
export function selectable(props: SelectableStyleProps): string | undefined {
  return _composeClassNames(
    root,
    selectableVarsClassName,
    elementTone({elementTone: props.tone}),
    box(props),
  )
}

/** @public */
export function selectable_hotkeys(): string {
  return hotkeys
}
