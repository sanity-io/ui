import {describe, expect, it} from 'vitest'

import {decodeTheme, encodeTheme, SharedTheme} from './share'

const full: SharedTheme = {
  title: 'Verdant ✨',
  options: {
    light: {accent: '#1cb485', text: '#5c9199', background: '#fcfdfd', contrast: 70},
    dark: {accent: '#22fca8', text: '#a7c3c9', background: '#0d1415', contrast: 100},
  },
}

describe('theme codes', () => {
  it('round-trips a theme', () => {
    const code = encodeTheme(full)

    expect(code).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(decodeTheme(code)).toEqual(full)
  })

  it('stays short: about 30 bytes for every color and contrast, plus the title', () => {
    expect(encodeTheme(full).length).toBeLessThanOrEqual(44)
    expect(encodeTheme({title: 'Dew', options: {light: {accent: '#f00'}}})).toHaveLength(11)
  })

  it('only carries the fields that are set, in either scheme', () => {
    const sparse: SharedTheme = {
      title: 'Sparse',
      options: {dark: {background: '#000', contrast: 40}},
    }

    expect(decodeTheme(encodeTheme(sparse))).toEqual({
      title: 'Sparse',
      options: {dark: {background: '#000000', contrast: 40}},
    })
    expect(decodeTheme(encodeTheme({title: 'Bare', options: {}}))).toEqual({
      title: 'Bare',
      options: {},
    })
  })

  it('expands short hex colors, rounds and clamps the contrast, and titles the untitled', () => {
    const theme = decodeTheme(
      encodeTheme({
        title: '   ',
        options: {light: {accent: '#ABC', contrast: 200.4}, dark: {contrast: 2}},
      }),
    )

    expect(theme).toEqual({
      title: 'Untitled theme',
      options: {light: {accent: '#aabbcc', contrast: 100}, dark: {contrast: 15}},
    })
  })

  it('finds the code in a pasted message', () => {
    const code = encodeTheme(full)

    expect(decodeTheme(`  here is my theme:\n${code}\nenjoy!`)).toEqual(full)
    expect(decodeTheme(`https://example.com/${code}`)).toBeNull()
  })

  it('rejects what is not a code', () => {
    for (const text of ['', 'hello', 'AQ', '{"title":"json"}', 'AQ8=', `${encodeTheme(full)}!`]) {
      expect(decodeTheme(text)).toBeNull()
    }

    // A code whose flags promise more bytes than it has
    expect(decodeTheme('Af8')).toBeNull()
  })
})
