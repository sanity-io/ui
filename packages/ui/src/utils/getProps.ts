import classNames from 'classnames';

import { type PropDef } from "../types/PropDef";

const PREFIX = 'sui'
const BREAKPOINTS_LENGTH = 7

interface ComponentProps {
  className?: string
  style?: React.CSSProperties
  [key: string]: any
}

export function getProps<
  P extends ComponentProps,
  T extends Record<string, PropDef>
> (
  componentProps?: P,
  propDefs?: T,
): ComponentProps {
  const props = {...componentProps}
  let className = props?.className || ''
  let style = props?.style || {}

  for (const key in props) {
    if (!propDefs?.[key]) {
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

  return { ...props, className, style }
}

function getClassName (prop: any, propDef: PropDef, bp?: number) {
  if (propDef.type === 'enum' && propDef.values?.includes(prop)) {
    return `${PREFIX}-${propDef.className}-${prop}${bp ? `-bp-${bp}` : ''}`
  }

  if (propDef.type === 'string') {
    return `${PREFIX}-${propDef.className}${bp ? `-bp-${bp}` : ''}`
  }

  if (propDef.type === 'boolean') {
    return `${PREFIX}-${prop ? propDef.className : propDef.inverseClassName}${bp ? `-bp-${bp}` : ''}`
  }

  return ''
}

function getStyle (prop: any, propDef: PropDef, bp?: number) {
  if (propDef.type === 'string') {
    return {
      [`${propDef.variable}${bp ?  `-bp-${bp}` : ''}`]: prop
    }
  }

  return {}
}
