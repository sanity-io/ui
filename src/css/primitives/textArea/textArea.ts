import {_comp} from '../../_comp'
import {composeClassNames} from '../../composeClassNames'
import {_input} from '../_input'
import {TextAreaStyleProps} from './types'

export function textArea(props: TextAreaStyleProps): string | undefined {
  return composeClassNames(_comp('text-area'), _input(props))
}
