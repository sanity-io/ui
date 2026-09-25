import {isColor} from '../lib/mix'
import {
  BuildThemeOptions,
  MAXIMUM_CONTRAST,
  MINIMUM_CONTRAST,
  SCHEMES,
  SchemeThemeOptions,
} from '../theme/options'
import {displayTitle} from './themes'

/** What a theme code carries: a theme's title and its options @internal */
export interface SharedTheme {
  title: string
  options: BuildThemeOptions
}

/**
 * The version of the code format, the first byte of every code — bumped if
 * the layout below ever changes, so older codes can still be told apart
 */
const VERSION = 1

/** The fields a scheme's options can set, in the order their bytes go */
const FIELDS = ['accent', 'text', 'background', 'contrast'] as const

/**
 * Turns a theme into a short code to share in a message: `title`, and the
 * colors and contrasts of both schemes, packed into bytes — one flag byte says
 * which of the eight fields are set, each color is its three RGB bytes and a
 * contrast one byte, and the title takes up the rest — then base64url'd, so
 * it is one word without padding, safe in URLs and chat. A theme setting
 * everything comes to about 30 bytes plus its title.
 *
 * @internal
 */
export function encodeTheme(theme: SharedTheme): string {
  const bytes: number[] = [VERSION, 0]
  let flags = 0

  SCHEMES.forEach((scheme, schemeIndex) => {
    const options: SchemeThemeOptions = theme.options[scheme] ?? {}

    FIELDS.forEach((field, fieldIndex) => {
      const value = options[field]

      if (value === undefined) return

      if (field === 'contrast') {
        if (typeof value !== 'number' || !Number.isFinite(value)) return

        bytes.push(Math.round(Math.min(MAXIMUM_CONTRAST, Math.max(MINIMUM_CONTRAST, value))))
      } else {
        if (typeof value !== 'string' || !isColor(value)) return

        bytes.push(...rgbBytes(value))
      }

      flags |= 1 << (schemeIndex * FIELDS.length + fieldIndex)
    })
  })

  bytes[1] = flags
  bytes.push(...new TextEncoder().encode(theme.title.trim()))

  return toBase64Url(Uint8Array.from(bytes))
}

/**
 * Reads a theme back out of a code — as pasted, so surrounding whitespace and
 * words around the code are fine: the first word that is a code counts. `null`
 * when nothing in the text is one.
 *
 * @internal
 */
export function decodeTheme(text: string): SharedTheme | null {
  for (const word of text.trim().split(/\s+/)) {
    const theme = decodeCode(word)

    if (theme) return theme
  }

  return null
}

function decodeCode(code: string): SharedTheme | null {
  const bytes = fromBase64Url(code)

  if (!bytes || bytes.length < 2 || bytes[0] !== VERSION) return null

  const flags = bytes[1]
  const options: BuildThemeOptions = {}
  let offset = 2

  for (const [schemeIndex, scheme] of SCHEMES.entries()) {
    const schemeOptions: SchemeThemeOptions = {}

    for (const [fieldIndex, field] of FIELDS.entries()) {
      if (!(flags & (1 << (schemeIndex * FIELDS.length + fieldIndex)))) continue

      if (field === 'contrast') {
        if (offset + 1 > bytes.length) return null

        schemeOptions.contrast = Math.min(
          MAXIMUM_CONTRAST,
          Math.max(MINIMUM_CONTRAST, bytes[offset]),
        )
        offset += 1
      } else {
        if (offset + 3 > bytes.length) return null

        schemeOptions[field] = hexColor(bytes.subarray(offset, offset + 3))
        offset += 3
      }
    }

    if (Object.keys(schemeOptions).length > 0) options[scheme] = schemeOptions
  }

  let title: string

  try {
    title = new TextDecoder('utf-8', {fatal: true}).decode(bytes.subarray(offset))
  } catch {
    return null
  }

  return {title: displayTitle(title), options}
}

/** The three RGB bytes of a `#rgb` or `#rrggbb` color */
function rgbBytes(color: string): number[] {
  const hex = color.length === 4 ? color.slice(1).replaceAll(/./g, '$&$&') : color.slice(1)

  return [0, 2, 4].map((start) => parseInt(hex.slice(start, start + 2), 16))
}

function hexColor(rgb: Uint8Array): string {
  return `#${[...rgb].map((byte) => byte.toString(16).padStart(2, '0')).join('')}`
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''

  for (const byte of bytes) binary += String.fromCharCode(byte)

  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '')
}

function fromBase64Url(code: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]+$/.test(code)) return null

  const base64 = code.replaceAll('-', '+').replaceAll('_', '/')

  try {
    return Uint8Array.from(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')), (char) =>
      char.charCodeAt(0),
    )
  } catch {
    return null
  }
}
