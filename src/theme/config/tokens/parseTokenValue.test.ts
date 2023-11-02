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

  expect(parseTokenValue('cyan/500')).toEqual({
    type: 'color',
    key: 'cyan/500',
    hue: 'cyan',
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

  expect(parseTokenValue('0')).toEqual({
    type: 'color',
    opacity: 0,
  })

  expect(parseTokenValue('0.1')).toEqual({
    type: 'color',
    opacity: 0.1,
  })

  expect(parseTokenValue('1')).toEqual({
    type: 'color',
    opacity: 1,
  })
})
