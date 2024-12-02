import {composeClassNames, FontStyleProps, label} from '@sanity/ui/css'
import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {responsiveLabelFont, responsiveTextAlignStyle} from '../../_compat/styles/internal'
import {styled} from '../../lib/styled'
import {TextAlign} from '../../types'
import {labelBaseStyle} from './styles'

/**
 * @public
 */
export interface LabelProps extends FontStyleProps {
  accent?: boolean
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

const Root = styled.div<{
  $accent?: boolean
  $align: TextAlign[]
  $muted: boolean
  $size: number[]
}>(responsiveLabelFont, responsiveTextAlignStyle, labelBaseStyle)

const SpanWithTextOverflow = styled.span`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow: clip;
`

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
    className,
    muted = false,
    size = 1,
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
    <Root
      data-ui="Label"
      {...restProps}
      $weight={weight}
      className={composeClassNames(
        className,
        label({
          accent,
          align,
          muted,
          size,
        }),
      )}
      ref={ref}
    >
      {children}
    </Root>
  )
})

Label.displayName = 'ForwardRef(Label)'
