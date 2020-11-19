import {ThemeColorScheme} from '@sanity/ui'
import {avatar} from './avatar'
import {badge} from './badge'
import {button} from './button'
import {card} from './card'
import {input} from './input'
import {_switch} from './switch'
import {syntax} from './syntax'

const themeColor: ThemeColorScheme = {
  avatar,
  badge,
  button,
  card,
  input,
  syntax,
  // @todo: replace with input
  switch: _switch,
}

export default themeColor
