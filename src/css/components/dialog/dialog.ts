import {_comp} from '../../_comp'
import {inset} from '../../aspects'

export function dialog(): string | undefined {
  return _comp('dialog', inset({inset: 0}))
}

export function dialogContainer(): string | undefined {
  return _comp('dialog-container')
}

export function dialogCardRoot(): string | undefined {
  return _comp('dialog-card-root')
}

export function dialogLayout(): string | undefined {
  return _comp('dialog-layout')
}

export function dialogHeader(): string | undefined {
  return _comp('dialog-header')
}

export function dialogContent(): string | undefined {
  return _comp('dialog-content')
}

export function dialogFooter(): string | undefined {
  return _comp('dialog-footer')
}
