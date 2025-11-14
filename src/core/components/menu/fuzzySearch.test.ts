import {describe, expect, it} from 'vitest'

import {fuzzyFilter, fuzzyScore} from './fuzzySearch'

describe('fuzzyScore', () => {
  it('should return Infinity for empty query', () => {
    expect(fuzzyScore('hello', '')).toBe(Infinity)
  })

  it('should return high score for exact match', () => {
    const score = fuzzyScore('hello', 'hello')
    expect(score).toBe(1000)
  })

  it('should return high score for starts-with match', () => {
    const score = fuzzyScore('hello world', 'hello')
    expect(score).toBe(500)
  })

  it('should score consecutive matches higher than non-consecutive', () => {
    const consecutiveScore = fuzzyScore('hello', 'hel')
    const nonConsecutiveScore = fuzzyScore('hxexl', 'hel')
    expect(consecutiveScore).toBeGreaterThan(nonConsecutiveScore)
  })

  it('should return -1 for no match', () => {
    expect(fuzzyScore('hello', 'xyz')).toBe(-1)
  })

  it('should be case insensitive', () => {
    const score1 = fuzzyScore('Hello', 'hello')
    const score2 = fuzzyScore('HELLO', 'hello')
    expect(score1).toBe(score2)
  })

  it('should match characters in order', () => {
    expect(fuzzyScore('hello', 'hlo')).toBeGreaterThan(0)
    expect(fuzzyScore('hello', 'hlx')).toBe(-1)
  })

  it('should score based on consecutive matches', () => {
    const perfectMatch = fuzzyScore('edit', 'edit')
    const startsWithMatch = fuzzyScore('edit document', 'edit')
    const partialMatch = fuzzyScore('document edit', 'edit')

    expect(perfectMatch).toBeGreaterThan(startsWithMatch)
    expect(startsWithMatch).toBeGreaterThan(partialMatch)
  })
})

describe('fuzzyFilter', () => {
  const items = [
    {id: 1, name: 'Create document'},
    {id: 2, name: 'Edit'},
    {id: 3, name: 'Duplicate'},
    {id: 4, name: 'Delete'},
    {id: 5, name: 'Copy link'},
  ]

  it('should return all items for empty query', () => {
    const result = fuzzyFilter(items, '', (item) => item.name)
    expect(result).toEqual(items)
  })

  it('should filter items based on query', () => {
    const result = fuzzyFilter(items, 'edit', (item) => item.name)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Edit')
  })

  it('should match partial strings', () => {
    const result = fuzzyFilter(items, 'doc', (item) => item.name)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Create document')
  })

  it('should match fuzzy patterns', () => {
    const result = fuzzyFilter(items, 'cpln', (item) => item.name)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Copy link')
  })

  it('should sort by relevance', () => {
    const result = fuzzyFilter(items, 'de', (item) => item.name)
    expect(result.length).toBeGreaterThan(0)
    // 'Delete' should rank higher than 'Create document' for 'de' query
    const deleteIndex = result.findIndex((item) => item.name === 'Delete')
    const documentIndex = result.findIndex((item) => item.name === 'Create document')
    expect(deleteIndex).toBeLessThan(documentIndex)
  })

  it('should be case insensitive', () => {
    const result = fuzzyFilter(items, 'EDIT', (item) => item.name)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Edit')
  })

  it('should return empty array for no matches', () => {
    const result = fuzzyFilter(items, 'xyz', (item) => item.name)
    expect(result).toEqual([])
  })

  it('should handle whitespace in query', () => {
    const result = fuzzyFilter(items, '  edit  ', (item) => item.name)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Edit')
  })
})
