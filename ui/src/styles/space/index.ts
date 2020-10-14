import {ThemeProps} from '../types'
import {margin, MarginProps} from './margin'
import {padding, PaddingProps} from './padding'

export function space(props: MarginProps & PaddingProps & ThemeProps) {
  return [margin(props), padding(props)]
}

export {margin, padding}
