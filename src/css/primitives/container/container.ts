import {_composeClassNames} from '../../_composeClassNames'
import {margin} from '../../props/margin/margin'
import {maxWidth} from '../../props/maxWidth/maxWidth'
import {width} from '../../props/width/width'
import {root} from './container.css'
import type {ContainerStyleProps} from './types'

/** @public */
export function container(props: ContainerStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    margin({marginX: 'auto'}),
    maxWidth({maxWidth: props.width}),
    width({width: 'fill'}),
  )
}
