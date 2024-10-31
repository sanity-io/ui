import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import type {GridItemStyleProps} from './types'

/** @internal */
export function gridItem(props: GridItemStyleProps): string | undefined {
  return _scopeClassNames(
    _resp(`col`, props.column),
    _resp(`col-start`, props.columnStart),
    _resp(`col-end`, props.columnEnd),
    _resp(`row`, props.row),
    _resp(`row-start`, props.rowStart),
    _resp(`row-end`, props.rowEnd),
  )
}
