/**
 * Type-safety probes. `tsc -p type-tests/tsconfig.json` passes only if
 *   - every line marked `@ts-expect-error` IS a type error (an unused directive is itself an error), and
 *   - everything else type-checks.
 * So a passing run proves exactly which mistakes next-yak + this token design catch, and the
 * `NotCaught` block documents what slips through.
 */
import {Button, lightTheme, type Theme, vars} from '@yak-eval/ui-v1'
import {css, styled} from 'next-yak'

// ---- accepted ---------------------------------------------------------------------------------

export const ok = (
  <>
    <Button tone="primary" mode="ghost" radius={3} padding={2} text="ok" />
    <Button tone="critical" mode="bleed" selected loading width="fill" />
  </>
)
export const okToken: string = vars.color.tone.primary.hoverBg
export const okTheme: Theme = lightTheme

// ---- rejected: component variants --------------------------------------------------------------

// @ts-expect-error 'primry' is not assignable to Tone
export const badTone = <Button tone="primry" />
// @ts-expect-error 'outline' is not assignable to Mode
export const badMode = <Button mode="outline" />
// @ts-expect-error radius scale is 0 | 1 | 2 | 3
export const badRadius = <Button radius={7} />
// @ts-expect-error width only accepts 'fill'
export const badWidth = <Button width="100%" />

// ---- rejected: theme tokens --------------------------------------------------------------------

// @ts-expect-error typo in a token path
export const badTokenTypo = vars.color.tone.primry.bg
// @ts-expect-error there is no 'brand' tone
export const badTokenTone = vars.color.tone.brand.bg
// @ts-expect-error space scale has no step 9
export const badSpace = vars.space[9]
// @ts-expect-error font weight 'bold' is not a token
export const badWeight = vars.font.weight.bold

// ---- rejected: a theme must provide a value for every token ------------------------------------

export const badTheme: Theme = {
  ...lightTheme,
  // @ts-expect-error color.focusRing is missing
  color: {bg: '#fff', fg: '#000', border: '#ccc', tone: lightTheme.color.tone},
}

// ---- rejected: variant conditions inside a styled template -------------------------------------

type Tone = 'default' | 'primary'
export const BadCondition = styled.button<{$tone: Tone}>`
  ${({$tone}) =>
    // @ts-expect-error TS2367: 'primry' has no overlap with Tone
    $tone === 'primry'
      ? css`
          color: red;
        `
      : css`
          color: blue;
        `}
`

// ---- NOT caught: CSS itself is an untyped string ------------------------------------------------

export const NotCaught = styled.div`
  colr: red; /* property typo: not checked */
  display: flexx; /* invalid value: not checked */
  margin: ${vars.color.bg}; /* a color token used as a length: not checked */
  padding: ${vars.space[1]}px; /* unit appended to a var(): not checked */
`
