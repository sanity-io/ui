import {_composeClassNames} from '../../_composeClassNames'
import {alignItems} from '../../props/alignItems/alignItems'
import {border} from '../../props/border/border'
import {boxSizing} from '../../props/boxSizing/boxSizing'
import {display} from '../../props/display/display'
import {flex} from '../../props/flex/flex'
import {flexDirection} from '../../props/flexDirection/flexDirection'
import {flexWrap} from '../../props/flexWrap/flexWrap'
import {gap} from '../../props/gap/gap'
import {gridAutoColumns} from '../../props/gridAutoColumns/gridAutoColumns'
import {gridAutoFlow} from '../../props/gridAutoFlow/gridAutoFlow'
import {gridAutoRows} from '../../props/gridAutoRows/gridAutoRows'
import {gridColumn} from '../../props/gridColumn/gridColumn'
import {gridColumnEnd} from '../../props/gridColumnEnd/gridColumnEnd'
import {gridColumnStart} from '../../props/gridColumnStart/gridColumnStart'
import {gridRow} from '../../props/gridRow/gridRow'
import {gridRowEnd} from '../../props/gridRowEnd/gridRowEnd'
import {gridRowStart} from '../../props/gridRowStart/gridRowStart'
import {gridTemplateColumns} from '../../props/gridTemplateColumns/gridTemplateColumns'
import {gridTemplateRows} from '../../props/gridTemplateRows/gridTemplateRows'
import {height} from '../../props/height/height'
import {inset} from '../../props/inset/inset'
import {justifyContent} from '../../props/justifyContent/justifyContent'
import {margin} from '../../props/margin/margin'
import {maxWidth} from '../../props/maxWidth/maxWidth'
import {minHeight} from '../../props/minHeight/minHeight'
import {minWidth} from '../../props/minWidth/minWidth'
import {outline} from '../../props/outline/outline'
import {overflow} from '../../props/overflow/overflow'
import {padding} from '../../props/padding/padding'
import {pointerEvents} from '../../props/pointerEvents/pointerEvents'
import {position} from '../../props/position/position'
import {radius} from '../../props/radius/radius'
import {shadow} from '../../props/shadow/shadow'
import {textAlign} from '../../props/textAlign/textAlign'
import {width} from '../../props/width/width'
import {muted, root} from './box.css'
import type {BoxStyleProps} from './types'

/** @public */
export function box(props: BoxStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    props.muted && muted,
    alignItems(props),
    border(props),
    boxSizing({boxSizing: props.sizing}),
    display(props),
    height(props),
    flex(props),
    flexDirection(props),
    flexWrap(props),
    gap(props),
    gridAutoColumns(props),
    gridAutoFlow(props),
    gridAutoRows(props),
    gridColumn(props),
    gridColumnEnd(props),
    gridColumnStart(props),
    gridRow(props),
    gridRowEnd(props),
    gridRowStart(props),
    gridTemplateColumns(props),
    gridTemplateRows(props),
    inset(props),
    justifyContent(props),
    margin(props),
    maxWidth(props),
    minHeight(props),
    minWidth(props),
    overflow(props),
    padding(props),
    pointerEvents(props),
    position(props),
    outline(props),
    radius(props),
    shadow(props),
    textAlign(props),
    width(props),
  )
}
