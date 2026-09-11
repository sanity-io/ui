import {describe, expect, it} from 'vitest'

import {merge} from './merge'

describe('merge', () => {
  it('returns an empty record when no records are provided', () => {
    expect(merge()).toEqual({})
    expect(merge(undefined, undefined)).toEqual({})
  })

  it('recursively merges nested records', () => {
    const result = merge(
      {
        color: {
          background: '#fff',
          foreground: '#111',
        },
        radius: 2,
      },
      {
        color: {
          foreground: '#222',
          muted: '#777',
        },
        space: 3,
      },
    )

    expect(result).toEqual({
      color: {
        background: '#fff',
        foreground: '#222',
        muted: '#777',
      },
      radius: 2,
      space: 3,
    })
  })

  it('replaces arrays and scalars instead of merging them', () => {
    const result = merge(
      {
        media: [320, 640],
        nested: {value: 'initial'},
      },
      {
        media: [960],
        nested: 'replacement',
      },
    )

    expect(result).toEqual({
      media: [960],
      nested: 'replacement',
    })
  })

  it('uses the last defined value, including null and false', () => {
    expect(
      merge({enabled: true, optional: 'value'}, undefined, {enabled: false, optional: null}),
    ).toEqual({
      enabled: false,
      optional: null,
    })
  })
})
