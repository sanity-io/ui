import {describe, expect, it} from 'vitest'

import {mix} from './mix'

describe('mix', () => {
  it('matches the polished mix implementation', () => {
    // Expected values generated with `mix` from polished@4.3.1, which the
    // hosted Themer service used
    expect(mix(0.5, '#1cb485', '#fcfdfd')).toBe('#8cd8c1')
    expect(mix(0, '#1cb485', '#fcfdfd')).toBe('#fcfdfd')
    expect(mix(0.1, '#1cb485', '#fcfdfd')).toBe('#e5f5f1')
    expect(mix(0.9, '#101112', '#8690a0')).toBe('#1b1d20')
    expect(mix(0.5, '#ffffff', '#ffffff')).toBe('#fff')
    expect(mix(1, '#F03E2F', '#fff')).toBe('#f03e2f')
    expect(mix(0.955, '#101112', '#8690a0')).toBe('#151618')
  })
})
