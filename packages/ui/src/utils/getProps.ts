import {type PropDef} from '../types/PropDef'

const PREFIX = 'sui'
const BREAKPOINTS_LENGTH = 6

interface ComponentProps {
  className?: string | undefined
  style?: React.CSSProperties | undefined
  [key: string]: any
}

const classNameCache = new WeakMap<PropDef, Map<string, string>>()

export function getProps(
  componentProps?: ComponentProps,
  propDefs?: Record<string, PropDef>,
): ComponentProps {
  const {allComponentProps, allPropDefs} = flattenCompositeProps(componentProps, propDefs)
  const restProps: ComponentProps = {}
  const classes: string[] = componentProps?.className ? [componentProps.className] : []
  const style: Record<string, unknown> = componentProps?.style ? {...componentProps.style} : {}

  for (const key in allComponentProps) {
    const propDef = allPropDefs?.[key]
    const propValue = allComponentProps[key]

    if (!propDef || !('className' in propDef) || !propDef.className) {
      restProps[key] = propValue
      continue
    }

    if (Array.isArray(propValue)) {
      for (let i = 0, len = Math.min(propValue.length, BREAKPOINTS_LENGTH); i < len; i++) {
        const cls = getClassName(propValue[i], propDef, i)
        if (cls) classes.push(cls)
        assignStyle(style, propValue[i], propDef, i)
      }
    } else {
      const cls = getClassName(propValue, propDef)
      if (cls) classes.push(cls)
      assignStyle(style, propValue, propDef)
    }
  }

  return {...restProps, className: classes.join(' '), style}
}

function getClassName(propValue: any, propDef: PropDef, bp?: number): string {
  let inner = classNameCache.get(propDef)
  if (!inner) {
    inner = new Map()
    classNameCache.set(propDef, inner)
  }
  // bp=0 produces the same output as bp=undefined (no -bp-N suffix), so
  // collapse them into one cache entry via `bp || ''`.
  const cacheKey = `${propValue}\x00${bp || ''}`
  const hit = inner.get(cacheKey)
  if (hit !== undefined) return hit
  const result = computeClassName(propValue, propDef, bp)
  inner.set(cacheKey, result)
  return result
}

function computeClassName(propValue: any, propDef: PropDef, bp?: number): string {
  if (propDef.type === 'union' && propDef.values?.includes(propValue)) {
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

function assignStyle(
  style: Record<string, unknown>,
  propValue: any,
  propDef: PropDef,
  bp?: number,
): void {
  if (propDef.type === 'string' || propDef.type === 'number') {
    style[`${propDef.variable}${bp ? `-bp-${bp}` : ''}`] = propValue
  }
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