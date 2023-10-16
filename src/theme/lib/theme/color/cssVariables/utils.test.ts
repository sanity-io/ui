import {cssObjectToCssString} from './utils'

describe('cssObjectToCssString', () => {
  it('should transform css variables object to a style declaration type string', () => {
    const cssObject = {
      '--default-text-primary': '#007bff',
      '--default-text-secondary': '#6c757d',
      '--default-text-inactive': '#28a745',
    }

    const expectedCssString = `--default-text-primary: #007bff; --default-text-secondary: #6c757d; --default-text-inactive: #28a745; `

    expect(cssObjectToCssString(cssObject)).toEqual(expectedCssString)
  })
})
