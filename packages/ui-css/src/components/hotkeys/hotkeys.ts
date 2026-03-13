import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {display} from '../../props/display/display'
import {flexProp} from '../../props/flex/flex'
import {gap} from '../../props/gap/gap'
import {root} from './hotkeys.css'
import type {HotkeysStyleProps} from './types'

/** @public */
export function hotkeys(props: HotkeysStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    display({display: 'flex'}),
    flexProp({flex: 'none'}),
    gap({gap: 1}),
  )
}
