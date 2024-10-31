import {composeClassNames} from '../../composeClassNames'

export function dialog(): string | undefined {
  return composeClassNames('dialog')
}

export function dialogContainer(): string | undefined {
  return composeClassNames('dialog-container')
}

export function dialogCardRoot(): string | undefined {
  return composeClassNames('dialog-card-root')
}

export function dialogLayout(): string | undefined {
  return composeClassNames('dialog-layout')
}

export function dialogHeader(): string | undefined {
  return composeClassNames('dialog-header')
}

export function dialogContent(): string | undefined {
  return composeClassNames('dialog-content')
}

export function dialogFooter(): string | undefined {
  return composeClassNames('dialog-footer')
}
