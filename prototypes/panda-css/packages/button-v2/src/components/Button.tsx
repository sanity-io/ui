import {clsx} from 'clsx'
import type {ButtonHTMLAttributes, CSSProperties, ReactNode} from 'react'

import {css, cva} from '../../styled-system/css'
import {token} from '../../styled-system/tokens'
import type {RecipeRuntimeFn} from '../../styled-system/types'
import type {Tone} from '../theme/palette'

export const buttonModes = ['default', 'ghost', 'bleed'] as const
export type ButtonMode = (typeof buttonModes)[number]
export type ButtonTone = Tone

export interface ButtonVariantProps {
  tone?: ButtonTone | undefined
  mode?: ButtonMode | undefined
}

// v4.4.4 CHANGE 1 ("renumbering"): a new style declared BEFORE the button
// recipe. In vanilla-extract this shifts the per-file counter of every class
// declared after it (`_2mi48t0` would now mean something else); in Panda the
// class names below are derived from their own content, so this is a no-op
// for every unchanged style.
export const buttonIcon: string = css({
  display: 'inline-block',
  flexShrink: 0,
  width: '4',
  height: '4',
})

/**
 * Atomic recipe (`cva`), see v1 for the rationale. v4.4.4 CHANGE 2: the
 * variant groups are declared in the opposite order (`mode` before `tone`)
 * and base declarations are shuffled; CHANGE 3: padding, radius, gap,
 * font-weight and the ghost/bleed hover styles changed, and an `_active`
 * state was added.
 */
export const button: RecipeRuntimeFn<ButtonVariantProps> = cva({
  base: {
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Dynamic style: the width comes from an inline CSS variable set at runtime.
    width: 'var(--sui-btn-width, auto)',
    gap: '3',
    paddingBlock: '3',
    paddingInline: '4',
    borderRadius: 'var(--sui-btn-radius, {radii.3})',
    borderWidth: '1px',
    borderStyle: 'solid',
    fontFamily: 'sans',
    fontSize: '1',
    fontWeight: 'semibold',
    lineHeight: 'tight',
    transitionProperty: 'background-color, border-color, color',
    transitionDuration: 'fast',
    _focusVisible: {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: 'focusRing',
      outlineOffset: '[1px]',
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'default',
    },
  },
  variants: {
    mode: {
      default: {
        bg: 'var(--sui-btn-bg)',
        color: 'var(--sui-btn-fg)',
        borderColor: 'var(--sui-btn-bg)',
        _hover: {
          bg: 'var(--sui-btn-bg-hover)',
          borderColor: 'var(--sui-btn-bg-hover)',
        },
        _active: {
          bg: 'var(--sui-btn-bg-hover)',
          borderColor: 'var(--sui-btn-bg-hover)',
        },
      },
      ghost: {
        bg: 'transparent',
        color: 'var(--sui-btn-tint-fg)',
        borderColor: 'var(--sui-btn-border)',
        _hover: {
          bg: 'var(--sui-btn-tint-bg)',
          borderColor: 'var(--sui-btn-tint-fg)',
        },
      },
      bleed: {
        bg: 'transparent',
        color: 'var(--sui-btn-tint-fg)',
        borderColor: 'transparent',
        _hover: {
          bg: 'var(--sui-btn-tint-bg)',
          color: 'var(--sui-btn-tint-fg)',
        },
      },
    },
    tone: {
      default: {
        '--sui-btn-bg': '{colors.tone.default.bg}',
        '--sui-btn-bg-hover': '{colors.tone.default.bgHover}',
        '--sui-btn-fg': '{colors.tone.default.fg}',
        '--sui-btn-border': '{colors.tone.default.border}',
        '--sui-btn-tint-fg': '{colors.tone.default.tintFg}',
        '--sui-btn-tint-bg': '{colors.tone.default.tintBg}',
      },
      primary: {
        '--sui-btn-bg': '{colors.tone.primary.bg}',
        '--sui-btn-bg-hover': '{colors.tone.primary.bgHover}',
        '--sui-btn-fg': '{colors.tone.primary.fg}',
        '--sui-btn-border': '{colors.tone.primary.border}',
        '--sui-btn-tint-fg': '{colors.tone.primary.tintFg}',
        '--sui-btn-tint-bg': '{colors.tone.primary.tintBg}',
      },
      positive: {
        '--sui-btn-bg': '{colors.tone.positive.bg}',
        '--sui-btn-bg-hover': '{colors.tone.positive.bgHover}',
        '--sui-btn-fg': '{colors.tone.positive.fg}',
        '--sui-btn-border': '{colors.tone.positive.border}',
        '--sui-btn-tint-fg': '{colors.tone.positive.tintFg}',
        '--sui-btn-tint-bg': '{colors.tone.positive.tintBg}',
      },
      caution: {
        '--sui-btn-bg': '{colors.tone.caution.bg}',
        '--sui-btn-bg-hover': '{colors.tone.caution.bgHover}',
        '--sui-btn-fg': '{colors.tone.caution.fg}',
        '--sui-btn-border': '{colors.tone.caution.border}',
        '--sui-btn-tint-fg': '{colors.tone.caution.tintFg}',
        '--sui-btn-tint-bg': '{colors.tone.caution.tintBg}',
      },
      critical: {
        '--sui-btn-bg': '{colors.tone.critical.bg}',
        '--sui-btn-bg-hover': '{colors.tone.critical.bgHover}',
        '--sui-btn-fg': '{colors.tone.critical.fg}',
        '--sui-btn-border': '{colors.tone.critical.border}',
        '--sui-btn-tint-fg': '{colors.tone.critical.tintFg}',
        '--sui-btn-tint-bg': '{colors.tone.critical.tintBg}',
      },
    },
  },
  defaultVariants: {
    tone: 'default',
    mode: 'default',
  },
})

export type ButtonRadius = 0 | 1 | 2 | 3 | 'full'

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'style'>,
    ButtonVariantProps {
  children?: ReactNode
  /** Dynamic style: any CSS width; numbers are pixels. Applied through a CSS variable. */
  width?: number | string
  /** Dynamic style: a radius token picked at runtime through `token.var()`. */
  radius?: ButtonRadius
  style?: CSSProperties
}

export function Button(props: ButtonProps): ReactNode {
  const {children, className, mode, radius, style, tone, width, ...rest} = props
  const vars: Record<string, string> = {}
  if (width !== undefined) vars['--sui-btn-width'] = typeof width === 'number' ? `${width}px` : width
  if (radius !== undefined) vars['--sui-btn-radius'] = token.var(`radii.${radius}`)
  return (
    <button
      type="button"
      {...rest}
      className={clsx(button({mode, tone}), className)}
      style={{...vars, ...style} as CSSProperties}
    >
      {children}
    </button>
  )
}
