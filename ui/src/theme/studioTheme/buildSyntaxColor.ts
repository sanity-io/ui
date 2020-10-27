import {hues, ColorTintKey} from '@sanity/color'
import {ThemeSyntaxColor} from '../types'

export function buildSyntaxColor(
  mainShade: ColorTintKey = '200',
  secondaryShade: ColorTintKey = '700'
): ThemeSyntaxColor {
  return {
    atrule: hues.purple[mainShade].hex,
    attrName: hues.green[mainShade].hex,
    attrValue: hues.yellow[mainShade].hex,
    attribute: hues.yellow[mainShade].hex,
    boolean: hues.purple[mainShade].hex,
    builtin: hues.orange[mainShade].hex,
    cdata: hues.yellow[mainShade].hex,
    char: hues.yellow[mainShade].hex,
    class: hues.orange[mainShade].hex,
    className: hues.cyan[mainShade].hex,
    comment: hues.gray[secondaryShade].hex,
    constant: hues.purple[mainShade].hex,
    deleted: hues.red[mainShade].hex,
    doctype: hues.gray[secondaryShade].hex,
    entity: hues.red[mainShade].hex,
    function: hues.green[mainShade].hex,
    hexcode: hues.blue[mainShade].hex,
    id: hues.purple[mainShade].hex,
    important: hues.purple[mainShade].hex,
    inserted: hues.yellow[mainShade].hex,
    keyword: hues.magenta[mainShade].hex,
    number: hues.purple[mainShade].hex,
    operator: hues.magenta[mainShade].hex,
    prolog: hues.gray[secondaryShade].hex,
    property: hues.blue[mainShade].hex,
    pseudoClass: hues.yellow[mainShade].hex,
    pseudoElement: hues.yellow[mainShade].hex,
    punctuation: hues.gray[mainShade].hex,
    regex: hues.blue[mainShade].hex,
    selector: hues.red[mainShade].hex,
    string: hues.yellow[mainShade].hex,
    symbol: hues.purple[mainShade].hex,
    tag: hues.red[mainShade].hex,
    unit: hues.orange[mainShade].hex,
    url: hues.red[mainShade].hex,
    variable: hues.red[mainShade].hex,
  }
}
