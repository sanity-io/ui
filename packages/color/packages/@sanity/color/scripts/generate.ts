import {writeFileSync, readFileSync} from 'fs'
import path from 'path'
import {format} from 'prettier'
import {COLOR_HUES, ColorHueKey, buildTints, config, hslToRgb, rgbToHex} from '../src'

const ROOT_PATH = path.resolve(__dirname, '..')

const GENERATED_BANNER = `/* THIS FILE IS AUTO-GENERATED – DO NOT EDIT */`

generate().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

/**
 * Generates `src/color.ts` based on `COLOR_HUES` constant + values in `src/config.js`
 */
async function generate() {
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

  // Format generated file with prettier so it can be commited without us being ashamed
  const prettierConfig = JSON.parse(readFileSync(path.resolve(ROOT_PATH, '.prettierrc'), 'utf8'))
  const filepath = path.resolve(__dirname, '../src/color.ts')

  writeFileSync(filepath, await format(tpl, {filepath, ...prettierConfig}), {encoding: 'utf8'})

  // eslint-disable-next-line no-console
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
