/**
 * Documents what the type system does NOT catch. Each `@ts-expect-error`
 * below is expected to be reported as *unused* (TS2578) when this file is
 * checked with `tsconfig.not-caught.json`: the misuse compiles cleanly.
 */
import {css} from '@linaria/core'
import {styled} from '@linaria/react'

// CSS inside a template literal is plain text to TypeScript.
// @ts-expect-error (unused) "colr" is not a CSS property
export const propertyTypo = css`
  colr: red;
`

// @ts-expect-error (unused) "inline-flexx" is not a valid display value
export const valueTypo = css`
  display: inline-flexx;
`

// Interpolated style objects are typed `{[key: string]: string | number | CSSProperties}`,
// not csstype, so keys are not validated either.
// @ts-expect-error (unused) object keys are not checked against CSS properties
export const objectTypo = css`
  ${{colr: 'red'}}
`

// Dynamic interpolations may return any string: units and value grammar are not checked.
// @ts-expect-error (unused) the callback can return any string
export const Dyn = styled.div<{$w: number}>`
  width: ${(p) => `${p.$w}elephants`};
`
