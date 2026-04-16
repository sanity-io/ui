import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {elementTone} from '../../props/elementTone/elementTone'
import {selectableVarsClassName} from '../../vars/component/selectable.css'
import {box} from '../box/box'
import {hotkeys, root} from './selectable.css'
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
