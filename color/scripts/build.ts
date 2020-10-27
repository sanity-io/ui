/**
 * Generates src/colorPalette.ts based on `COLOR_HUES` constant + values in `src/config.js`
 * This lets us move `polished` (or similar) to a dev dependency, reducing bundle size
 */

import {writeFileSync, readFileSync} from 'fs'
import {join} from 'path'
import {mix} from 'polished'
import {format} from 'prettier'
import * as colors from '../src/config'
import {COLOR_HUES, COLOR_TINTS} from '../src/constants'
import {ColorHueKey, ColorValue, ColorHueConfig, ColorTintKey} from '../src/types'

function getColorHex(config: ColorHueConfig, tint: string): string {
  const tintNum = Number(tint)
  const midPoint = config.midPoint || 500
  const darkSize = 1000 - midPoint
  const lightPosition = tintNum / midPoint
  const darkPosition = (tintNum - midPoint) / darkSize

  if (tintNum === midPoint) {
    return config.mid.toLowerCase()
  }

  // light side of scale: x < midPoint
  if (tintNum < midPoint) {
    return mix(lightPosition, config.mid, config.lightest)
  }

  // dark side of scale: x > midPoint
  return mix(darkPosition, config.darkest, config.mid)
}

// Given a hue (eg red, blue) - grab the colors from configured values
// and generate a named export containing a generated set of tints
// Note: A more compact format + expander function was considered,
// but only amounted to ~72 byte decrease in bundle size after gziping
function buildExport(hue: ColorHueKey) {
  if (!colors[hue]) {
    throw new Error(`src/config is missing export for ${hue}`)
  }

  const initial = {} as Partial<{[key in ColorTintKey]: ColorValue}>
  const tints = COLOR_TINTS.reduce((acc, tint) => {
    acc[tint] = {
      title: `${hue.slice(0, 1).toUpperCase()}${hue.slice(1)} ${tint}`,
      hex: getColorHex(colors[hue], tint),
    }
    return acc
  }, initial)

  return `export const ${hue}: ColorTints = ${JSON.stringify(tints, null, 2)}`
}

// Actual "template" to output
const tpl = `/*
 * AUTO-GENERATED, DO NOT EDIT
 */

import {ColorTints} from './types'

${COLOR_HUES.map(buildExport).join('\n\n')}
`

// Format generated file with prettier so it can be commited without us being ashamed
const prettierConfig = JSON.parse(readFileSync(join(__dirname, '..', '..', '.prettierrc'), 'utf8'))
const filepath = join(__dirname, '..', 'src', 'hues.ts')
writeFileSync(filepath, format(tpl, {filepath, ...prettierConfig}))
