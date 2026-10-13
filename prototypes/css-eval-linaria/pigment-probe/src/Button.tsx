import {type CSSObject, styled} from '@pigment-css/react'
import type {ButtonHTMLAttributes, ReactNode} from 'react'

import {tokens, v} from './theme'

export type ButtonTone = 'default' | 'primary' | 'positive' | 'caution' | 'critical'
export type ButtonMode = 'default' | 'ghost' | 'bleed'

type RootProps = {minWidth: number; mode: ButtonMode; tone: ButtonTone}

// Pigment's `CSSObject` (csstype-based) has no slot for custom properties, so
// an object that consists only of `--sui-*` declarations needs a cast.
const vars = (declarations: Record<`--sui-${string}`, string>) =>
  declarations as unknown as CSSObject<RootProps>

const toneVars = (tone: ButtonTone) =>
  vars({
    '--sui-button-bg': v(tokens.tone[tone].bg),
    '--sui-button-bg-hover': v(tokens.tone[tone].bgHover),
    '--sui-button-fg': v(tokens.tone[tone].fg),
    '--sui-button-border': v(tokens.tone[tone].border),
    '--sui-button-text': v(tokens.tone[tone].text),
  })

/**
 * Pigment CSS: variants are part of the style object and matched at runtime
 * against props; function values become CSS variables set via inline style.
 */
const Root = styled('button')<RootProps>({
  appearance: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: v(tokens.space[2]),
  boxSizing: 'border-box',
  margin: 0,
  padding: `${v(tokens.space[2])} ${v(tokens.space[3])}`,
  border: 0,
  borderRadius: v(tokens.radius[2]),
  font: 'inherit',
  fontSize: v(tokens.font.size1),
  fontWeight: 600,
  lineHeight: 1.2,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  cursor: 'pointer',
  minWidth: (props) => props.minWidth,
  backgroundColor: 'var(--sui-button-bg)',
  color: 'var(--sui-button-fg)',
  boxShadow: 'inset 0 0 0 1px var(--sui-button-border)',
  '&:hover:not([data-disabled])': {backgroundColor: 'var(--sui-button-bg-hover)'},
  '&:focus-visible': {outline: `2px solid ${v(tokens.color.focusRing)}`, outlineOffset: 2},
  '&[data-disabled]': {opacity: 0.4, cursor: 'default'},
  variants: [
    {props: {tone: 'default'}, style: toneVars('default')},
    {props: {tone: 'primary'}, style: toneVars('primary')},
    {props: {tone: 'positive'}, style: toneVars('positive')},
    {props: {tone: 'caution'}, style: toneVars('caution')},
    {props: {tone: 'critical'}, style: toneVars('critical')},
    {
      props: {mode: 'ghost'},
      style: vars({
        '--sui-button-bg': 'transparent',
        '--sui-button-bg-hover': v(tokens.tone.default.bg),
        '--sui-button-fg': 'var(--sui-button-text)',
        '--sui-button-border': v(tokens.color.border),
      }),
    },
    {
      props: {mode: 'bleed'},
      style: vars({
        '--sui-button-bg': 'transparent',
        '--sui-button-bg-hover': v(tokens.tone.default.bg),
        '--sui-button-fg': 'var(--sui-button-text)',
        '--sui-button-border': 'transparent',
      }),
    },
  ],
})

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children?: ReactNode
  disabled?: boolean
  minWidth?: number
  mode?: ButtonMode
  tone?: ButtonTone
}

export function Button(props: ButtonProps) {
  const {children, disabled, minWidth = 0, mode = 'default', tone = 'default', ...rest} = props
  return (
    <Root
      {...rest}
      data-disabled={disabled ? '' : undefined}
      disabled={disabled}
      minWidth={minWidth}
      mode={mode}
      tone={tone}
      type="button"
    >
      <span>{children}</span>
    </Root>
  )
}
