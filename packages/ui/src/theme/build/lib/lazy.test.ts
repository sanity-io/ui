import {describe, expect, it, vi} from 'vitest'

import {defineLazyProperty} from './lazy'

interface Subject {
  value: string
}

describe('defineLazyProperty', () => {
  it('computes the value once and replaces the getter', () => {
    const subject = {} as Subject
    const factory = vi.fn(() => 'computed')

    defineLazyProperty(subject, 'value', factory)

    expect(subject.value).toBe('computed')
    expect(subject.value).toBe('computed')
    expect(factory).toHaveBeenCalledOnce()
    expect(Object.getOwnPropertyDescriptor(subject, 'value')).toEqual({
      configurable: false,
      enumerable: true,
      value: 'computed',
      writable: false,
    })
  })

  it('is enumerable before and after evaluation', () => {
    const subject = {} as Subject

    defineLazyProperty(subject, 'value', () => 'computed')

    expect(Object.keys(subject)).toEqual(['value'])
    expect({...subject}).toEqual({value: 'computed'})
    expect(Object.keys(subject)).toEqual(['value'])
  })

  it('retries evaluation after the factory throws', () => {
    const subject = {} as Subject
    const factory = vi.fn<() => string>()
    factory.mockImplementationOnce(() => {
      throw new Error('not ready')
    })
    factory.mockReturnValue('computed')

    defineLazyProperty(subject, 'value', factory)

    expect(() => subject.value).toThrow('not ready')
    expect(subject.value).toBe('computed')
    expect(factory).toHaveBeenCalledTimes(2)
  })
})
