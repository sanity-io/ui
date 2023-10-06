import {hues} from '@sanity/color'
import {multiply, screen} from '../../../../studioTheme/helpers'
import {ThemeColorSchemeKey} from '../types'

const syntaxKeys = [
  'atrule',
  'attrName',
  'attrValue',
  'attribute',
  'boolean',
  'builtin',
  'cdata',
  'char',
  'class',
  'className',
  'comment',
  'constant',
  'deleted',
  'doctype',
  'entity',
  'function',
  'hexcode',
  'id',
  'important',
  'inserted',
  'keyword',
  'number',
  'operator',
  'prolog',
  'property',
  'pseudoClass',
  'pseudoElement',
  'punctuation',
  'regex',
  'selector',
  'string',
  'symbol',
  'tag',
  'unit',
  'url',
  'variable',
] as const

/**
 * @public
 */
export type SyntaxKey = (typeof syntaxKeys)[number]

const getSyntaxCssVar = (syntaxKey: SyntaxKey): string => `--syntax-${syntaxKey}`

export const createSyntaxVariables = (
  scheme: ThemeColorSchemeKey,
  baseBg: string,
): Record<string, string> => {
  const dark = scheme === 'dark'
  const mix = dark ? screen : multiply

  const mainShade = dark ? 400 : 600
  const secondaryShade = dark ? 600 : 400
  const colors: Record<SyntaxKey, string> = {
    atrule: mix(baseBg, hues.purple[mainShade].hex),
    attrName: mix(baseBg, hues.green[mainShade].hex),
    attrValue: mix(baseBg, hues.yellow[mainShade].hex),
    attribute: mix(baseBg, hues.yellow[mainShade].hex),
    boolean: mix(baseBg, hues.purple[mainShade].hex),
    builtin: mix(baseBg, hues.purple[mainShade].hex),
    cdata: mix(baseBg, hues.yellow[mainShade].hex),
    char: mix(baseBg, hues.yellow[mainShade].hex),
    class: mix(baseBg, hues.orange[mainShade].hex),
    className: mix(baseBg, hues.cyan[mainShade].hex),
    comment: mix(baseBg, hues.gray[secondaryShade].hex),
    constant: mix(baseBg, hues.purple[mainShade].hex),
    deleted: mix(baseBg, hues.red[mainShade].hex),
    doctype: mix(baseBg, hues.gray[secondaryShade].hex),
    entity: mix(baseBg, hues.red[mainShade].hex),
    function: mix(baseBg, hues.green[mainShade].hex),
    hexcode: mix(baseBg, hues.blue[mainShade].hex),
    id: mix(baseBg, hues.purple[mainShade].hex),
    important: mix(baseBg, hues.purple[mainShade].hex),
    inserted: mix(baseBg, hues.yellow[mainShade].hex),
    keyword: mix(baseBg, hues.magenta[mainShade].hex),
    number: mix(baseBg, hues.purple[mainShade].hex),
    operator: mix(baseBg, hues.magenta[mainShade].hex),
    prolog: mix(baseBg, hues.gray[secondaryShade].hex),
    property: mix(baseBg, hues.blue[mainShade].hex),
    pseudoClass: mix(baseBg, hues.yellow[mainShade].hex),
    pseudoElement: mix(baseBg, hues.yellow[mainShade].hex),
    punctuation: mix(baseBg, hues.gray[mainShade].hex),
    regex: mix(baseBg, hues.blue[mainShade].hex),
    selector: mix(baseBg, hues.red[mainShade].hex),
    string: mix(baseBg, hues.yellow[mainShade].hex),
    symbol: mix(baseBg, hues.purple[mainShade].hex),
    tag: mix(baseBg, hues.red[mainShade].hex),
    unit: mix(baseBg, hues.orange[mainShade].hex),
    url: mix(baseBg, hues.red[mainShade].hex),
    variable: mix(baseBg, hues.red[mainShade].hex),
  }

  return Object.keys(colors).reduce(
    (acc, key) => {
      acc[getSyntaxCssVar(key as SyntaxKey)] = colors[key as SyntaxKey]

      return acc
    },
    {} as Record<string, string>,
  )
}

export const syntaxCssVariables: Record<SyntaxKey, string> = syntaxKeys.reduce(
  (acc, key) => {
    acc[key] = `var(${getSyntaxCssVar(key)})`

    return acc
  },
  {} as Record<SyntaxKey, string>,
)
