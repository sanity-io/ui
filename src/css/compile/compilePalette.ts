import {HUES, PaletteConfig, TINTS} from '@sanity/ui/theme'

import {compileRule} from './compileRule'

export function compilePalette(config: PaletteConfig): string {
  const props: Record<string, string> = {
    '--l-min': `${config.luminosity.min * 100}%`,
    '--l-max': `${config.luminosity.max * 100}%`,
    '--l-range': `calc(var(--l-max) - var(--l-min))`,

    '--c-min': `${config.chroma.min}`,
    '--c-max': `${config.chroma.max}`,
    '--c-range': `calc(var(--c-max) - var(--c-min))`,

    ...compileHues(config.hues),

    '--black': `oklch(
      calc(var(--l-min) + 0.0 * var(--l-range))
      calc(var(--c-min) + 0.0 * var(--gray-c-range))
      var(--gray-h)
    )`,

    '--white': `oklch(
      calc(var(--l-min) + 1.0 * var(--l-range))
      calc(var(--c-min) + 0.0 * var(--gray-c-range))
      var(--gray-h)
    )`,
  }

  return compileRule(':root', props, {keyframes: {}, media: {}})
}

function compileHues(hues: PaletteConfig['hues']) {
  const rules: Record<string, string> = {}

  for (const hue of HUES) {
    const {c, h} = hues[hue]

    rules[`--${hue}-h`] = `${h}`
    rules[`--${hue}-c`] = `${c}`
    rules[`--${hue}-c-max`] = `min(var(--c-max), var(--${hue}-c))`
    rules[`--${hue}-c-range`] = `calc(var(--${hue}-c-max) - var(--c-min))`

    for (const tint of TINTS) {
      const l_offset = parseFloat((1 - tint / 1000).toFixed(2))
      const c_offset_tmp = tint / 500
      const c_offset = parseFloat((c_offset_tmp < 1 ? c_offset_tmp : 2 - c_offset_tmp).toFixed(1))

      rules[`--${hue}-${tint}`] = [
        `oklch(`,
        `calc(var(--l-min) + ${l_offset} * var(--l-range)) `,
        `calc(var(--c-min) + ${c_offset} * var(--${hue}-c-range)) `,
        `var(--${hue}-h)`,
        `)`,
      ].join('')
    }
  }

  return rules
}
