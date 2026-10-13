import {makeResetStyles, makeStyles, mergeClasses} from '@griffel/react'
import type {ComponentProps, CSSProperties, ReactNode} from 'react'

import {type ButtonMode, type ButtonTone, tokens} from './theme'

/** Stamped on the DOM so a page with several versions can tell them apart. */
export const BUTTON_VERSION = '2.0.0'

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'width'> {
  tone?: ButtonTone
  mode?: ButtonMode
  text?: ReactNode
  icon?: ReactNode
  selected?: boolean
  /** `'fill'` is a static variant; a number is a dynamic style (inline CSS variable). */
  width?: 'fill' | number
}

// v2 ─────────────────────────────────────────────────────────────────────────
// Compared to 1.0.0 this file:
//   • reorders every definition (`useToneStyles` first, slots in a different
//     order, tones in reverse) — the "renumbering" that changed what
//     `_2mi48t0` meant between @sanity/ui 4.4.3 and 4.4.4;
//   • changes values: radius 3 → 6px, padding 8/12 → 12/20px, weight 500 → 600,
//     transition 80 → 120ms, and adds uppercase + letter-spacing;
//   • keeps the rest identical, so many atomic classes are shared with v1.
// Shared declarations hash to the same class name *and* the same rule; changed
// declarations hash to new class names. Neither can collide with v1.
// ───────────────────────────────────────────────────────────────────────────

function toneVars(tone: ButtonTone) {
  return {
    '--tone-tint-active': tokens[`tone-${tone}-tintActive`],
    '--tone-tint-hover': tokens[`tone-${tone}-tintHover`],
    '--tone-text': tokens[`tone-${tone}-text`],
    '--tone-border': tokens[`tone-${tone}-border`],
    '--tone-fg': tokens[`tone-${tone}-fg`],
    '--tone-bg-active': tokens[`tone-${tone}-bgActive`],
    '--tone-bg-hover': tokens[`tone-${tone}-bgHover`],
    '--tone-bg': tokens[`tone-${tone}-bg`],
  }
}

const useToneStyles = makeStyles<ButtonTone>({
  critical: toneVars('critical'),
  caution: toneVars('caution'),
  positive: toneVars('positive'),
  primary: toneVars('primary'),
  default: toneVars('default'),
})

const useModeStyles = makeStyles<ButtonMode>({
  bleed: {
    '--btn-bg': 'transparent',
    '--btn-fg': 'var(--tone-text)',
    '--btn-border': 'transparent',
    '--btn-bg-hover': 'var(--tone-tint-hover)',
    '--btn-bg-active': 'var(--tone-tint-active)',
  },
  ghost: {
    '--btn-bg': tokens['surface-bg'],
    '--btn-fg': 'var(--tone-text)',
    '--btn-border': 'var(--tone-border)',
    '--btn-bg-hover': 'var(--tone-tint-hover)',
    '--btn-bg-active': 'var(--tone-tint-active)',
  },
  default: {
    '--btn-bg': 'var(--tone-bg)',
    '--btn-fg': 'var(--tone-fg)',
    '--btn-border': 'var(--tone-border)',
    '--btn-bg-hover': 'var(--tone-bg-hover)',
    '--btn-bg-active': 'var(--tone-bg-active)',
  },
})

const useStyles = makeStyles({
  dynamicWidth: {width: 'var(--btn-width)'},
  fill: {width: '100%'},
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: tokens['space-2'],
  },
  root: {
    backgroundColor: 'var(--btn-bg)',
    color: 'var(--btn-fg)',
    boxShadow: 'inset 0 0 0 1px var(--btn-border)',
    borderRadius: tokens['radius-3'],
    fontFamily: tokens['font-family'],
    fontSize: tokens['font-size'],
    lineHeight: tokens['font-lineHeight'],
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    paddingTop: tokens['space-3'],
    paddingBottom: tokens['space-3'],
    paddingLeft: tokens['space-4'],
    paddingRight: tokens['space-4'],
    transitionProperty: 'background-color, color, box-shadow',
    transitionDuration: '120ms',
    '@media (hover: hover)': {
      ':hover': {backgroundColor: 'var(--btn-bg-hover)'},
      ':active': {backgroundColor: 'var(--btn-bg-active)'},
    },
    ':focus-visible': {
      boxShadow: `inset 0 0 0 1px var(--btn-border), 0 0 0 2px ${tokens.focusRing}`,
    },
    '&[data-selected]': {backgroundColor: 'var(--btn-bg-active)'},
    '&[data-disabled="true"]': {opacity: '0.5', pointerEvents: 'none'},
  },
})

const useRootClassName = makeResetStyles({
  WebkitFontSmoothing: 'inherit',
  appearance: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  font: 'inherit',
  border: 0,
  outline: 'none',
  userSelect: 'none',
  textDecoration: 'none',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  whiteSpace: 'nowrap',
  textAlign: 'left',
  position: 'relative',
  verticalAlign: 'top',
  cursor: 'default',
  '::-moz-focus-inner': {border: 0, padding: 0},
  '& > span': {display: 'block', flex: 1, minWidth: 0, borderRadius: 'inherit'},
})

export function Button(props: ButtonProps) {
  const {
    tone = 'default',
    mode = 'default',
    text,
    icon,
    selected,
    width,
    disabled,
    className,
    style,
    children,
    ...rest
  } = props

  const rootClassName = useRootClassName()
  const classes = useStyles()
  const modeClasses = useModeStyles()
  const toneClasses = useToneStyles()

  const dynamicStyle: CSSProperties | undefined =
    typeof width === 'number' ? {...style, ['--btn-width' as string]: `${width}px`} : style

  return (
    <button
      data-ui="Button"
      data-version={BUTTON_VERSION}
      data-tone={tone}
      data-mode={mode}
      data-selected={selected ? '' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      disabled={disabled}
      type="button"
      {...rest}
      className={mergeClasses(
        rootClassName,
        classes.root,
        toneClasses[tone],
        modeClasses[mode],
        width === 'fill' && classes.fill,
        typeof width === 'number' && classes.dynamicWidth,
        className,
      )}
      style={dynamicStyle}
    >
      <span className={classes.content}>
        {icon}
        {text}
        {children}
      </span>
    </button>
  )
}
