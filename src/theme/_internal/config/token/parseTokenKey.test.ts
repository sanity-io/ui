import {parseTokenKey} from './parseTokenKey'

test('parse token key', () => {
  expect(parseTokenKey('*/_blend')).toEqual({
    type: 'base',
    tone: '*',
    key: '_blend',
  })

  expect(parseTokenKey('*/_hue')).toEqual({
    type: 'base',
    tone: '*',
    key: '_hue',
  })

  expect(parseTokenKey('primary/_hue')).toEqual({
    type: 'base',
    tone: 'primary',
    key: '_hue',
  })

  // ['primary/_hue', 'purple'],
  // ['positive/_hue', 'cyan'],
  // ['caution/_hue', 'yellow'],
  // ['critical/_hue', 'red'],

  expect(parseTokenKey('*/bg')).toEqual({
    type: 'base',
    tone: '*',
    key: 'bg',
  })

  expect(parseTokenKey('*/focusRing')).toEqual({
    type: 'base',
    tone: '*',
    key: 'focusRing',
  })

  expect(parseTokenKey('*/muted/fg')).toEqual({
    type: 'base',
    tone: '*',
    key: 'muted/fg',
  })

  expect(parseTokenKey('*/link/fg')).toEqual({
    type: 'base',
    tone: '*',
    key: 'link/fg',
  })

  expect(parseTokenKey('*/code/fg')).toEqual({
    type: 'base',
    tone: '*',
    key: 'code/fg',
  })

  expect(parseTokenKey('default/_blend')).toEqual({
    type: 'base',
    tone: 'default',
    key: '_blend',
  })

  // ['default/bg', 'white', '900'],
  // ['default/fg', 'black', '100'],

  expect(parseTokenKey('button/*/default/_blend')).toEqual({
    type: 'button',
    tone: '*',
    mode: 'default',
    key: '_blend',
  })
})
