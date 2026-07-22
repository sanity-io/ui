import {writeFileSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import {buildTints, COLOR_HUES, ColorHueKey, config, hslToRgb, rgbToHex} from '../src'

const ROOT_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const GENERATED_BANNER = `/* THIS FILE IS AUTO-GENERATED – DO NOT EDIT */`

/**
 * Generates `src/color.ts` based on the `COLOR_HUES` constant + values in `src/config.ts`.
 * The output is formatted with oxfmt by the `generate` package script.
 */
function generate() {
  // Actual "template" to output
  const tpl = `${GENERATED_BANNER}

import {Color, ColorHues, ColorTint, ColorTints} from './types'

/** @public */
export const black: ColorTint = {
  title: 'Black',
  hex: '${rgbToHex(hslToRgb(config.black.hsl))}',
}

/** @public */
export const white: ColorTint = {
  title: 'White',
  hex: '${rgbToHex(hslToRgb(config.white.hsl))}',
}

${COLOR_HUES.map(buildHueExport).join('\n\n')}

/** @public */
export const hues: ColorHues = {${COLOR_HUES.join(', ')}};

/** @public */
export const color: Color = {black, white, ...hues};
`

  const filepath = path.resolve(ROOT_PATH, 'src/color.ts')

  writeFileSync(filepath, tpl, {encoding: 'utf8'})

  // oxlint-disable-next-line no-console
  console.log('generated', path.relative(ROOT_PATH, filepath))
}

function buildHueExport(hue: ColorHueKey) {
  const colorConfig = config[hue]

  if (!colorConfig) {
    throw new Error(`src/config is missing export for ${hue}`)
  }

  const tints = buildTints({color: colorConfig, hueKey: hue, black: config.black})

  return `/** @public */\nexport const ${hue}: ColorTints = ${JSON.stringify(tints, null, 2)}`
}

generate()
