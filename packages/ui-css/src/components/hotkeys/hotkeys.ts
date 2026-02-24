import {_composeClassNames} from '../../_composeClassNames'
import {display} from '../../props/display/display'
import {flexProp} from '../../props/flex/flex'
import {gap} from '../../props/gap/gap'
import {root} from './hotkey.css'
import type {HotkeysStyleProps} from './types'

/** @public */
export function hotkeys(props: HotkeysStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    display({display: 'inline-flex'}),
    flexProp({flex: 'none'}),
    gap({gap: 1}),
  )
}
