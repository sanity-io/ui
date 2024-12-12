import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {GridItemStyleProps} from './types'

/** @public */
export function gridItem(props: GridItemStyleProps): string | undefined {
  return composeClassNames(
    _resp(`col`, props.column),
    _resp(`col-start`, props.columnStart),
    _resp(`col-end`, props.columnEnd),
    _resp(`row`, props.row),
    _resp(`row-start`, props.rowStart),
    _resp(`row-end`, props.rowEnd),
  )
}
