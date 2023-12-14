import {parseTokenValue} from './parseTokenValue'

test('parse color value', () => {
  expect(parseTokenValue('cyan')).toEqual({
    type: 'hue',
    value: 'cyan',
  })

  expect(parseTokenValue('50')).toEqual({
    type: 'color',
    tint: '50',
  })

  expect(parseTokenValue('50 50%')).toEqual({
    type: 'color',
    tint: '50',
    mix: 0.5,
  })

  expect(parseTokenValue('cyan/500')).toEqual({
    type: 'color',
    hue: 'cyan',
    tint: '500',
  })

  expect(parseTokenValue('cyan/500 50%')).toEqual({
    type: 'color',
    hue: 'cyan',
    mix: 0.5,
    tint: '500',
  })

  expect(parseTokenValue('screen')).toEqual({
    type: 'blendMode',
    value: 'screen',
  })

  expect(parseTokenValue('multiply')).toEqual({
    type: 'blendMode',
    value: 'multiply',
  })
})
