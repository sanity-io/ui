import * as stylex from '@stylexjs/stylex'
import type {StyleXStylesWithout} from '@stylexjs/stylex'
import type {ComponentProps, ReactNode} from 'react'

import {tones} from './theme'
import {button, tokens} from './tokens.stylex'

export type ButtonTone = 'default' | 'primary' | 'positive' | 'caution' | 'critical'
export type ButtonMode = 'default' | 'ghost' | 'bleed'
export type ButtonPadding = 0 | 1 | 2 | 3 | 4
export type ButtonRadius = 0 | 1 | 2 | 3

export interface ButtonProps extends ComponentProps<'button'> {
  mode?: ButtonMode
  tone?: ButtonTone
  padding?: ButtonPadding
  radius?: ButtonRadius
  selected?: boolean
  text?: ReactNode
  /** `'fill'` stretches to the container (static); a number is a dynamic width in px. */
  width?: 'fill' | number
  /**
   * StyleX styles merged last (the StyleX convention for a style prop). The type
   * forbids overriding `display` and `position`.
   */
  xstyle?: StyleXStylesWithout<{display: string; position: string}>
}

const focusRing = (border: string) =>
  `${border}, 0 0 0 1px ${tokens.bg}, 0 0 0 3px ${tokens.focusRing}`

const styles = stylex.create({
  root: {
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    borderStyle: 'none',
    outlineStyle: 'none',
    userSelect: 'none',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    textAlign: 'left',
    cursor: {
      default: 'pointer',
      ':disabled': 'default',
    },
    fontFamily: tokens.fontFamily,
    fontSize: tokens.fontSize1,
    lineHeight: tokens.lineHeight1,
    fontWeight: tokens.fontWeight,
  },
  content: {
    display: 'block',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    minWidth: 0,
    borderRadius: 'inherit',
  },
  text: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  fill: {
    width: stylex.firstThatWorks('stretch', '-webkit-fill-available', '-moz-available'),
  },
  // dynamic style: compiled to `width: var(--x-width)` + an inline custom property
  width: (width: number) => ({width}),
})

const paddingStyles = stylex.create({
  0: {padding: 0},
  1: {padding: tokens.space1},
  2: {padding: tokens.space2},
  3: {padding: tokens.space3},
  4: {padding: tokens.space4},
})

const radiusStyles = stylex.create({
  0: {borderRadius: 0},
  1: {borderRadius: tokens.radius1},
  2: {borderRadius: tokens.radius2},
  3: {borderRadius: tokens.radius3},
})

const modeStyles = stylex.create({
  default: {
    backgroundColor: {
      default: button.fill,
      ':hover': {default: null, '@media (hover: hover)': button.fillHover},
      ':active': button.fillActive,
    },
    color: button.onFill,
    boxShadow: {
      default: `inset 0 0 0 1px ${button.border}`,
      ':focus-visible': focusRing(`inset 0 0 0 1px ${button.border}`),
    },
  },
  ghost: {
    backgroundColor: {
      default: 'transparent',
      ':hover': {default: null, '@media (hover: hover)': button.tint},
      ':active': button.tintActive,
    },
    color: button.text,
    boxShadow: {
      default: `inset 0 0 0 1px ${button.border}`,
      ':focus-visible': focusRing(`inset 0 0 0 1px ${button.border}`),
    },
  },
  bleed: {
    backgroundColor: {
      default: 'transparent',
      ':hover': {default: null, '@media (hover: hover)': button.tint},
      ':active': button.tintActive,
    },
    color: button.text,
    boxShadow: {
      default: 'none',
      ':focus-visible': focusRing('0 0 0 0 transparent'),
    },
  },
})

const selectedStyles = stylex.create({
  default: {backgroundColor: button.fillActive},
  ghost: {backgroundColor: button.tintActive},
  bleed: {backgroundColor: button.tintActive},
})

const disabledStyles = stylex.create({
  default: {
    backgroundColor: tokens.disabledFill,
    color: tokens.disabledText,
    boxShadow: `inset 0 0 0 1px ${tokens.disabledBorder}`,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: tokens.disabledText,
    boxShadow: `inset 0 0 0 1px ${tokens.disabledBorder}`,
  },
  bleed: {
    backgroundColor: 'transparent',
    color: tokens.disabledText,
    boxShadow: 'none',
  },
})

export function Button(props: ButtonProps): React.JSX.Element {
  const {
    children,
    className,
    disabled = false,
    mode = 'default',
    padding = 3,
    radius = 2,
    selected = false,
    style,
    text,
    tone = 'default',
    type = 'button',
    width,
    xstyle,
    ...rest
  } = props

  // Variants are plain JS: the tone is a theme class (CSS variables), the mode a
  // style object; `disabled` swaps the mode's interactive colors out entirely
  // instead of fighting them with selector specificity.
  const sx = stylex.props(
    styles.root,
    paddingStyles[padding],
    radiusStyles[radius],
    tones[tone],
    disabled ? disabledStyles[mode] : modeStyles[mode],
    !disabled && selected && selectedStyles[mode],
    width === 'fill' && styles.fill,
    typeof width === 'number' && styles.width(width),
    xstyle,
  )

  return (
    <button
      {...rest}
      className={className ? `${sx.className} ${className}` : sx.className}
      data-ui="Button"
      disabled={disabled}
      style={style ? {...sx.style, ...style} : sx.style}
      type={type}
    >
      {(text !== undefined || children !== undefined) && (
        <span {...stylex.props(styles.content)}>
          {text !== undefined && <span {...stylex.props(styles.text)}>{text}</span>}
          {children}
        </span>
      )}
    </button>
  )
}
