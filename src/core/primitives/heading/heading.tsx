import {composeClassNames, FontStyleProps, heading, ResponsiveProp} from '@sanity/ui/css'
import {FontHeadingSize} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {styled} from '../../lib/styled'

/**
 * @public
 */
export interface HeadingProps extends FontStyleProps {
  accent?: boolean
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: ResponsiveProp<FontHeadingSize>
  /**
   * Controls how overflowing text is treated.
   * Use `textOverflow="ellipsis"` to render text as a single line which is concatenated with a `…` symbol.
   * @beta
   */
  textOverflow?: 'ellipsis'
}

// todo
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
    as: As = 'div',
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
  }

  return (
    <As
      data-ui="Heading"
      {...restProps}
      // todo
      // $align={useArrayProp(align)}
      className={composeClassNames(
        className,
        heading({
          accent,
          align,
          muted,
          size,
          weight,
        }),
      )}
      ref={ref}
    >
      <span>{children}</span>
    </As>
  )
})

Heading.displayName = 'ForwardRef(Heading)'
