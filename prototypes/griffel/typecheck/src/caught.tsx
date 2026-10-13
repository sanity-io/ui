/* oxlint-disable react-hooks/rules-of-hooks -- type probes, never executed */
/**
 * Every statement below is wrong and MUST be a compile error. `tsc` only passes
 * when each `@ts-expect-error` is actually triggered (an unused directive is an
 * error itself), so `pnpm test` is a self-verifying list of what the types catch.
 */
import {makeResetStyles, makeStyles} from '@griffel/react'
import {
  Button,
  type ButtonTone,
  createThemeVars,
  defaultTheme,
  type Theme,
  ThemeProvider,
  tokens,
} from 'griffel-button'

// ── Theme tokens ────────────────────────────────────────────────────────────

// @ts-expect-error misspelled token
void tokens['tone-primray-bg']
// @ts-expect-error token names are derived from the Theme shape; this one does not exist
void tokens['focus-ring']
// @ts-expect-error tone that the theme does not define
void tokens['tone-neutral-bg']

// ── Variants (props) ────────────────────────────────────────────────────────

// @ts-expect-error 'danger' is not a ButtonTone
void (<Button tone="danger" />)
// @ts-expect-error 'outline' is not a ButtonMode
void (<Button mode="outline" />)
// @ts-expect-error width accepts 'fill' or a number
void (<Button width="100%" />)

// ── Variant slots: every union member must have a style definition ──────────

// @ts-expect-error property 'critical' is missing
makeStyles<ButtonTone>({default: {}, primary: {}, positive: {}, caution: {}})

const useStyles = makeStyles({root: {display: 'flex'}, content: {}})
const classes = useStyles()
// @ts-expect-error no slot named 'rooot'
void classes.rooot

// ── Values ──────────────────────────────────────────────────────────────────

// @ts-expect-error numbers other than 0 are rejected (units are mandatory): GriffelStylesCSSValue = string | 0
makeStyles({root: {paddingTop: 8}})
// @ts-expect-error a known property with a non-string value
makeStyles({root: {display: true}})
// @ts-expect-error properties with a closed keyword set are strict (csstype `Position`)
makeStyles({root: {position: 'absolutely'}})
// @ts-expect-error unsupported shorthand, typed `never` (use longhands or shorthands.borderColor())
makeStyles({root: {borderColor: 'red'}})
// @ts-expect-error nested selector values must be style objects
makeStyles({root: {':hover': 'color: red'}})
// @ts-expect-error same rules apply to reset styles
makeResetStyles({paddingTop: 8})

// ── Theme objects ───────────────────────────────────────────────────────────

const incomplete = {
  ...defaultTheme,
  tone: {default: defaultTheme.tone.default},
}
// @ts-expect-error a Theme must define every tone
createThemeVars(incomplete)

const wrongLeaf: Theme = {
  ...defaultTheme,
  // @ts-expect-error radius values are strings with units
  radius: {1: 2, 2: 3, 3: 6},
}
void wrongLeaf

// @ts-expect-error theme is required
void (<ThemeProvider />)
