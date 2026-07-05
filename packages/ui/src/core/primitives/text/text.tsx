import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {
  ResponsiveFontStyleProps,
  responsiveTextAlignStyle,
  responsiveTextFont,
} from '../../styles/internal'
import {ElementType, Props, TextAlign} from '../../types'
import {SpanWithTextOverflow} from '../../utils/spanWithTextOverflow'
import {textBaseStyle} from './styles'

/**
 * @public
 */
export interface TextOwnProps {
  accent?: boolean
  align?: TextAlign | TextAlign[]
  /** When `true` the text color will be muted. */
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
export type TextProps<E extends ElementType = 'div'> = Props<TextOwnProps, E>

const StyledText = styled.div<ResponsiveFontStyleProps>(
  responsiveTextFont,
  responsiveTextAlignStyle,
  textBaseStyle,
)

const TextComponent = forwardRef(function Text(
  props: TextOwnProps & {as?: ElementType} & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    accent = false,
    align,
    children: childrenProp,
    muted = false,
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
    <StyledText
      data-ui="Text"
      {...restProps}
      $accent={accent}
      $align={_getArrayProp(align)}
      $muted={muted}
      ref={ref}
      $size={_getArrayProp(size)}
      $weight={weight}
    >
      <span>{children}</span>
    </StyledText>
  )
})
TextComponent.displayName = 'ForwardRef(Text)'

/**
 * The `Text` component is an agile, themed typographic element.
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Text = TextComponent as unknown as <E extends ElementType = 'div'>(
  props: TextProps<E>,
) => React.JSX.Element
