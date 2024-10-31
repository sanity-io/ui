import {_comp} from '../../_comp'
import {inset} from '../../aspects'

/** @public */
export function dialog(): string | undefined {
  return _comp('dialog', inset({inset: 0}))
}

/** @public */
export function dialogContainer(): string | undefined {
  return _comp('dialog-container')
}

/** @public */
export function dialogCardRoot(): string | undefined {
  return _comp('dialog-card-root')
}

/** @public */
export function dialogLayout(): string | undefined {
  return _comp('dialog-layout')
}

/** @public */
export function dialogHeader(): string | undefined {
  return _comp('dialog-header')
}

/** @public */
export function dialogContent(): string | undefined {
  return _comp('dialog-content')
}

/** @public */
export function dialogFooter(): string | undefined {
  return _comp('dialog-footer')
}
