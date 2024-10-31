import {
  composeClassNames,
  text,
  textOverflow,
  TextOverflowStyleProps,
  TextStyleProps,
} from '@sanity/ui/css'
import {ForwardedRef, forwardRef} from 'react'

import {Props} from '../../types'

/**
 * @public
 */
export interface TextProps extends TextStyleProps, TextOverflowStyleProps {
  htmlFor?: string
}

/**
 * The `Text` component is an agile, themed typographic element.
 *
 * @public
 */
export const Text = forwardRef(function Text(
  props: Props<TextProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
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
      data-ui="Text"
      {...restProps}
      ref={ref}
      className={composeClassNames(
        className,
        text({
          accent,
          align,
          flex,
          muted,
          size,
          weight,
        }),
      )}
    >
      <span className={textOverflow({textOverflow: textOverflowProp})}>{children}</span>
    </As>
  )
})

Text.displayName = 'ForwardRef(Text)'
