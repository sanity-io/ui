import {_composeClassNames} from '../../_composeClassNames'
import {themeClassName} from '../../defaultTheme.css'
import {height} from '../../props/height/height'
import {card} from '../card/card'
import {_root} from './root.css'
import type {RootStyleProps} from './types'

/** @public */
export function root(props: RootStyleProps) {
  return _composeClassNames(
    props.className,
    themeClassName,
    _root,
    card({scheme: props.scheme ?? 'light', tone: props.tone ?? 'default'}),
    height(props),
  )
}
