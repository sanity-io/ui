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

  expect(parseTokenKey('button/*/default/_blend')).toEqual({
    type: 'button',
    tone: '*',
    mode: 'default',
    key: '_blend',
  })
})
