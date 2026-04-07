import classNames from 'classnames'

import {type PropDef} from '../types/PropDef'

const PREFIX = 'sui'
const BREAKPOINTS_LENGTH = 7

interface ComponentProps {
  className?: string
  style?: React.CSSProperties
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [key: string]: any
}

export function getProps<P extends ComponentProps, T extends Record<string, PropDef>>(
  componentProps?: P,
  propDefs?: T,
): ComponentProps {
  const props = {...componentProps}
  let className = props?.className || ''
  let style = props?.style || {}

  for (const key in props) {
    if (!propDefs?.[key] || !propDefs?.[key].className) {
      continue
    }

    if (Array.isArray(props[key])) {
      for (let i = 0, len = Math.min(props[key].length, BREAKPOINTS_LENGTH); i < len; i++) {
        className = classNames(className, getClassName(props[key][i], propDefs[key], i))
        style = {...style, ...getStyle(props[key][i], propDefs[key], i)}
      }
    } else {
      className = classNames(className, getClassName(props[key], propDefs[key]))
      style = {...style, ...getStyle(props[key], propDefs[key])}
    }

    delete props[key]
  }

  return {...props, className, style}
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function getClassName(prop: any, propDef: PropDef, bp?: number) {
  if (propDef.type === 'union' && propDef.values?.includes(prop)) {
    return `${PREFIX}-${propDef.className}-${prop}${bp ? `-bp-${bp}` : ''}`
  }

  if (propDef.type === 'string' || propDef.type === 'number') {
    return `${PREFIX}-${propDef.className}${bp ? `-bp-${bp}` : ''}`
  }

  if (propDef.type === 'boolean') {
    return `${PREFIX}-${prop ? propDef.className : propDef.inverse}${bp ? `-bp-${bp}` : ''}`
  }

  return ''
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function getStyle(prop: any, propDef: PropDef, bp?: number) {
  if (propDef.type === 'string' || propDef.type === 'number') {
    return {
      [`${propDef.variable}${bp ? `-bp-${bp}` : ''}`]: prop,
    }
  }

  return {}
}
