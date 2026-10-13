import {assignInlineVars} from '@vanilla-extract/dynamic'
import type {ComponentProps, CSSProperties} from 'react'

import {accent, button, type ButtonVariants, iconBox, loadingBox, spinner} from './button.css'
import {VERSION} from './version'

export type ButtonTone = NonNullable<ButtonVariants['tone']>
export type ButtonMode = NonNullable<ButtonVariants['mode']>

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'children'> {
  tone?: ButtonTone
  mode?: ButtonMode
  /** Dynamic style: an arbitrary color for the focus/outline ring, applied through a CSS variable. */
  accent?: string
  /** New in 2.0.0. */
  icon?: React.ReactNode
  loading?: boolean
  children?: React.ReactNode
}

export function Button(props: ButtonProps): React.JSX.Element {
  const {tone, mode, accent: accentColor, icon, loading, className, style, children, ...rest} = props
  const dynamicStyle: CSSProperties | undefined = accentColor
    ? assignInlineVars({[accent]: accentColor})
    : undefined

  return (
    <button
      type="button"
      data-ui="Button"
      data-version={VERSION}
      data-tone={tone ?? 'default'}
      data-mode={mode ?? 'default'}
      className={[button({tone, mode}), className].filter(Boolean).join(' ')}
      style={dynamicStyle || style ? {...dynamicStyle, ...style} : undefined}
      {...rest}
    >
      {icon && <span className={iconBox}>{icon}</span>}
      <span>{children}</span>
      {loading && (
        <span data-ui="Button-loading" className={loadingBox}>
          <span className={spinner} />
        </span>
      )}
    </button>
  )
}
