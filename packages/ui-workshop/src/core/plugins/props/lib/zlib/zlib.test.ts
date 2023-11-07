import {describe, expect, it} from 'vitest'
import {decode, encode} from './zlib'

/**
 * @vitest-environment jsdom
 */
describe('zlib', () => {
  it('should encode and decode a simple string', () => {
    const encoded = encode('test')
    const decoded = decode(encoded)

    expect(decoded).toBe('test')
  })

  it('should encode and decode JSX code', () => {
    const code = '<Box>\n  <Text>Hello, world</Text>\n</Box>\n'
    const encoded = encode(code)
    const decoded = decode(encoded)

    expect(decoded).toBe(code)
  })
})
