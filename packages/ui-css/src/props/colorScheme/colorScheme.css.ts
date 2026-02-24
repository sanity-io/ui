import {_style} from '../../_style.css'
import {_layers} from '../../layers.css'

export const schemes = {
  light: _style(_layers.prop, {colorScheme: 'light'}, 'light'),
  dark: _style(_layers.prop, {colorScheme: 'dark'}, 'dark'),
}
