/* eslint-disable @typescript-eslint/ban-types */

import {ComponentType} from 'react'
import styled, {CSSObject, DefaultTheme, StyledComponent} from 'styled-components'
import {ThemeProps} from './types'

/** @internal */
export interface CSSObjectFactory<P extends {} = {}> {
  (props: P & ThemeProps): CSSObject | CSSObject[]
}

const EMPTY_CSS: CSSObject = {}

/** @internal */
export function compose<
  // style props
  P extends {} = {},
  // type
  C extends keyof JSX.IntrinsicElements | ComponentType<any> = any
>(
  type: C,
  styles: Array<CSSObjectFactory<P & ThemeProps> | CSSObject>
): StyledComponent<C, DefaultTheme, P> {
  if (styles.length === 0) {
    return styled(type)<P>(EMPTY_CSS)
  }

  let comp = type

  for (const style of styles) {
    comp = styled(comp)<P>(style) as any
  }

  return comp as any
}
