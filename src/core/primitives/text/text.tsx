import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {
  ResponsiveFontStyleProps,
  responsiveTextAlignStyle,
  responsiveTextFont,
} from '../../styles/internal'
import {TextAlign} from '../../types'
import {textBaseStyle} from './styles'

/**
 * @public
 */
export interface TextProps {
  accent?: boolean
  align?: TextAlign | TextAlign[]
  as?: React.ElementType | keyof JSX.IntrinsicElements
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

const Root = styled.div<ResponsiveFontStyleProps>(
  responsiveTextFont,
  responsiveTextAlignStyle,
  textBaseStyle,
)

const SpanWithTextOverflow = styled.span`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow: clip;
`

/**
 * The `Text` component is an agile, themed typographic element.
 *
 * @public
 */
export const Text = forwardRef(function Text(
  props: TextProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'size'>,
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
    <Root
      data-ui="Text"
      {...restProps}
      $accent={accent}
      $align={useArrayProp(align)}
      $muted={muted}
      ref={ref}
      $size={useArrayProp(size)}
      $weight={weight}
    >
      <span>{children}</span>
    </Root>
  )
})
