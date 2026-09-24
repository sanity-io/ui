import {describe, expect, it} from 'vitest'

import {meetsNode, meetsReact, parseVersion} from './versions.js'

describe('parseVersion', () => {
  it('parses full and partial versions', () => {
    expect(parseVersion('19.2.6')).toEqual([19, 2, 6])
    expect(parseVersion('19.2')).toEqual([19, 2, 0])
    expect(parseVersion('^19.2.0')).toEqual([19, 2, 0])
    expect(parseVersion('not-a-version')).toBeNull()
  })
})

describe('meetsReact', () => {
  it('requires >= 19.2', () => {
    expect(meetsReact('19.2.0')).toBe(true)
    expect(meetsReact('19.2.6')).toBe(true)
    expect(meetsReact('20.0.0')).toBe(true)
    expect(meetsReact('19.1.9')).toBe(false)
    expect(meetsReact('18.3.1')).toBe(false)
  })
})

describe('meetsNode', () => {
  it('implements >=20.19 <22 || >=22.12', () => {
    expect(meetsNode('20.19.0')).toBe(true)
    expect(meetsNode('21.7.0')).toBe(true)
    expect(meetsNode('22.12.0')).toBe(true)
    expect(meetsNode('24.0.0')).toBe(true)
    expect(meetsNode('20.18.0')).toBe(false)
    expect(meetsNode('22.0.0')).toBe(false)
    expect(meetsNode('22.11.9')).toBe(false)
    expect(meetsNode('18.20.0')).toBe(false)
  })
})
