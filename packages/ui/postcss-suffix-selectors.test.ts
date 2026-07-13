import type {Rule} from 'postcss'
import {describe, expect, it} from 'vitest'

import {suffixSelectors} from './postcss-suffix-selectors'

const SUFFIX = '001'
const COMPONENT_PATH = 'ui/src/components/test.css'
const OTHER_PATH = ''

function transform(selector: string, filePath = COMPONENT_PATH, rule: Rule = {} as Rule) {
  return suffixSelectors(SUFFIX, selector, `${SUFFIX} ${selector}`, filePath, rule)
}

describe('suffixSelectors', () => {
  it('adds a version suffix to component selectors', () => {
    expect(transform('.sui-Checkbox')).toBe('.sui-Checkbox-001')
  })

  it('adds version suffixes to compound component selector', () => {
    expect(transform('.sui-Checkbox:hover .sui-CheckboxMark')).toBe(
      '.sui-Checkbox-001:hover .sui-CheckboxMark-001',
    )
  })

  it('does not suffix utility classes', () => {
    expect(transform('.sui-p1')).toBe('.sui-p1')
  })

  it('does not suffix selectors outside component files', () => {
    expect(transform('.sui-Checkbox', OTHER_PATH)).toBe('.sui-Checkbox')
  })

  it('does not double-suffix already versioned classes', () => {
    expect(transform('.sui-Checkbox-001')).toBe('.sui-Checkbox-001')
  })
})
