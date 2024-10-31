import {_composeClassNames} from '../../_composeClassNames'
import {_scopeClassNames} from '../../_scopeClassNames'
import {inset} from '../../aspects'

/** @public */
export function dialog(): string | undefined {
  return _composeClassNames(_scopeClassNames('dialog'), inset({inset: 0}))
}

/** @public */
export function dialogContainer(): string | undefined {
  return _scopeClassNames('dialog-container')
}

/** @public */
export function dialogCardRoot(): string | undefined {
  return _scopeClassNames('dialog-card-root')
}

/** @public */
export function dialogLayout(): string | undefined {
  return _scopeClassNames('dialog-layout')
}

/** @public */
export function dialogHeader(): string | undefined {
  return _scopeClassNames('dialog-header')
}

/** @public */
export function dialogContent(): string | undefined {
  return _scopeClassNames('dialog-content')
}

/** @public */
export function dialogFooter(): string | undefined {
  return _scopeClassNames('dialog-footer')
}
