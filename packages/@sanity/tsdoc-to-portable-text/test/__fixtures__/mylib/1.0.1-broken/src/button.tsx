import React from 'react'

/**
 * @public
 */
export interface ResponsiveMarginProps {
  margin?: number | number[]
}

/**
 * @public
 */
export type ButtonTone = 'positive' | 'caution' | 'critical'

/**
 * @public
 */
export type ButtonType = 'button' | 'submit' | 'reset'

/**
 * @public
 */
export interface ButtonProps extends ResponsiveMarginProps {
  tone?: ButtonTone
  type?: ButtonType
}

/**
 * @public
 */
export function Button(
  props: ButtonProps & Omit<React.HTMLProps<HTMLButtonElement>, 'type'>
): React.ReactElement {
  const {children, margin = 0, tone, type = 'button', ...restProps} = props

  return (
    <button {...restProps} data-margin={JSON.stringify(margin)} data-tone={tone} type={type}>
      {children}
    </button>
  )
}
