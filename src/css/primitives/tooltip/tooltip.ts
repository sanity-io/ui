import {composeClassNames} from '../../composeClassNames'

export function tooltip(): string | undefined {
  return composeClassNames('tooltip')
}

export function tooltipCard(): string | undefined {
  return composeClassNames('tooltip-card')
}
