import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {useArrayProp} from '../../hooks'
import {responsiveLabelFont, responsiveTextAlignStyle} from '../../styles/internal'
import {TextAlign} from '../../types'
import {SpanWithTextOverflow} from '../../utils/spanWithTextOverflow'
import {labelBaseStyle} from './styles'

/**
 * @public
 */
export interface LabelProps {
  accent?: boolean
  align?: TextAlign | TextAlign[]
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
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

const StyledLabel = styled.div<{
  $accent?: boolean
  $align: TextAlign[]
  $muted: boolean
  $size: number[]
}>(responsiveLabelFont, responsiveTextAlignStyle, labelBaseStyle)

/**
 * Typographic labels.
 *
 * @public
 */
export const Label = forwardRef(function Label(
  props: LabelProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    accent,
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
  } else {
    children = <span>{children}</span>
  }

  return (
    <StyledLabel
      data-ui="Label"
      {...restProps}
      $accent={accent}
      $align={useArrayProp(align)}
      $muted={muted}
      $size={useArrayProp(size)}
      $weight={weight}
      ref={ref}
    >
      {children}
    </StyledLabel>
  )
})
Label.displayName = 'ForwardRef(Label)'
