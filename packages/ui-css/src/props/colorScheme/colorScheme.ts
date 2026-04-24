import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {_colorSchemeVarsClassNames} from '../../vars/build/color/_scheme.css'
import {codeVarsClassName} from '../../vars/component/code.css'
// import {root} from './colorScheme.css'
import type {ColorSchemeStyleProps} from './types'

/** @public */
export function colorScheme(props: ColorSchemeStyleProps) {
  return _composeClassNames(
    // root,
    _colorSchemeVarsClassNames[props.colorScheme ?? 'light'],
    // schemes[props.colorScheme ?? 'light'],
    codeVarsClassName,
  )
}
