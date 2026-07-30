import {styled} from 'styled-components'

import {ThemeFontWeightKey} from '../../../theme/system/font'
import {responsiveHeadingFont} from '../../styles/font/headingFontStyle'
import {responsiveTextAlignStyle} from '../../styles/font/textAlignStyle'
import {ResponsiveFontStyleProps, ResponsiveTextAlignStyleProps} from '../../styles/font/types'
import {_getArrayProp} from '../../styles/helpers'
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

const StyledHeading = styled.div<
  HeadingStyleProps & ResponsiveTextAlignStyleProps & ResponsiveFontStyleProps
>(headingBaseStyle, responsiveTextAlignStyle, responsiveHeadingFont)

const HeadingComponent = function Heading(
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
// oxlint-disable-next-line no-unsafe-type-assertion
export const Heading = HeadingComponent as unknown as <E extends ElementType = 'div'>(
  props: HeadingProps<E>,
) => React.JSX.Element
