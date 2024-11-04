import {type Properties} from '../types'
import {CompileRulesContext} from './types'

export function compileRule(
  selector: string,
  props: Properties,
  context: CompileRulesContext,
): string {
  let css = compileProperties(selector, props)

  if (props['@nest']) {
    css += compileNestedRules(selector, props['@nest'], context)
  }

  if (props['@keyframes']) {
    for (const name in props['@keyframes']) {
      context.keyframes[name] = props['@keyframes'][name]
    }
  }

  if (props['@media']) {
    for (const key in props['@media']) {
      if (!context.media[key]) {
        context.media[key] = {}
      }

      context.media[key][selector] = props['@media'][key]
    }
  }

  return css
}

function compileProperties(selector: string, props: Properties) {
  let css = '{'

  for (const key in props) {
    if (key === '@keyframes') continue // ignore
    if (key === '@media') continue // ignore
    if (key === '@nest') continue // ignore

    const value = (props as Record<string, string>)[key]

    const valueArr = Array.isArray(value) ? value : [value]

    for (const v of valueArr) {
      css += toSnakeCase(key) + ':' + v + ';'
    }
  }

  if (css === '{') return ''

  return selector + css + '}'
}

function compileNestedRules(
  selector: string,
  props: Record<string, Properties>,
  context: CompileRulesContext,
) {
  if (!props) return ''

  let css = ''

  for (const [_selector, _props] of Object.entries(props)) {
    css += '\n' + compileRule(_selector.replace(/&/g, selector), _props, context)
  }

  return css
}

export function compileMediaQueryRule(query: string, rules: Record<string, Properties>): string {
  let css = `@media ${query}{`

  for (const [selector, props] of Object.entries(rules)) {
    // console.log('compileMediaQueryRule', {selector, props})

    css += '\n  ' + compileProperties(selector, props)

    if (props['@nest']) {
      css += compileNestedRules(selector, props['@nest'], {keyframes: {}, media: {}})
    }
  }

  return css + '\n}'
}

function toSnakeCase(value: string) {
  return value.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
}
