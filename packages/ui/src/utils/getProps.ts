import clsx from 'clsx'

import {type PropDef} from '../types/PropDef'

const PREFIX = 'sui'
const BREAKPOINTS_LENGTH = 6

interface ComponentProps {
  className?: string | undefined
  style?: React.CSSProperties | undefined
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

    if (
      !((propDef && 'className' in propDef && propDef.className) || propDef?.type === 'conditional')
    ) {
      restProps[key] = propValue
      continue
    }

    if (Array.isArray(propValue)) {
      // @TODO: consider fixing this O(n^2) time complexity
      // oxlint-disable-next-line no-accumulating-spread
      for (let i = 0, len = Math.min(propValue.length, BREAKPOINTS_LENGTH); i < len; i++) {
        const resolvedPropDef = getResolvedPropDef(propValue[i], propDef)

        if (!resolvedPropDef) {
          continue
        }

        className = clsx(className, getClassName(propValue[i], resolvedPropDef, i))
        style = {...style, ...getStyle(propValue[i], resolvedPropDef, i)}
      }
    } else {
      const resolvedPropDef = getResolvedPropDef(propValue, propDef)

      if (!resolvedPropDef) {
        restProps[key] = propValue
        continue
      }

      className = clsx(className, getClassName(propValue, resolvedPropDef))
      style = {...style, ...getStyle(propValue, resolvedPropDef)}
    }
  }

  return {...restProps, className, style}
}

function getResolvedPropDef(propValue: any, propDef?: PropDef) {
  if (propDef?.type !== 'conditional') {
    return propDef
  }

  const resolvedPropDef = propDef.resolve(propValue)

  if (!(resolvedPropDef && 'className' in resolvedPropDef && resolvedPropDef.className)) {
    return null
  }

  return resolvedPropDef
}

function getClassName(propValue: any, propDef: PropDef, bp?: number) {
  if (propDef.type === 'union' && propDef.values?.includes(propValue)) {
    /* Note: This may need updating depending on the final CSS classname formatting */
    return `${PREFIX}-${propDef.className}${typeof propValue === 'string' ? `-${propValue}` : propValue}${bp ? `-bp-${bp}` : ''}`
  }

  if (propDef.type === 'string' || propDef.type === 'number') {
    return `${PREFIX}-${propDef.className}${bp ? `-bp-${bp}` : ''}`
  }

  if (propDef.type === 'boolean') {
    if (propValue) {
      return `${PREFIX}-${propDef.className}${bp ? `-bp-${bp}` : ''}`
    }

    if (!propValue && propDef.inverseClassName) {
      return `${PREFIX}-${propDef.inverseClassName}${bp ? `-bp-${bp}` : ''}`
    }
  }

  return ''
}

function getStyle(propValue: any, propDef: PropDef, bp?: number) {
  if ((propDef.type === 'string' || propDef.type === 'number') && propDef.variable) {
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
