import {_composeClassNames} from '../../_composeClassNames'
import {_colorSchemeVarsClassNames} from '../../system/_colorScheme.css'
import {schemes} from './colorScheme.css'
import type {ColorSchemeStyleProps} from './types'

/** @public */
export function colorScheme(props: ColorSchemeStyleProps) {
  return _composeClassNames(
    _colorSchemeVarsClassNames[props.colorScheme ?? 'light'],
    schemes[props.colorScheme ?? 'light'],
  )
}
