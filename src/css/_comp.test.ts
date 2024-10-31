import {_comp} from './_comp'

it('should compose class names', () => {
  const result = _comp('foo', 'bar baz', undefined, false)

  expect(result).toBe('s-foo s-bar s-baz')
})
