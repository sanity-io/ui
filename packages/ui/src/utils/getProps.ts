import classNames from 'classnames'

import {type PropDef} from '../types/PropDef'

const PREFIX = 'sui'
const BREAKPOINTS_LENGTH = 7

interface ComponentProps {
  className?: string | undefined
  style?: React.CSSProperties | undefined
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [key: string]: any
}

export function getProps(
  componentProps?: ComponentProps,
  propDefs?: Record<string, PropDef>,
): ComponentProps {
  const {allComponentProps, allPropDefs} = flattenCompositeProps(componentProps, propDefs)
  const restProps: ComponentProps = {}
  let className = componentProps?.className || ''
  let style = componentProps?.style || {}

  for (const key in allComponentProps) {
    const propDef = allPropDefs?.[key]
    const propValue = allComponentProps[key]

    if (!propDef || !('className' in propDef) || !propDef.className) {
      restProps[key] = propValue
      continue
    }

    if (Array.isArray(propValue)) {
      for (let i = 0, len = Math.min(propValue.length, BREAKPOINTS_LENGTH); i < len; i++) {
        className = classNames(className, getClassName(propValue[i], propDef, i))
        style = {...style, ...getStyle(propValue[i], propDef, i)}
      }
    } else {
      className = classNames(className, getClassName(propValue, propDef))
      style = {...style, ...getStyle(propValue, propDef)}
    }
  }

  return {...restProps, className, style}
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function getClassName(propValue: any, propDef: PropDef, bp?: number) {
  if (propDef.type === 'union' && propDef.values?.includes(propValue)) {
    /* Note: This may need updating depending on the final CSS classname formatting */
    return `${PREFIX}-${propDef.className}${typeof propValue === 'string' ? `-${propValue}` : propValue}${bp ? `-bp-${bp}` : ''}`
  }

  if (propDef.type === 'string' || propDef.type === 'number') {
    return `${PREFIX}-${propDef.className}${bp ? `-bp-${bp}` : ''}`
  }

  if (propDef.type === 'boolean') {
    return `${PREFIX}-${propValue ? propDef.className : propDef.inverse}${bp ? `-bp-${bp}` : ''}`
  }

  return ''
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function getStyle(propValue: any, propDef: PropDef, bp?: number) {
  if (propDef.type === 'string' || propDef.type === 'number') {
    return {
      [`${propDef.variable}${bp ? `-bp-${bp}` : ''}`]: propValue,
    }
  }

  return {}
}

export function flattenCompositeProps(
  componentProps?: ComponentProps,
  propDefs?: Record<string, PropDef>,
) {
  const props = {
    allComponentProps: {} as ComponentProps,
    allPropDefs: {} as Record<string, PropDef>,
  }

  for (const key in componentProps) {
    if (propDefs?.[key] && propDefs?.[key].type === 'composite') {
      for (const compositeKey in propDefs?.[key].composition) {
        const compositeValue = getCompositeValue(componentProps[key], propDefs[key], compositeKey)

        props.allComponentProps[compositeKey] = compositeValue
        props.allPropDefs[compositeKey] = propDefs[key].composition[compositeKey]
          ?.propDef as PropDef
      }
    } else {
      props.allComponentProps[key] = componentProps[key]
      props.allPropDefs[key] = propDefs?.[key] as PropDef
    }
  }

  return props
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function getCompositeValue(propValue: any, propDef: PropDef, key: string) {
  if (!('composition' in propDef)) {
    return
  }

  const mapping = propDef.composition[key]?.['mapping']
  let compositeValue

  if (Array.isArray(propValue)) {
    compositeValue = []

    for (let i = 0, len = propValue.length; i < len; i++) {
      compositeValue[i] = mapping?.[propValue[i]]
    }
  } else {
    compositeValue = mapping?.[propValue]
  }

  return compositeValue
}
