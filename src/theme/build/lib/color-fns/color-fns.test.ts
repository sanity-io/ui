/** @jest-environment jsdom */

import {multiply, screen} from './blend'
import {hexToRgb, rgbToHex} from './convert'
import {parseColor} from './parse'
import {rgba} from './rgba'

const hues = {
  gray: {
    600: '#6e7683',
  },
  blue: {
    500: '#2276fc',
  },
}

describe('color-fns', () => {
  describe('hexToRgb', () => {
    it('should convert hex to RGB', () => {
      const hex = '#ff0000'
      const rgb = hexToRgb(hex)

      expect(rgbToHex(rgb)).toEqual('#ff0000')
    })
  })

  describe('screen', () => {
    it('should blend color using the "screen" mode', () => {
      const backdrop = hexToRgb(hues.blue[500])
      const source = hexToRgb(hues.gray[600])
      const rgb = screen(backdrop, source)

      expect(rgbToHex(rgb)).toEqual('#81b5fe')
    })
  })

  describe('multiply', () => {
    it('should blend color using the "multiply" mode', () => {
      const backdrop = hexToRgb(hues.blue[500])
      const source = hexToRgb(hues.gray[600])
      const rgb = multiply(backdrop, source)

      expect(rgbToHex(rgb)).toEqual('#0f3781')
    })
  })

  describe('parseColor', () => {
    it('should parse a hex to RGB', () => {
      const rgb = parseColor('#ccc')

      expect(rgbToHex(rgb)).toEqual('#cccccc')
    })

    it('should parse a HSL to RGB', () => {
      const rgb1 = parseColor('hsl(210, 20%, 50%)')
      const rgb2 = parseColor('hsl(210, 10%, 0%)')

      expect(rgbToHex(rgb1)).toEqual('#668099')
      expect(rgbToHex(rgb2)).toEqual('#000000')
    })
  })

  describe('helpers/rgba', () => {
    it('should convert hex to RGBA string', () => {
      expect(rgba('#f00', 0.5)).toBe(`rgba(255,0,0,0.5)`)
    })
  })
})
