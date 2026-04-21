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
  const allProps = spreadCompositeProps(componentProps, propDefs)
  const restProps: ComponentProps = {}
  let className = componentProps?.className || ''
  let style = componentProps?.style || {}

  for (const key in allProps) {
    if (!propDefs?.[key] || !('className' in propDefs?.[key]) || !propDefs?.[key].className) {
      restProps[key] = allProps[key]
      continue
    }

    if (Array.isArray(allProps[key])) {
      for (
        let i = 0, len = Math.min(allProps[key].length, BREAKPOINTS_LENGTH);
        i < len;
        i++
      ) {
        className = classNames(className, getClassName(allProps[key][i], propDefs[key], i))
        style = {...style, ...getStyle(allProps[key][i], propDefs[key], i)}
      }
    } else {
      className = classNames(className, getClassName(allProps[key], propDefs[key]))
      style = {...style, ...getStyle(allProps[key], propDefs[key])}
    }
  }

  return {...restProps, className, style}
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function getClassName(prop: any, propDef: PropDef, bp?: number) {
  if (propDef.type === 'union' && propDef.values?.includes(prop)) {
    /* Note: This may need updating depending on the final CSS classname formatting */
    return `${PREFIX}-${propDef.className}${typeof prop === 'string' ? `-${prop}` : prop}${bp ? `-bp-${bp}` : ''}`
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

export function spreadCompositeProps<P extends ComponentProps, T extends Record<string, PropDef>>(
  componentProps?: P,
  propDefs?: T,
): ComponentProps {
  const compositeProps: ComponentProps = {}

  for (const key in componentProps) {
    if (propDefs?.[key] && propDefs?.[key].type === 'composite') {
      for (const compKey in propDefs?.[key].composition) {
        const mappings = propDefs?.[key].composition[compKey];

        if (Array.isArray(componentProps[key])) {
          compositeProps[compKey] = []

          for (
            let i = 0, len = componentProps[key].length;
            i < len;
            i++
          ) {
            compositeProps[compKey][i] = mappings?.[componentProps[key][i]]
          }
        } else {
          compositeProps[compKey] = mappings?.[componentProps[key]]
        }
      }
    } else {
      compositeProps[key] = componentProps[key]
    }
  }

  return compositeProps
}
