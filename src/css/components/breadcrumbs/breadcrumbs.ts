import {_composeClassNames} from '../../_composeClassNames'
import {root} from './breadcrumbs.css'

/** @public */
export function breadcrumbs(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, root)
}
