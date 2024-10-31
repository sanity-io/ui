import {composeClassNames} from '../../composeClassNames'

export function menu(): string | undefined {
  return composeClassNames('menu')
}

export function menuDivider(): string | undefined {
  return composeClassNames('menu-divider')
}
