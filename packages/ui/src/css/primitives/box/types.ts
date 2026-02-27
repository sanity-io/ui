import type {AlignItemsStyleProps} from '../../props/alignItems/types'
import type {BorderStyleProps} from '../../props/border/types'
import type {BoxSizingStyleProps} from '../../props/boxSizing/types'
import type {DisplayStyleProps} from '../../props/display/types'
import type {FlexStyleProps} from '../../props/flex/types'
import type {FlexDirectionStyleProps} from '../../props/flexDirection/types'
import type {FlexWrapStyleProps} from '../../props/flexWrap/types'
import type {GapStyleProps} from '../../props/gap/types'
import type {GridAutoColumnsStyleProps} from '../../props/gridAutoColumns/types'
import type {GridAutoFlowStyleProps} from '../../props/gridAutoFlow/types'
import type {GridAutoRowsStyleProps} from '../../props/gridAutoRows/types'
import type {GridColumnStyleProps} from '../../props/gridColumn/types'
import type {GridColumnEndStyleProps} from '../../props/gridColumnEnd/types'
import type {GridColumnStartStyleProps} from '../../props/gridColumnStart/types'
import type {GridRowStyleProps} from '../../props/gridRow/types'
import type {GridRowEndStyleProps} from '../../props/gridRowEnd/types'
import type {GridRowStartStyleProps} from '../../props/gridRowStart/types'
import type {GridTemplateColumnsStyleProps} from '../../props/gridTemplateColumns/types'
import type {GridTemplateRowsStyleProps} from '../../props/gridTemplateRows/types'
import type {HeightStyleProps} from '../../props/height/types'
import type {InsetStyleProps} from '../../props/inset/types'
import type {JustifyContentStyleProps} from '../../props/justifyContent/types'
import type {MarginStyleProps} from '../../props/margin/types'
import type {MaxWidthStyleProps} from '../../props/maxWidth/types'
import type {MinHeightStyleProps} from '../../props/minHeight/types'
import type {MinWidthStyleProps} from '../../props/minWidth/types'
import type {OverflowStyleProps} from '../../props/overflow/types'
import type {PaddingStyleProps} from '../../props/padding/types'
import type {PointerEventsStyleProps} from '../../props/pointerEvents/types'
import type {PositionStyleProps} from '../../props/position/types'
import type {RadiusStyleProps} from '../../props/radius/types'
import type {ShadowStyleProps} from '../../props/shadow/types'
import type {TextAlignStyleProps} from '../../props/textAlign/types'
import type {WidthStyleProps} from '../../props/width/types'

/**
 * Composite style props for the {@link Box} component.
 *
 * @remarks
 * `BoxStyleProps` combines all foundational CSS utility style prop interfaces into a
 * single type. It serves as the base style prop interface for layout primitives such as
 * `Box`, `Card`, `Flex`, `Grid`, `Stack`, and others.
 *
 *   {@link GridColumnStyleProps}, {@link GridColumnStartStyleProps}, {@link GridColumnEndStyleProps},
 *   {@link GridRowStyleProps}, {@link GridRowStartStyleProps}, {@link GridRowEndStyleProps},
 *   {@link GridTemplateColumnsStyleProps}, {@link GridTemplateRowsStyleProps}
 * - **Sizing:** {@link HeightStyleProps}, {@link MaxWidthStyleProps}, {@link MinHeightStyleProps},
 *   {@link MinWidthStyleProps}, {@link WidthStyleProps}
 * - **Inset:** {@link InsetStyleProps}
 * - **Justify:** {@link JustifyContentStyleProps}
 * - **Margin:** {@link MarginStyleProps}
 * - **Overflow:** {@link OverflowStyleProps}
 * - **Padding:** {@link PaddingStyleProps}
 * - **Pointer Events:** {@link PointerEventsStyleProps}
 * - **Position:** {@link PositionStyleProps}
 * - **Radius:** {@link RadiusStyleProps}
 * - **Shadow:** {@link ShadowStyleProps}
 * - **Text Align:** {@link TextAlignStyleProps}
 *
 * @public
 */
export interface BoxStyleProps
  extends AlignItemsStyleProps,
    BorderStyleProps,
    DisplayStyleProps,
    FlexDirectionStyleProps,
    FlexStyleProps,
    FlexWrapStyleProps,
    GapStyleProps,
    GridAutoColumnsStyleProps,
    GridAutoFlowStyleProps,
    GridAutoRowsStyleProps,
    GridColumnEndStyleProps,
    GridColumnStartStyleProps,
    GridColumnStyleProps,
    GridRowEndStyleProps,
    GridRowStartStyleProps,
    GridRowStyleProps,
    GridTemplateColumnsStyleProps,
    GridTemplateRowsStyleProps,
    HeightStyleProps,
    InsetStyleProps,
    JustifyContentStyleProps,
    MarginStyleProps,
    MaxWidthStyleProps,
    MinHeightStyleProps,
    MinWidthStyleProps,
    OverflowStyleProps,
    PaddingStyleProps,
    PointerEventsStyleProps,
    PositionStyleProps,
    RadiusStyleProps,
    ShadowStyleProps,
    TextAlignStyleProps,
    WidthStyleProps {
  /**
   * A custom CSS class name to append to the element.
   */
  className?: string

  /**
   * When `true`, reduces the visual prominence of the element by applying
   * a muted foreground color from the theme.
   */
  muted?: boolean

  /**
   * Removes the default focus outline from the element.
   *
   * @remarks
   * The only accepted value is `"none"`, which sets `outline: none` on the element.
   */
  outline?: 'none'

  /**
   * Controls how the total width and height of the element are calculated.
   *
   * @remarks
   * A convenience alias for the CSS `box-sizing` property.
   */
  sizing?: BoxSizingStyleProps['boxSizing']
}
