import {renderColor, RenderColorContext} from './renderColor'

it('should render color', () => {
  const context: RenderColorContext = {
    bgVar: '--bg',
    hue: 'gray',
    scheme: 'light',
  }

  expect(renderColor(['500/0.2', '500/0.2'], context)).toBe(
    `color-mix(in srgb, transparent, var(--gray-500) 20%)`,
  )

  expect(renderColor(['500', '500'], context)).toBe(`var(--gray-500)`)

  expect(renderColor(['50 20%', '50 20%'], context)).toBe(
    `color-mix(in srgb, var(--bg), var(--gray-50) 20%)`,
  )
})
