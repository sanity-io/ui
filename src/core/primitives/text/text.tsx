import {composeClassNames, text, TextStyleProps} from '@sanity/ui/css'
import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {styled} from '../../lib/styled'

/**
 * @public
 */
export interface TextProps extends TextStyleProps {
  accent?: boolean
  as?: React.ElementType | keyof JSX.IntrinsicElements
  /** When `true` the text color will be muted. */
  muted?: boolean
  /**
   * Controls how overflowing text is treated.
   * Use `textOverflow="ellipsis"` to render text as a single line which is concatenated with a `…` symbol.
   * @beta
   */
  textOverflow?: 'ellipsis' | 'none'
  weight?: ThemeFontWeightKey
}

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
    as: As = 'div',
    children: childrenProp,
    className,
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
    <As
      data-ui="Text"
      {...restProps}
      ref={ref}
      className={composeClassNames(
        className,
        text({
          accent,
          align,
          muted,
          size,
          weight,
        }),
      )}
    >
      {children}
    </As>
  )
})

Text.displayName = 'ForwardRef(Text)'
