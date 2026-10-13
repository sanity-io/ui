import {makeResetStyles, makeStyles, mergeClasses} from '@griffel/react'
import type {ComponentProps, CSSProperties, ReactNode} from 'react'

import {type ButtonMode, type ButtonTone, tokens} from './theme'

/** Stamped on the DOM so a page with several versions can tell them apart. */
export const BUTTON_VERSION = '1.0.0'

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'width'> {
  tone?: ButtonTone
  mode?: ButtonMode
  text?: ReactNode
  icon?: ReactNode
  selected?: boolean
  /**
   * `'fill'` is a static variant (a precompiled class). A number is a *dynamic
   * style*: the value only exists at render time, so it travels as an inline CSS
   * variable that a precompiled rule reads — the Griffel (and vanilla-extract
   * `assignInlineVars`) idiom; Griffel has no runtime style evaluation at all.
   */
  width?: 'fill' | number
}

/**
 * The structural reset shared by every button — `@sanity/ui`'s `buttonRoot`. A
 * `makeResetStyles` class is monolithic (one class, "r" bucket, lowest priority)
 * so these ~20 declarations cost one class name instead of ~20 atomic ones.
 */
const useRootClassName = makeResetStyles({
  'WebkitFontSmoothing': 'inherit',
  'appearance': 'none',
  'display': 'inline-flex',
  'alignItems': 'center',
  'font': 'inherit',
  'border': 0,
  'outline': 'none',
  'userSelect': 'none',
  'textDecoration': 'none',
  'boxSizing': 'border-box',
  'margin': 0,
  'padding': 0,
  'whiteSpace': 'nowrap',
  'textAlign': 'left',
  'position': 'relative',
  'verticalAlign': 'top',
  'cursor': 'default',
  '::-moz-focus-inner': {border: 0, padding: 0},
  '& > span': {display: 'block', flex: 1, minWidth: 0, borderRadius: 'inherit'},
})

/** Atomic, overridable styles. Every declaration becomes one content-hashed class. */
const useStyles = makeStyles({
  root: {
    'backgroundColor': 'var(--btn-bg)',
    'color': 'var(--btn-fg)',
    'boxShadow': 'inset 0 0 0 1px var(--btn-border)',
    'borderRadius': tokens['radius-2'],
    'fontFamily': tokens['font-family'],
    'fontSize': tokens['font-size'],
    'lineHeight': tokens['font-lineHeight'],
    'fontWeight': tokens['font-weight'],
    'paddingTop': tokens['space-2'],
    'paddingBottom': tokens['space-2'],
    'paddingLeft': tokens['space-3'],
    'paddingRight': tokens['space-3'],
    'transitionProperty': 'background-color, color, box-shadow',
    'transitionDuration': '80ms',
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
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: tokens['space-2'],
  },
  fill: {width: '100%'},
  dynamicWidth: {width: 'var(--btn-width)'},
})

/**
 * Modes decide which tone colors land where. They only map CSS variables, so a
 * mode × tone matrix costs `modes + tones` classes rather than `modes × tones`.
 */
const useModeStyles = makeStyles<ButtonMode>({
  default: {
    '--btn-bg': 'var(--tone-bg)',
    '--btn-fg': 'var(--tone-fg)',
    '--btn-border': 'var(--tone-border)',
    '--btn-bg-hover': 'var(--tone-bg-hover)',
    '--btn-bg-active': 'var(--tone-bg-active)',
  },
  ghost: {
    '--btn-bg': tokens['surface-bg'],
    '--btn-fg': 'var(--tone-text)',
    '--btn-border': 'var(--tone-border)',
    '--btn-bg-hover': 'var(--tone-tint-hover)',
    '--btn-bg-active': 'var(--tone-tint-active)',
  },
  bleed: {
    '--btn-bg': 'transparent',
    '--btn-fg': 'var(--tone-text)',
    '--btn-border': 'transparent',
    '--btn-bg-hover': 'var(--tone-tint-hover)',
    '--btn-bg-active': 'var(--tone-tint-active)',
  },
})

function toneVars(tone: ButtonTone) {
  return {
    '--tone-bg': tokens[`tone-${tone}-bg`],
    '--tone-bg-hover': tokens[`tone-${tone}-bgHover`],
    '--tone-bg-active': tokens[`tone-${tone}-bgActive`],
    '--tone-fg': tokens[`tone-${tone}-fg`],
    '--tone-border': tokens[`tone-${tone}-border`],
    '--tone-text': tokens[`tone-${tone}-text`],
    '--tone-tint-hover': tokens[`tone-${tone}-tintHover`],
    '--tone-tint-active': tokens[`tone-${tone}-tintActive`],
  }
}

// `makeStyles<ButtonTone>` makes a missing tone a type error (see ../../typecheck).
const useToneStyles = makeStyles<ButtonTone>({
  default: toneVars('default'),
  primary: toneVars('primary'),
  positive: toneVars('positive'),
  caution: toneVars('caution'),
  critical: toneVars('critical'),
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
      // `mergeClasses` resolves conflicts per CSS property, last wins — a consumer
      // `className` with a Griffel class overrides without specificity games.
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
