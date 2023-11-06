import {mix} from './mix'

test('mix 1', () => {
  const result = mix('#222222', {
    black: '#222222',
    white: '#ffffff',
    blendMode: 'multiply',
    scheme: 'light',
  })

  expect(result).toBe('#222222')
})

test.only('mix 2', () => {
  const result = mix('#ffffff', {
    black: '#222222',
    white: '#ffffff',
    blendMode: 'multiply',
    scheme: 'light',
  })

  expect(result).toBe('#ffffff')
})
