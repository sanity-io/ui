import {type Properties} from '../types'

export function compileRule(selector: string, props: Properties): string {
  return compileProperties(selector, props) + compileNestedRules(selector, props['@nest'])
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

  if (css.length === 1) return ''

  return selector + css + '}'
}

function compileNestedRules(selector: string, props?: Record<string, Properties>) {
  if (!props) return ''

  let css = ''

  for (const key in props) {
    const value = (props as Record<string, string>)[key]

    css +=
      '\n' +
      key.replace(/&/g, selector) +
      compileProperties(selector, value as Properties).substring(selector.length)
  }

  return css
}

export function compileMediaQueryRule(query: string, rules: Record<string, Properties>): string {
  let css = `@media ${query}{`

  for (const key in rules) {
    css += '\n  ' + compileRule(`.${key}`.replace(/:/g, '\\:'), rules[key])
  }

  return css + '\n}'
}

function toSnakeCase(value: string) {
  return value.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
}
