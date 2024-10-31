import {
  composeClassNames,
  FontStyleProps,
  label,
  LabelSize,
  ResponsiveProp,
  textOverflow,
  TextOverflowStyleProps,
} from '@sanity/ui/css'
import {ForwardedRef, forwardRef} from 'react'

import {Props} from '../../types'

/**
 * @public
 */
export interface LabelProps extends FontStyleProps, TextOverflowStyleProps {
  accent?: boolean
  htmlFor?: string
  muted?: boolean
  size?: ResponsiveProp<LabelSize>
}

/**
 * Typographic labels.
 *
 * @public
 */
export const Label = forwardRef(function Label(
  props: Props<LabelProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    accent,
    align,
    as: As = 'div',
    children,
    className,
    muted = false,
    size = 1,
    textOverflow: textOverflowProp,
    weight = 'medium',
    ...restProps
  } = props

  return (
    <As
      data-ui="Label"
      {...restProps}
      className={composeClassNames(
        className,
        label({
          accent,
          align,
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

Label.displayName = 'ForwardRef(Label)'
