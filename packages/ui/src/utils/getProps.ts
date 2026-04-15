import classNames from 'classnames'

import {type StyleProp} from '../types/StyleProp'

const PREFIX = 'sui'
const BREAKPOINTS_LENGTH = 7

interface AllProps {
  className?: string
  style?: React.CSSProperties
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [key: string]: any
}

export function getProps<P extends AllProps, T extends Record<string, StyleProp>>(
  allProps?: P,
  styleProps?: T,
): AllProps {
  let className = allProps?.className || ''
  let style = allProps?.style || {}

  // Iterate through the keys of all props on the component
  for (const key in allProps) {
    // Bypass props that aren't style props
    if (!styleProps?.[key] || !styleProps?.[key].className) {
      continue
    }

    // Process style props
    if (Array.isArray(allProps[key])) {
      // Responsive array: generate a class name and style per breakpoint
      for (let i = 0, len = Math.min(allProps[key].length, BREAKPOINTS_LENGTH); i < len; i++) {
        className = classNames(className, getClassName(allProps[key][i], styleProps[key], i))
        style = {...style, ...getStyle(allProps[key][i], styleProps[key], i)}
      }
    } else {
      // Single value: generate one class name and style
      className = classNames(className, getClassName(allProps[key], styleProps[key]))
      style = {...style, ...getStyle(allProps[key], styleProps[key])}
    }
  }

  // Return only the props not consumed by style props
  const propsWithoutStyleProps: AllProps = {}
  for (const key in allProps) {
    if (!styleProps?.[key] || !styleProps[key].className) {
      propsWithoutStyleProps[key] = allProps[key]
    }
  }

  return {...propsWithoutStyleProps, className, style}
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function getClassName(prop: any, styleProp: StyleProp, bp?: number) {
  if (styleProp.type === 'union' && styleProp.values?.includes(prop)) {
    /* Note: This may need updating depending on the final CSS classname formatting */
    return `${PREFIX}-${styleProp.className}${typeof prop === 'string' ? `-${prop}` : prop}${bp ? `-bp-${bp}` : ''}`
  }

  if (styleProp.type === 'string' || styleProp.type === 'number') {
    return `${PREFIX}-${styleProp.className}${bp ? `-bp-${bp}` : ''}`
  }

  if (styleProp.type === 'boolean') {
    return `${PREFIX}-${prop ? styleProp.className : styleProp.inverse}${bp ? `-bp-${bp}` : ''}`
  }

  return ''
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function getStyle(prop: any, styleProp: StyleProp, bp?: number) {
  if (styleProp.type === 'string' || styleProp.type === 'number') {
    return {
      [`${styleProp.variable}${bp ? `-bp-${bp}` : ''}`]: prop,
    }
  }

  return {}
}
