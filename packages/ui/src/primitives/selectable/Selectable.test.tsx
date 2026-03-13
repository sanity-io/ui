import {within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {describe, expect, it, vi} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Selectable} from './Selectable'

describe('primitives/selectable', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<Selectable>Option</Selectable>, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Selectable>Option</Selectable>, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render children', () => {
    const {container} = render(<Selectable>Option text</Selectable>)
    const view = within(container)

    expect(view.getByText('Option text')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Selectable data-testid="selectable">Option</Selectable>)
    const view = within(container)

    expect(view.getByTestId('selectable')).toHaveAttribute('data-ui', 'Selectable')
  })

  it('should render as a button by default', () => {
    const {container} = render(<Selectable data-testid="selectable">Option</Selectable>)
    const view = within(container)

    expect(view.getByTestId('selectable').tagName).toBe('BUTTON')
  })

  it('should render as a custom element', () => {
    const {container} = render(
      <Selectable as="a" data-testid="selectable" href="#">
        Link option
      </Selectable>,
    )
    const view = within(container)

    expect(view.getByTestId('selectable').tagName).toBe('A')
  })

  it('should set data-pressed when selected is true', () => {
    const {container} = render(
      <Selectable selected data-testid="selectable">
        Selected option
      </Selectable>,
    )
    const view = within(container)

    expect(view.getByTestId('selectable')).toHaveAttribute('data-pressed', '')
  })

  it('should not set data-pressed when selected is false', () => {
    const {container} = render(<Selectable data-testid="selectable">Option</Selectable>)
    const view = within(container)

    expect(view.getByTestId('selectable')).not.toHaveAttribute('data-pressed')
  })

  it('should fire onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    const {container} = render(<Selectable onClick={handleClick}>Clickable option</Selectable>)
    const view = within(container)

    await user.click(view.getByText('Clickable option'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
