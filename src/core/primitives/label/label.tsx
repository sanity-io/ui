import {
  composeClassNames,
  FontStyleProps,
  label,
  textOverflow,
  TextOverflowStyleProps,
} from '@sanity/ui/css'
import {forwardRef} from 'react'

/**
 * @public
 */
export interface LabelProps extends FontStyleProps, TextOverflowStyleProps {
  accent?: boolean
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: number | number[]
}

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
