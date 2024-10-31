import {PREFIX} from './prefix'
import type {Properties, PropertiesWithVarsAndNested, Style, StyleRules} from './types'
import {isArray} from './util'

/** @internal */
export function _compileStyle(style: Style): string {
  let css = ''

  if (style.rules) {
    css += compileStyleRules(style.rules)
  }

  if (style.keyframes && Object.keys(style.keyframes).length > 0) {
    for (const [name, value] of Object.entries(style.keyframes)) {
      let keyframesCss = `@keyframes ${name} {\n`

      for (const [key, props] of Object.entries(value)) {
        keyframesCss += `  ${key} {\n`
        keyframesCss += compileProperties(props)
        keyframesCss += `}\n`
      }

      keyframesCss += `\n}\n\n`

      css += keyframesCss
    }
  }

  if (style.layers && Object.keys(style.layers).length > 0) {
    for (const [layerName, layerRules] of Object.entries(style.layers)) {
      if (Object.keys(layerRules).length > 0) {
        css += `@layer ${layerName} {\n`
        css += compileStyleRules(layerRules)
        css += '}\n\n'
      }
    }
  }

  return css
}

export function compileStyleRules(rules: StyleRules) {
  let css = ''

  const mediaMap = new Map<
    string,
    {
      selector: string
      props: PropertiesWithVarsAndNested
    }[]
  >()

  for (const [selector, properties] of Object.entries(rules)) {
    if (!properties) {
      continue
    }

    if (properties['@media']) {
      for (const [mediaQuery, mediaProps] of Object.entries(properties['@media'])) {
        const arr = mediaMap.get(mediaQuery) ?? []

        arr.push({
          selector,
          props: mediaProps,
        })

        mediaMap.set(mediaQuery, arr)
      }
    }

    css += compileStyleRule(selector, properties)
  }

  for (const [mediaQuery, mediaRules] of mediaMap) {
    css += `@media ${mediaQuery} {\n`

    for (const rule of mediaRules) {
      css += compileStyleRule(rule.selector, rule.props)
    }

    css += `}\n\n`
  }

  return css
}

function compileStyleRule(_selector: string, properties: Properties): string {
  let css = ''

  const {
    _prefix = true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    '@media': _mediaProps,
    'nest': nestedProps,
    ...restProperties
  } = properties

  const selector = _prefix ? `${_selector.replace(/\./g, `.${PREFIX}`)}` : _selector

  const propEntries = Object.entries(restProperties)

  if (propEntries.length) {
    css += `${selector} {\n`
    css += compileProperties(restProperties)
    css += '}\n\n'
  }

  if (nestedProps) {
    for (const [_nestedSelector, nestedProperties] of Object.entries(nestedProps)) {
      const nestedPrefix = _prefix && (nestedProperties._prefix ?? true)
      const nestedSelector = nestedPrefix
        ? _nestedSelector.replace(/\./g, `.${PREFIX}`)
        : _nestedSelector

      css += `${nestedSelector.replace(/&/g, selector)} {\n`
      css += compileProperties(nestedProperties)
      css += '}\n\n'
    }
  }

  return css
}

function compileProperties(props: Properties) {
  let css = ''

  const propEntries = Object.entries(props)

  for (const [key, value] of propEntries) {
    // custom properties (vars)
    if (key === 'vars') {
      for (const [k, v] of Object.entries(value)) {
        css += `  ${k}: ${v};\n`
      }
      continue
    }

    if (key.startsWith('@')) {
      continue
    }

    if (isArray(value)) {
      for (const item of value) {
        css += `  ${toSnakeCase(key)}: ${item};\n`
      }
    } else {
      css += `  ${toSnakeCase(key)}: ${value};\n`
    }
  }

  return css
}

function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}
