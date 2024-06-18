import {BoxProps} from '@sanity/ui'
import {compose} from '../../lib/compose'
import {display} from '../../styles/display'
import {flex} from '../../styles/flex'
import {column} from '../../styles/gridItem'
import {
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
} from '../../styles/margin'
import {
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingX,
  paddingY,
} from '../../styles/padding'
import {main} from './Box.css'

export function box(props: BoxProps): string {
  return compose(
    main,
    column(props.column), // todo
    // columnEnd,
    // columnStart,
    display(props.display),
    flex(props.flex),
    // height,
    margin(props.margin),
    marginX(props.marginX),
    marginY(props.marginY),
    marginTop(props.marginTop),
    marginRight(props.marginRight),
    marginBottom(props.marginBottom),
    marginLeft(props.marginLeft),
    // overflow,
    padding(props.padding),
    paddingX(props.paddingX),
    paddingY(props.paddingY),
    paddingTop(props.paddingTop),
    paddingRight(props.paddingRight),
    paddingBottom(props.paddingBottom),
    paddingLeft(props.paddingLeft),
    // row,
    // rowEnd,
    // rowStart,
    // sizing,
  )
}
