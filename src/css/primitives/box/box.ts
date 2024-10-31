import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {flex} from '../../styles/flex'
import {flexItem} from '../../styles/flexItem'
import {gap} from '../../styles/gap'
import {grid} from '../../styles/grid'
import {gridItem} from '../../styles/gridItem'
import {margin} from '../../styles/margin'
import {maxWidth} from '../../styles/maxWidth'
import {overflow} from '../../styles/overflow'
import {padding} from '../../styles/padding'
import {pointerEvents} from '../../styles/pointerEvents'
import {position} from '../../styles/position'
import {width} from '../../styles/width'
import {BoxStyleProps} from './types'

/** @public */
export function box(props: BoxStyleProps): string {
  return composeClassNames(
    'box',
    _resp(undefined, props.display),
    _resp(`h`, props.height),
    _resp(`box`, props.sizing),
    flex(props),
    flexItem(props),
    grid(props),
    gridItem(props),
    gap(props),
    margin(props),
    maxWidth(props),
    props.outline && `outline-${props.outline}`,
    overflow(props),
    padding(props),
    pointerEvents(props),
    position(props),
    width(props),
  )
}
