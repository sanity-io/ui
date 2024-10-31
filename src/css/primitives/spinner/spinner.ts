import {_scopeClassNames} from '../../_scopeClassNames'

/** @public */
export function spinner(): string | undefined {
  return _scopeClassNames('spinner')
}

/** @public */
export function animatedSpinnerIcon(): string | undefined {
  return _scopeClassNames('animated-spinner-icon')
}
