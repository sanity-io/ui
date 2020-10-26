import {color, ColorTintKey} from '@sanity/color'
import {ThemeSyntaxColor} from '../types'

export function buildSyntaxColor(
  mainShade: ColorTintKey = '200',
  secondaryShade: ColorTintKey = '700'
): ThemeSyntaxColor {
  return {
    atrule: color.purple[mainShade].hex,
    attrName: color.green[mainShade].hex,
    attrValue: color.yellow[mainShade].hex,
    attribute: color.yellow[mainShade].hex,
    boolean: color.purple[mainShade].hex,
    builtin: color.orange[mainShade].hex,
    cdata: color.yellow[mainShade].hex,
    char: color.yellow[mainShade].hex,
    class: color.orange[mainShade].hex,
    className: color.cyan[mainShade].hex,
    comment: color.gray[secondaryShade].hex,
    constant: color.purple[mainShade].hex,
    deleted: color.red[mainShade].hex,
    doctype: color.gray[secondaryShade].hex,
    entity: color.red[mainShade].hex,
    function: color.green[mainShade].hex,
    hexcode: color.blue[mainShade].hex,
    id: color.purple[mainShade].hex,
    important: color.purple[mainShade].hex,
    inserted: color.yellow[mainShade].hex,
    keyword: color.magenta[mainShade].hex,
    number: color.purple[mainShade].hex,
    operator: color.magenta[mainShade].hex,
    prolog: color.gray[secondaryShade].hex,
    property: color.blue[mainShade].hex,
    pseudoClass: color.yellow[mainShade].hex,
    pseudoElement: color.yellow[mainShade].hex,
    punctuation: color.gray[mainShade].hex,
    regex: color.blue[mainShade].hex,
    selector: color.red[mainShade].hex,
    string: color.yellow[mainShade].hex,
    symbol: color.purple[mainShade].hex,
    tag: color.red[mainShade].hex,
    unit: color.orange[mainShade].hex,
    url: color.red[mainShade].hex,
    variable: color.red[mainShade].hex,
  }
}
