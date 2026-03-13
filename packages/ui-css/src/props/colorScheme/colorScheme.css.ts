import {_layers} from '../../layers.css'
import {_style} from '../../lib/css/_style.css'

export const schemes = {
  light: _style(_layers.prop, {colorScheme: 'light'}, 'light'),
  dark: _style(_layers.prop, {colorScheme: 'dark'}, 'dark'),
}
