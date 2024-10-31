import {
  composeClassNames,
  heading,
  type HeadingStyleProps,
  textOverflow,
  type TextOverflowStyleProps,
} from '@sanity/ui/css'
import {ForwardedRef, forwardRef} from 'react'

import {Props} from '../../types'

/**
 * @public
 */
export interface HeadingProps extends HeadingStyleProps, TextOverflowStyleProps {}

/**
 * Typographic headings.
 *
 * @public
 */
export const Heading = forwardRef(function Heading(
  props: Props<HeadingProps, 'div'>,
  ref: ForwardedRef<HTMLElement>,
) {
  const {
    accent = false,
    align,
    as: As = 'div',
    children,
    className,
    flex,
    muted = false,
    size = 1,
    textOverflow: textOverflowProp,
    weight,
    ...restProps
  } = props

  return (
    <As
      data-ui="Heading"
      {...restProps}
      className={composeClassNames(
        className,
        heading({
          accent,
          align,
          flex,
          muted,
          size,
          weight,
        }),
      )}
      ref={ref}
    >
      <span className={textOverflow({textOverflow: textOverflowProp})}>{children}</span>
    </As>
  )
})

Heading.displayName = 'ForwardRef(Heading)'
