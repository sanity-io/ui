import {forwardRef, memo} from 'react'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {compose} from '../../styles'
import {
  ResponsiveFontStyleProps,
  responsiveTextAlignStyle,
  responsiveTextFont,
} from '../../styles/internal'
import {ThemeFontWeightKey} from '../../theme'
import {TextAlign} from '../../types'
import {textBaseStyle} from './styles'

/**
 * @public
 */
export interface TextProps {
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
  textOverflow?: 'ellipsis'
  weight?: ThemeFontWeightKey
}

const Root = memo(
  compose<ResponsiveFontStyleProps>('div', [
    responsiveTextFont,
    responsiveTextAlignStyle,
    textBaseStyle,
  ])
)

const SpanWithTextOverflow = memo(
  styled.span({
    display: 'block',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  })
)

/**
 * @public
 */
export const Text = forwardRef(function Text(
  props: TextProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLDivElement>
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
