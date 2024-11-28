import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {styled} from 'styled-components'
import {useArrayProp} from '../../hooks'
import {
  ResponsiveFontStyleProps,
  responsiveHeadingFont,
  responsiveTextAlignStyle,
  ResponsiveTextAlignStyleProps,
} from '../../styles/internal'
import {TextAlign} from '../../types'
import {headingBaseStyle} from './styles'
import {HeadingStyleProps} from './types'

/**
 * @public
 */
export interface HeadingProps {
  accent?: boolean
  align?: TextAlign | TextAlign[]
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: number | number[]
  /**
   * Controls how overflowing text is treated.
   * Use `textOverflow="ellipsis"` to render text as a single line which is concatenated with a `…` symbol.
   * @beta
   */
  textOverflow?: 'ellipsis' | 'none'
  weight?: ThemeFontWeightKey
}

const Root = styled.div<
  HeadingStyleProps & ResponsiveTextAlignStyleProps & ResponsiveFontStyleProps
>(headingBaseStyle, responsiveTextAlignStyle, responsiveHeadingFont)

const SpanWithTextOverflow = styled.span`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow: clip;
`

/**
 * Typographic headings.
 *
 * @public
 */
export const Heading = forwardRef(function Heading(
  props: HeadingProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLElement>,
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
    <Root
      data-ui="Heading"
      {...restProps}
      $accent={accent}
      $align={useArrayProp(align)}
      $muted={muted}
      $size={useArrayProp(size)}
      $weight={weight}
      ref={ref}
    >
      <span>{children}</span>
    </Root>
  )
})
Heading.displayName = 'ForwardRef(Heading)'
