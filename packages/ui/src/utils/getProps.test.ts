import {describe, expect, it} from 'vitest'

import {cardProps} from '../components/card/card.props'
import {layoutProps} from '../props/layout'
import {typographyProps} from '../props/typography'
import {getProps} from './getProps'

describe('getProps', () => {
  it('generates className based on an union', () => {
    const result = getProps({padding: 1}, layoutProps)
    expect(result.className).toBe('sui-p1')
    expect(result.style).toEqual({})
  })

  it('does not generate className based on union if value is unsupported', () => {
    const result = getProps({padding: 10}, layoutProps)
    expect(result.className).toBe('')
    expect(result.style).toEqual({})
  })

  it('merges existing className', () => {
    const result = getProps({className: 'test', padding: 1}, layoutProps)
    expect(result.className).toBe('test sui-p1')
    expect(result.style).toEqual({})
  })

  it('generates className and style based on a string', () => {
    const result = getProps({width: '100px'}, layoutProps)
    expect(result.className).toBe('sui-width')
    expect(result.style).toEqual({'--width': '100px'})
  })

  it('merges existing style', () => {
    const result = getProps({width: '100px', style: {display: 'block'}}, layoutProps)
    expect(result.className).toBe('sui-width')
    expect(result.style).toEqual({'--width': '100px', 'display': 'block'})
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

  it('generates className based on a composite', () => {
    const result = getProps({density: 'regular'}, cardProps)
    expect(result.className).toBe('sui-gap3 sui-p4 sui-radius3')
    expect(result.style).toEqual({})
  })

  it('generates multiple classNames', () => {
    const result = getProps({border: true, padding: 1}, layoutProps)
    expect(result.className).toBe('sui-border sui-p1')
    expect(result.style).toEqual({})
  })

  it('preserves undefined props', () => {
    const result = getProps({padding: 1, id: 'test'}, layoutProps)
    expect(result.className).toBe('sui-p1')
    expect(result['id']).toEqual('test')
  })

  it('preserves non-styling props', () => {
    const result = getProps({padding: 1, as: 'div'}, layoutProps)
    expect(result.className).toBe('sui-p1')
    expect(result.style).toEqual({})
    expect(result['as']).toEqual('div')
  })

  it('preserves non-styling responsive props', () => {
    const result = getProps({padding: 1, items: [{label: 'One'}, {label: 'Two'}]}, layoutProps)
    expect(result.className).toBe('sui-p1')
    expect(result.style).toEqual({})
    expect(result['items']).toEqual([{label: 'One'}, {label: 'Two'}])
  })

  it('generates responsive className based on unions', () => {
    const result = getProps({padding: [1, 2, 3]}, layoutProps)
    expect(result.className).toBe('sui-p1 sui-p2-bp-1 sui-p3-bp-2')
    expect(result.style).toEqual({})
  })

  it('generates responsive className and style based on strings', () => {
    const result = getProps({width: ['100px', '200px', '300px']}, layoutProps)
    expect(result.className).toBe('sui-width sui-width-bp-1 sui-width-bp-2')
    expect(result.style).toEqual({
      '--width': '100px',
      '--width-bp-1': '200px',
      '--width-bp-2': '300px',
    })
  })

  it('generates responsive className based on booleans', () => {
    const result = getProps({border: [true, false, true]}, layoutProps)
    expect(result.className).toBe('sui-border sui-border-none-bp-1 sui-border-bp-2')
    expect(result.style).toEqual({})
  })

  it('generates responsive className based on composites', () => {
    const result = getProps({density: ['compact', 'regular']}, cardProps)
    expect(result.className).toBe(
      'sui-gap2 sui-gap3-bp-1 sui-p3 sui-p4-bp-1 sui-radius2 sui-radius3-bp-1',
    )
    expect(result.style).toEqual({})
  })

  it('does not generate responsive className with more values than breakpoints', () => {
    const result = getProps({padding: [1, 2, 3, 4, 5, 6, 7, 8]}, layoutProps)
    expect(result.className).toBe(
      'sui-p1 sui-p2-bp-1 sui-p3-bp-2 sui-p4-bp-3 sui-p5-bp-4 sui-p6-bp-5',
    )
    expect(result.style).toEqual({})
  })

  it('generates responsive className with undefined values', () => {
    const result = getProps({padding: [1, 2, undefined, 3]}, layoutProps)
    expect(result.className).toBe('sui-p1 sui-p2-bp-1 sui-p3-bp-3')
    expect(result.style).toEqual({})
  })

  it('generates responsive className with null values', () => {
    const result = getProps({padding: [1, 2, null, 3]}, layoutProps)
    expect(result.className).toBe('sui-p1 sui-p2-bp-1 sui-p3-bp-3')
    expect(result.style).toEqual({})
  })

  it('generates responsive className without unsupported values', () => {
    const result = getProps({padding: [1, 2, 10, 3]}, layoutProps)
    expect(result.className).toBe('sui-p1 sui-p2-bp-1 sui-p3-bp-3')
    expect(result.style).toEqual({})
  })

  it('generates className based on a conditional', () => {
    const result = getProps({truncate: 1}, typographyProps)
    expect(result.className).toBe('sui-text-overflow')
    expect(result.style).toEqual({})
  })

  it('generates className and style based on a conditional', () => {
    const result = getProps({truncate: 3}, typographyProps)
    expect(result.className).toBe('sui-line-clamp')
    expect(result.style).toEqual({'--line-clamp': 3})
  })

  it('generates responsive className and style based on a conditional', () => {
    const result = getProps({truncate: [1, 3]}, typographyProps)
    expect(result.className).toBe('sui-text-overflow sui-line-clamp-bp-1')
    expect(result.style).toEqual({'--line-clamp-bp-1': 3})
  })
})
