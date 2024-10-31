/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {createElement, forwardRef} from 'react'
import {styled as _styled} from 'styled-components'
import {elements} from './elements'

const baseStyled = (tagName: string): any => {
  const m = (_strings: TemplateStringsArray, ..._interpolations: any[]) => {
    const Styled = forwardRef(function Styled(props: any, ref: any) {
      const {as, forwardedAs, ...rest} = props

      const sanitizedProps = Object.fromEntries(
        Object.entries(rest)
          .filter(([, val]) => Boolean(val) && (!isArray(val) || val.length > 0))
          .map(([key, val]) => {
            if (key.startsWith('$')) {
              return [`data-${toSnakeCase(key.slice(1))}`, val]
            }

            return [key, val]
          }),
      )

      const t = as ?? tagName

      return createElement(t, {...sanitizedProps, as: forwardedAs, ref})
    })

    Styled.displayName = `Styled(${typeof tagName === 'function' ? (tagName as any).displayName : tagName})`

    return Styled
  }

  m['attrs'] = (attrs: any) => {
    return (_strings: TemplateStringsArray, ..._interpolations: any[]) => {
      const StyledAttrs = forwardRef(function StyledAttrs(_props: any, ref: any) {
        const props = {...attrs, ..._props}
        const {as, forwardedAs, ...rest} = props

        const sanitizedProps = Object.fromEntries(
          Object.entries(rest)
            .filter(([, val]) => Boolean(val) && (!isArray(val) || val.length > 0))
            .map(([key, val]) => {
              if (key.startsWith('$')) {
                return [`data-${toSnakeCase(key.slice(1))}`, val]
              }

              return [key, val]
            }),
        )

        const t = as ?? tagName

        return createElement(t, {...sanitizedProps, as: forwardedAs, ref})
      })

      StyledAttrs.displayName = `StyledAttrs(${typeof tagName === 'function' ? (tagName as any).displayName : tagName})`

      return StyledAttrs
    }
  }

  return m
}

export const styled = baseStyled as typeof _styled

for (const tagName of elements) {
  ;(styled as any)[tagName] = baseStyled(tagName)
}

function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}
