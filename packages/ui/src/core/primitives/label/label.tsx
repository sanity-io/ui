import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {_getArrayProp} from '../../styles'
import {responsiveLabelFont, responsiveTextAlignStyle} from '../../styles/internal'
import {ElementType, Props, TextAlign} from '../../types'
import {SpanWithTextOverflow} from '../../utils/spanWithTextOverflow'
import {labelBaseStyle} from './styles'

/**
 * @public
 */
export interface LabelOwnProps {
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
export type LabelProps<E extends ElementType = 'div'> = Props<LabelOwnProps, E>

const StyledLabel = styled.div<{
  $accent?: boolean
  $align: TextAlign[]
  $muted: boolean
  $size: number[]
}>(responsiveLabelFont, responsiveTextAlignStyle, labelBaseStyle)

const LabelComponent = forwardRef(function Label(
  props: LabelOwnProps & {as?: ElementType} & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'size'>,
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
      $align={_getArrayProp(align)}
      $muted={muted}
      $size={_getArrayProp(size)}
      $weight={weight}
      ref={ref}
    >
      {children}
    </StyledLabel>
  )
})
LabelComponent.displayName = 'ForwardRef(Label)'

/**
 * Typographic labels.
 *
 * @public
 */
// oxlint-disable-next-line no-unsafe-type-assertion
export const Label = LabelComponent as unknown as <E extends ElementType = 'div'>(
  props: LabelProps<E>,
) => React.JSX.Element
