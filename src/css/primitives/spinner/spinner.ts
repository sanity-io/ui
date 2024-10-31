import {composeClassNames} from '../../composeClassNames'

export function spinner(): string | undefined {
  return composeClassNames('spinner')
}

export function animatedSpinnerIcon(): string | undefined {
  return composeClassNames('animated-spinner-icon')
}
