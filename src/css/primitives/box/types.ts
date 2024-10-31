import {GridStyleProps} from '@sanity/ui/css'
import {FlexStyleProps} from '../../styles/flex'
import {FlexItemStyleProps} from '../../styles/flexItem'
import {GapStyleProps} from '../../styles/gap'
import {GridItemStyleProps} from '../../styles/gridItem'
import {MarginStyleProps} from '../../styles/margin'
import {MaxWidthStyleProps} from '../../styles/maxWidth'
import {OverflowStyleProps} from '../../styles/overflow'
import {PaddingStyleProps} from '../../styles/padding'
import {PointerEventsStyleProps} from '../../styles/pointerEvents'
import {PositionStyleProps} from '../../styles/position'
import {WidthStyleProps} from '../../styles/width'
import {ResponsiveProp} from '../../types'

/**
 * @public
 */
export type BoxSizing = 'content' | 'border'

/**
 * @public
 */
export type Display = 'none' | 'block' | 'grid' | 'flex' | 'inline-block'

/**
 * @public
 */
export type BoxHeight = 'stretch' | 'fill'

/** @public */
export interface BoxStyleProps
  extends FlexStyleProps,
    FlexItemStyleProps,
    GapStyleProps,
    GridStyleProps,
    GridItemStyleProps,
    MarginStyleProps,
    MaxWidthStyleProps,
    OverflowStyleProps,
    PaddingStyleProps,
    PointerEventsStyleProps,
    PositionStyleProps,
    WidthStyleProps {
  display?: ResponsiveProp<Display>
  height?: ResponsiveProp<BoxHeight>
  outline?: 'none'
  sizing?: ResponsiveProp<BoxSizing>
}
