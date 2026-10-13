import {css, cx} from '@linaria/core'
import {styled} from '@linaria/react'
import type {ButtonHTMLAttributes, ReactNode} from 'react'

import {tokens, v} from './theme'

export type ButtonTone = 'default' | 'primary' | 'positive' | 'caution' | 'critical'
export type ButtonMode = 'default' | 'ghost' | 'bleed'

/**
 * Dynamic style: the `$minWidth` prop becomes a CSS custom property that the
 * `@linaria/react` runtime writes to the element's inline `style`.
 */
const Root = styled.button<{$minWidth: number}>`
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${v(tokens.space[2])};
  box-sizing: border-box;
  margin: 0;
  padding: ${v(tokens.space[2])} ${v(tokens.space[3])};
  border: 0;
  border-radius: ${v(tokens.radius[2])};
  font: inherit;
  font-size: ${v(tokens.font.size1)};
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  min-width: ${(props) => props.$minWidth}px;
  background-color: var(--sui-button-bg);
  color: var(--sui-button-fg);
  box-shadow: inset 0 0 0 1px var(--sui-button-border);

  &:hover:not([data-disabled]) {
    background-color: var(--sui-button-bg-hover);
  }

  &:focus-visible {
    outline: 2px solid ${v(tokens.color.focusRing)};
    outline-offset: 2px;
  }

  &[data-disabled] {
    opacity: 0.4;
    cursor: default;
  }
`

/**
 * Variants are plain `css` classes keyed by the variant union, so an unknown
 * tone or mode is a type error at the call site and a missing entry here is a
 * type error in the map itself.
 */
const toneClass: Record<ButtonTone, string> = {
  default: css`
    --sui-button-bg: ${v(tokens.tone.default.bg)};
    --sui-button-bg-hover: ${v(tokens.tone.default.bgHover)};
    --sui-button-fg: ${v(tokens.tone.default.fg)};
    --sui-button-border: ${v(tokens.tone.default.border)};
    --sui-button-text: ${v(tokens.tone.default.text)};
  `,
  primary: css`
    --sui-button-bg: ${v(tokens.tone.primary.bg)};
    --sui-button-bg-hover: ${v(tokens.tone.primary.bgHover)};
    --sui-button-fg: ${v(tokens.tone.primary.fg)};
    --sui-button-border: ${v(tokens.tone.primary.border)};
    --sui-button-text: ${v(tokens.tone.primary.text)};
  `,
  positive: css`
    --sui-button-bg: ${v(tokens.tone.positive.bg)};
    --sui-button-bg-hover: ${v(tokens.tone.positive.bgHover)};
    --sui-button-fg: ${v(tokens.tone.positive.fg)};
    --sui-button-border: ${v(tokens.tone.positive.border)};
    --sui-button-text: ${v(tokens.tone.positive.text)};
  `,
  caution: css`
    --sui-button-bg: ${v(tokens.tone.caution.bg)};
    --sui-button-bg-hover: ${v(tokens.tone.caution.bgHover)};
    --sui-button-fg: ${v(tokens.tone.caution.fg)};
    --sui-button-border: ${v(tokens.tone.caution.border)};
    --sui-button-text: ${v(tokens.tone.caution.text)};
  `,
  critical: css`
    --sui-button-bg: ${v(tokens.tone.critical.bg)};
    --sui-button-bg-hover: ${v(tokens.tone.critical.bgHover)};
    --sui-button-fg: ${v(tokens.tone.critical.fg)};
    --sui-button-border: ${v(tokens.tone.critical.border)};
    --sui-button-text: ${v(tokens.tone.critical.text)};
  `,
}

// Mode classes are declared after the tone classes on purpose: they override
// the same custom properties at equal specificity, so source order decides.
const modeClass: Record<ButtonMode, string> = {
  default: css`
    --sui-button-mode: default;
  `,
  ghost: css`
    --sui-button-bg: transparent;
    --sui-button-bg-hover: ${v(tokens.tone.default.bg)};
    --sui-button-fg: var(--sui-button-text);
    --sui-button-border: ${v(tokens.color.border)};
  `,
  bleed: css`
    --sui-button-bg: transparent;
    --sui-button-bg-hover: ${v(tokens.tone.default.bg)};
    --sui-button-fg: var(--sui-button-text);
    --sui-button-border: transparent;
  `,
}

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children?: ReactNode
  disabled?: boolean
  /** Minimum width in px (dynamic style, see `Root`). */
  minWidth?: number
  mode?: ButtonMode
  tone?: ButtonTone
}

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    disabled,
    minWidth = 0,
    mode = 'default',
    tone = 'default',
    ...rest
  } = props

  return (
    <Root
      {...rest}
      $minWidth={minWidth}
      className={cx(toneClass[tone], modeClass[mode], className)}
      data-disabled={disabled ? '' : undefined}
      data-mode={mode}
      data-tone={tone}
      disabled={disabled}
      type="button"
    >
      <span>{children}</span>
    </Root>
  )
}
