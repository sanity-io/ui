import {_compileStyle} from './_compileStyle'
import {properties} from './theme'

/** @internal */
export function _compileTheme(): string {
  return _compileStyle({
    layers: {
      theme: {
        ':root': properties,
      },
    },
  })
}
