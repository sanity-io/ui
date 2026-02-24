import type {CSSVarFunction, CSSVarName} from './types'

const RE_CSS_VAR = /^var\((.*)\)$/

/**
 * Extract the name of a CSS variable.
 *
 * @example
 * ```ts
 * getVarName('var(--color-primary)') // '--color-primary'
 * ```
 *
 * @public
 */
export function getVarName(variable: CSSVarFunction): CSSVarName {
  const matches = variable.match(RE_CSS_VAR)

  if (matches) {
    return matches[1] as CSSVarName
  }

  // NOTE: This code path should not occur when using TypeScript,
  // and is a potential source of bugs.

  // If the variable is not a CSS variable, return it as is.
  return variable as CSSVarName
}
