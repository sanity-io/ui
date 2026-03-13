import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {KBD} from './Kbd'

describe('primitives/kbd', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<KBD>⌘</KBD>, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<KBD>⌘</KBD>, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render text', () => {
    const {container} = render(<KBD>Shift</KBD>)
    const view = within(container)

    expect(view.getByText('Shift')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<KBD data-testid="kbd">K</KBD>)
    const view = within(container)

    expect(view.getByTestId('kbd')).toHaveAttribute('data-ui', 'KBD')
  })

  it('should render as a kbd element by default', () => {
    const {container} = render(<KBD data-testid="kbd">Enter</KBD>)
    const view = within(container)

    expect(view.getByTestId('kbd').tagName).toBe('KBD')
  })
})
