import {describe, expect, it} from 'vitest'

import {getProps} from './getProps'
import {layoutProps} from '../props/layout'

describe('getProps', () => {
  it('generates className based on an union', () => {
    const result = getProps({padding: 1}, layoutProps)
    expect(result.className).toBe('sui-padding-1')
    expect(result.style).toEqual({})
  })

  it('does not generate className based on union if value is unsupported', () => {
    const result = getProps({padding: 10}, layoutProps)
    expect(result.className).toBe('')
    expect(result.style).toEqual({})
  })

  it('merges existing className', () => {
    const result = getProps({className: 'test', padding: 1}, layoutProps)
    expect(result.className).toBe('test sui-padding-1')
    expect(result.style).toEqual({})
  })

  it('generates className and style based on a string', () => {
    const result = getProps({width: '100px'}, layoutProps)
    expect(result.className).toBe('sui-width')
    expect(result.style).toEqual({'--width': '100px'})
  })

  it('merges existing style', () => {
    const result = getProps({width: '100px', style: { display: 'block' }}, layoutProps)
    expect(result.className).toBe('sui-width')
    expect(result.style).toEqual({'--width': '100px', display: 'block' })
  })

  it('generates className based on a boolean', () => {
    const result = getProps({border: true}, layoutProps)
    expect(result.className).toBe('sui-border')
    expect(result.style).toEqual({})
  })

  it('generates className based on a number', () => {
    const result = getProps({flexGrow: 1.5}, layoutProps)
    expect(result.className).toBe('sui-flex-grow')
    expect(result.style).toEqual({'--flex-grow': 1.5})
  })

  it('generates multiple classNames', () => {
    const result = getProps({border: true, padding: 1}, layoutProps)
    expect(result.className).toBe('sui-border sui-padding-1')
    expect(result.style).toEqual({})
  })

  it('preserves non-styling props', () => {
    const result = getProps({padding: 1, as: 'div'}, layoutProps)
    expect(result.className).toBe('sui-padding-1')
    expect(result.style).toEqual({})
    expect(result.as).toEqual('div')
  })

  it('generates responsive className based on unions', () => {
    const result = getProps({padding: [1, 2, 3]}, layoutProps)
    expect(result.className).toBe('sui-padding-1 sui-padding-2-bp-1 sui-padding-3-bp-2')
    expect(result.style).toEqual({})
  })

  it('generates responsive className and style based on strings', () => {
    const result = getProps({width: ['100px', '200px', '300px']}, layoutProps)
    expect(result.className).toBe('sui-width sui-width-bp-1 sui-width-bp-2')
    expect(result.style).toEqual({'--width': '100px', '--width-bp-1': '200px', '--width-bp-2': '300px'})
  })

  it('generates responsive className based on booleans', () => {
    const result = getProps({border: [true, false, true]}, layoutProps)
    expect(result.className).toBe('sui-border sui-border-none-bp-1 sui-border-bp-2')
    expect(result.style).toEqual({})
  })

  it('does not generate responsive className with more values than breakpoints', () => {
    const result = getProps({padding: [1, 2, 3, 4, 5, 6, 7, 8]}, layoutProps)
    expect(result.className).toBe('sui-padding-1 sui-padding-2-bp-1 sui-padding-3-bp-2 sui-padding-4-bp-3 sui-padding-5-bp-4 sui-padding-6-bp-5 sui-padding-7-bp-6')
    expect(result.style).toEqual({})
  })

  it('generates responsive className with undefined values', () => {
    const result = getProps({padding: [1, 2, undefined, 3]}, layoutProps)
    expect(result.className).toBe('sui-padding-1 sui-padding-2-bp-1 sui-padding-3-bp-3')
    expect(result.style).toEqual({})
  })

  it('generates responsive className without unsupported values', () => {
    const result = getProps({padding: [1, 2, 10, 3]}, layoutProps)
    expect(result.className).toBe('sui-padding-1 sui-padding-2-bp-1 sui-padding-3-bp-3')
    expect(result.style).toEqual({})
  })
})
