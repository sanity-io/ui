import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {_colorSchemeVarsClassNames} from '../../vars/_colorScheme.css'
import {schemes} from './colorScheme.css'
import type {ColorSchemeStyleProps} from './types'

/** @public */
export function colorScheme(props: ColorSchemeStyleProps) {
  return _composeClassNames(
    _colorSchemeVarsClassNames[props.colorScheme ?? 'light'],
    schemes[props.colorScheme ?? 'light'],
  )
}
