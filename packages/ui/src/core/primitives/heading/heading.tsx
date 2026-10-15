import {ThemeFontWeightKey} from '../../../theme/system/font'
import {fontColorStyle} from '../../styles/font/fontColorStyle'
import {_fontWeight, _responsiveFontSize} from '../../styles/font/responsiveFont'
import {responsiveTextAlignStyle} from '../../styles/font/textAlignStyle'
import {
  ResponsiveFontSizeStyleProps,
  ResponsiveFontStyleProps,
  ResponsiveTextAlignStyleProps,
} from '../../styles/font/types'
import {_getArrayProp} from '../../styles/helpers'
import {styled} from '../../styles/styled'
import {ElementType, Props} from '../../types/component'
import {TextAlign} from '../../types/text'
import {SpanWithTextOverflow} from '../../utils/spanWithTextOverflow'
import {headingBaseStyle} from './styles'
import {HeadingStyleProps} from './types'

/**
 * @public
 */
export interface HeadingOwnProps {
  accent?: boolean
  align?: TextAlign | TextAlign[]
  muted?: boolean
  size?: number | number[]
  /**
   * Controls how overflowing text is treated.
   * Use `textOverflow="ellipsis"` to render text as a single line which is concatenated with a `…` symbol.
   * @beta
   */
  textOverflow?: 'ellipsis'
  weight?: ThemeFontWeightKey
}

/**
 * @public
 */
export type HeadingProps<E extends ElementType = 'div'> = Props<HeadingOwnProps, E>

const HeadingBase = styled.div(headingBaseStyle)

const HeadingSize = styled(HeadingBase)<ResponsiveFontSizeStyleProps>((props) =>
  _responsiveFontSize('heading', props),
)

const StyledHeading = styled(HeadingSize)<
  HeadingStyleProps & ResponsiveTextAlignStyleProps & ResponsiveFontStyleProps
>(fontColorStyle, responsiveTextAlignStyle, (props) => _fontWeight('heading', props))

function HeadingComponent(
  props: HeadingOwnProps & {as?: ElementType} & Omit<
      React.HTMLProps<HTMLDivElement>,
      'as' | 'size'
    >,
) {
  const {
    accent = false,
    align,
    children: childrenProp,
    muted = false,
    ref,
    size = 2,
    textOverflow,
    weight,
    ...restProps
  } = props

  let children = childrenProp

  if (textOverflow === 'ellipsis') {
    children = <SpanWithTextOverflow>{children}</SpanWithTextOverflow>
  }

  return (
    <StyledHeading
      data-ui="Heading"
      {...restProps}
      $accent={accent}
      $align={_getArrayProp(align)}
      $muted={muted}
      $size={_getArrayProp(size)}
      $weight={weight}
      ref={ref}
    >
      <span>{children}</span>
    </StyledHeading>
  )
}

/**
 * Typographic headings.
 *
 * @public
 */
export const Heading: <E extends ElementType = 'div'>(props: HeadingProps<E>) => React.JSX.Element =
  HeadingComponent
