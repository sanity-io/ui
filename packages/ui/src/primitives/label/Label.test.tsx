import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Label} from './Label'

describe('primitives/label', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<Label size={1}>Field label</Label>, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Label size={1}>Field label</Label>, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render text', () => {
    const {container} = render(<Label>Label text</Label>)
    const view = within(container)

    expect(view.getByText('Label text')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Label data-testid="label">Field</Label>)
    const view = within(container)

    expect(view.getByTestId('label')).toHaveAttribute('data-ui', 'Label')
  })

  it('should render as a custom element', () => {
    const {container} = render(
      <Label as="label" data-testid="label">
        Form label
      </Label>,
    )
    const view = within(container)

    expect(view.getByTestId('label').tagName).toBe('LABEL')
  })

  it('should support textOverflow', () => {
    const {container} = render(
      <Label textOverflow="ellipsis" data-testid="label">
        Long label text that overflows
      </Label>,
    )
    const view = within(container)

    expect(view.getByText('Long label text that overflows')).toBeInTheDocument()
  })
})
