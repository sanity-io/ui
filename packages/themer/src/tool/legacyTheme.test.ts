import {presets as hostedPresets} from '@sanity/themer-legacy'
import {describe, expect, it} from 'vitest'

import {buildTheme} from '../theme/buildTheme'
import {presets} from '../theme/presets'
import {convertLegacyTheme} from './legacyTheme'

const HOSTED = 'https://themer.sanity.build/api/hues'

/** The options a text converts to, failing the test when it does not convert */
function optionsOf(text: string) {
  const conversion = convertLegacyTheme(text)

  if (conversion.status !== 'converted') {
    throw new Error(
      `Expected ${JSON.stringify(text)} to convert, got ${JSON.stringify(conversion)}`,
    )
  }

  return conversion.options
}

const verdant = presets.find((preset) => preset.slug === 'verdant')!

describe('convertLegacyTheme', () => {
  it('converts every hosted preset into the preset of the same name', () => {
    // The hosted default preset was the stock Studio theme of its day
    const counterparts: Record<string, string> = {default: 'studio'}

    for (const hosted of hostedPresets) {
      const preset = presets.find(
        (candidate) => candidate.slug === (counterparts[hosted.slug] ?? hosted.slug),
      )

      // Tailwind Cyan was not carried over into the presets
      if (!preset) continue

      expect(convertLegacyTheme(`${HOSTED}?preset=${hosted.slug}`), hosted.slug).toEqual({
        status: 'converted',
        title: hosted.title,
        options: preset.options,
      })
    }
  })

  it('converts the presets that were not carried over', () => {
    expect(convertLegacyTheme(`${HOSTED}?preset=tw-cyan`)).toEqual({
      status: 'converted',
      title: 'Tailwind Cyan',
      options: {
        light: {accent: '#51b4d0', text: '#677389', background: '#f9fafb'},
        dark: {accent: '#51b4d0', text: '#677389', background: '#101728'},
      },
    })
  })

  it('finds the URL in the import lines of a Studio config', () => {
    for (const snippet of [
      `import {theme} from '${HOSTED}?preset=verdant'`,
      `import {theme} from "${HOSTED}?preset=verdant";`,
      `theme: (await import('${HOSTED}?preset=verdant')).theme,`,
      `const theme = buildThemeFromUrl(\n  '${HOSTED}?preset=verdant',\n)`,
      `See [the theme](${HOSTED}?preset=verdant).`,
      `Our theme lives at ${HOSTED}?preset=verdant.`,
      `themer.sanity.build/api/hues?preset=verdant`,
      `http://localhost:3000/api/hues/?preset=verdant`,
    ]) {
      expect(optionsOf(snippet), snippet).toEqual(verdant.options)
    }
  })

  it('reads colors written with a #, which a URL would take for its fragment', () => {
    expect(optionsOf(`import {theme} from '${HOSTED}?preset=verdant&lightest=#fff'`)).toEqual({
      // The hosted default lightest is the stock light background
      light: {accent: '#1cb485', text: '#5c9199'},
      dark: {accent: '#1cb485', text: '#5c9199', background: '#0d1415'},
    })
    expect(optionsOf(`${HOSTED}?primary=#22FCA8;400;lightest:%23fcfdfd&darkest=#000`)).toEqual(
      optionsOf(`${HOSTED}?primary=22fca8;400;lightest:fcfdfd&darkest=000`),
    )
    expect(optionsOf(`${HOSTED}?preset=verdant#top`)).toEqual(verdant.options)
  })

  it('carries the primary and default hues over, and applies overrides on top of presets', () => {
    expect(
      optionsOf(`${HOSTED}?default=5e63b4;600;lightest:fcfcfd;darkest:0d0d15&primary=D1A308;400`),
    ).toEqual({
      light: {accent: '#d1a308', text: '#5e63b4', background: '#fcfcfd'},
      dark: {accent: '#d1a308', text: '#5e63b4', background: '#0d0d15'},
    })
    expect(convertLegacyTheme(`${HOSTED}?preset=pink-synth&primary=b595f9;400`)).toEqual({
      status: 'converted',
      title: 'Pink Synth',
      options: {
        light: {accent: '#b595f9', text: '#8b6584', background: '#f7f2f5'},
        dark: {accent: '#b595f9', text: '#8b6584', background: '#171721'},
      },
    })
    // The global lightest and darkest reach the backgrounds through the default hue
    expect(optionsOf(`${HOSTED}?lightest=f7f2f5&darkest=171721`)).toEqual({
      light: {background: '#f7f2f5'},
      dark: {background: '#171721'},
    })
    expect(optionsOf(`${HOSTED}?primary=f00`)).toEqual({
      light: {accent: '#ff0000'},
      dark: {accent: '#ff0000'},
    })
  })

  it('leaves what the hosted service defaulted to at the current defaults', () => {
    expect(optionsOf(HOSTED)).toEqual({})
    expect(optionsOf(`${HOSTED}?preset=default`)).toEqual({})
    expect(optionsOf(`${HOSTED}?lightest=fff&darkest=101112&default=8690a0;500`)).toEqual({})
    // The text color follows the accent, like the stock gray follows the stock blue
    expect(optionsOf(`${HOSTED}?primary=22fca8`)).toEqual({
      light: {accent: '#22fca8'},
      dark: {accent: '#22fca8'},
    })
    expect(optionsOf(`${HOSTED}?preset=verdant&primary=2276fc`)).toEqual({
      light: {text: '#5c9199', background: '#fcfdfd'},
      dark: {text: '#5c9199', background: '#0d1415'},
    })
  })

  it('titles the theme after its preset', () => {
    expect(convertLegacyTheme(`${HOSTED}?preset=VERDANT`)).toMatchObject({title: 'Verdant'})
    expect(convertLegacyTheme(`${HOSTED}?preset=default`)).toMatchObject({title: 'Studio v3'})
    expect(convertLegacyTheme(`${HOSTED}?primary=22fca8`)).toMatchObject({title: 'Imported theme'})
    // The hosted service fell back to its default preset for unknown ones
    expect(convertLegacyTheme(`${HOSTED}?preset=nope&primary=22fca8`)).toEqual(
      convertLegacyTheme(`${HOSTED}?primary=22fca8`),
    )
  })

  it('takes the first theme URL, skipping the wildcard module of themer.d.ts', () => {
    const declaration = `declare module '${HOSTED}?*' {\n  export const theme: import('sanity').StudioTheme\n}`

    expect(convertLegacyTheme(declaration)).toEqual({status: 'missing'})
    expect(
      optionsOf(
        `${declaration}\nimport {theme} from '${HOSTED}?preset=verdant'\n'${HOSTED}?preset=dew'`,
      ),
    ).toEqual(verdant.options)
  })

  it('finds nothing in text without a hosted Themer URL', () => {
    for (const text of [
      '',
      'https://themer.sanity.build',
      '?preset=verdant',
      'api/hues',
      'hello',
    ]) {
      expect(convertLegacyTheme(text), text).toEqual({status: 'missing'})
    }
  })

  it('rejects the URLs the hosted service rejected, with its error', () => {
    expect(convertLegacyTheme(`${HOSTED}?primary=nothex`)).toEqual({
      status: 'invalid',
      message: 'Invalid param for the primary hue: nothex',
    })
    expect(convertLegacyTheme(`${HOSTED}?lightest=nothex`)).toEqual({
      status: 'invalid',
      message: 'Invalid color: #nothex',
    })
    expect(convertLegacyTheme(`${HOSTED}?primary=2276fc;2276fc`)).toMatchObject({
      status: 'invalid',
      message: expect.stringContaining('Duplicate params'),
    })
    // A template literal interpolation is not a color
    expect(convertLegacyTheme(`\`${HOSTED}?primary=\${brand}\``)).toMatchObject({status: 'invalid'})
  })

  it('converts into options that build a theme', () => {
    for (const hosted of hostedPresets) {
      expect(
        () => buildTheme(optionsOf(`${HOSTED}?${hosted.searchParams}`)),
        hosted.slug,
      ).not.toThrow()
    }
  })
})
