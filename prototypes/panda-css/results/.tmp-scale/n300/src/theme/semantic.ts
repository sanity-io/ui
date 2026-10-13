import {hues, toneHue, tones, type Tone} from './palette'

/**
 * Semantic color roles, each with a light and a dark value. `panda.config.ts`
 * turns this into `semanticTokens` (CSS variables with a `_dark` condition);
 * `ThemeProvider` uses the same table to assign the variables at runtime, so
 * the values travel with this version's JavaScript rather than with its CSS.
 */
export type SchemeValues = {light: string; dark: string}

export type ToneRole = 'bg' | 'bgHover' | 'fg' | 'border' | 'tintFg' | 'tintBg'

export type SemanticColorPath =
  | 'bg.base'
  | 'fg.base'
  | 'focusRing'
  | `tone.${Tone}.${ToneRole}`

function toneRoles(tone: Tone): Record<ToneRole, SchemeValues> {
  const hue = hues[toneHue[tone]]
  const isDefault = tone === 'default'
  const isCaution = tone === 'caution'
  return {
    bg: {light: isDefault ? hue[800] : hue[500], dark: isDefault ? hue[200] : hue[400]},
    bgHover: {light: isDefault ? hue[900] : hue[600], dark: isDefault ? hue[100] : hue[300]},
    fg: {
      light: isCaution ? hues.gray[950] : '#ffffff',
      dark: hues.gray[950],
    },
    border: {light: isDefault ? hue[300] : hue[500], dark: isDefault ? hue[700] : hue[400]},
    tintFg: {light: isDefault ? hue[800] : hue[700], dark: isDefault ? hue[100] : hue[300]},
    tintBg: {light: isDefault ? hue[100] : hue[50], dark: isDefault ? hue[800] : hue[950]},
  }
}

export function buildSemanticColors(): Record<SemanticColorPath, SchemeValues> {
  const out: Partial<Record<SemanticColorPath, SchemeValues>> = {
    'bg.base': {light: '#ffffff', dark: hues.gray[950]},
    'fg.base': {light: hues.gray[900], dark: hues.gray[100]},
    focusRing: {light: hues.blue[500], dark: hues.blue[400]},
  }
  for (const tone of tones) {
    const roles = toneRoles(tone)
    for (const role of Object.keys(roles) as ToneRole[]) {
      out[`tone.${tone}.${role}`] = roles[role]
    }
  }
  return out as Record<SemanticColorPath, SchemeValues>
}

export const semanticColors: Record<SemanticColorPath, SchemeValues> = buildSemanticColors()
