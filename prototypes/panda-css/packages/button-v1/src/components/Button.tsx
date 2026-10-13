import {clsx} from 'clsx'
import type {ButtonHTMLAttributes, CSSProperties, ReactNode} from 'react'

import {cva} from '../../styled-system/css'
import {token} from '../../styled-system/tokens'
import type {RecipeRuntimeFn} from '../../styled-system/types'
import type {Tone} from '../theme/palette'

export const buttonModes = ['default', 'ghost', 'bleed'] as const
export type ButtonMode = (typeof buttonModes)[number]
export type ButtonTone = Tone

export interface ButtonVariantProps {
  tone?: ButtonTone
  mode?: ButtonMode
}

/**
 * Atomic recipe (`cva`): every variant is emitted as content-addressed atomic
 * classes when the recipe is *defined*, so a consumer that never runs Panda
 * still gets CSS for every `tone` × `mode` combination.
 *
 * The tone variants only assign CSS variables; the mode variants decide how
 * those variables are used. This mirrors how @sanity/ui's Card/Button theme
 * variables (`--card-bg-color`, `--card-fg-color`, …) work today.
 *
 * The explicit `RecipeRuntimeFn` annotation is what `isolatedDeclarations`
 * requires for an exported `cva()` result (Panda docs: "Isolated declarations").
 */
export const button: RecipeRuntimeFn<ButtonVariantProps> = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    fontFamily: 'sans',
    fontSize: '1',
    fontWeight: 'medium',
    lineHeight: 'tight',
    paddingBlock: '3',
    paddingInline: '3',
    borderRadius: 'var(--sui-btn-radius, {radii.2})',
    borderWidth: '1px',
    borderStyle: 'solid',
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    // Dynamic style: the width comes from an inline CSS variable set at runtime.
    width: 'var(--sui-btn-width, auto)',
    transitionProperty: 'background-color, border-color, color',
    transitionDuration: 'fast',
    _focusVisible: {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: 'focusRing',
      outlineOffset: '1px',
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'default',
    },
  },
  variants: {
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
    mode: {
      default: {
        bg: 'var(--sui-btn-bg)',
        color: 'var(--sui-btn-fg)',
        borderColor: 'var(--sui-btn-bg)',
        _hover: {
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
        },
      },
      bleed: {
        bg: 'transparent',
        color: 'var(--sui-btn-tint-fg)',
        borderColor: 'transparent',
        _hover: {
          bg: 'var(--sui-btn-tint-bg)',
        },
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
