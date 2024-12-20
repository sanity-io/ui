/** @jest-environment jsdom */
import {fireEvent, screen} from '@testing-library/react'
import '../../../../test/mocks/matchMedia.mock'
import {render} from '../../../../test'
import {PopoverButton} from './PopoverButton'

describe('PopoverButton', () => {
  it('should open popover when button is clicked', async () => {
    render(
      <PopoverButton
        ariaHasPopUp="true"
        renderButton={() => <button>Trigger</button>}
        renderContent={() => <div>Content</div>}
      />,
    )

    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', {name: 'Trigger'})

    fireEvent.click(trigger)

    expect(screen.queryByText('Content')).toBeInTheDocument()
  })

  it('should close popover when button is clicked again', async () => {
    render(
      <PopoverButton
        ariaHasPopUp="true"
        renderButton={() => <button>Trigger</button>}
        renderContent={() => <div>Content</div>}
      />,
    )

    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', {name: 'Trigger'})

    fireEvent.click(trigger)

    expect(screen.queryByText('Content')).toBeInTheDocument()

    fireEvent.click(trigger)

    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('should close popover when Escape key is pressed and focus is returned to button', async () => {
    render(
      <PopoverButton
        ariaHasPopUp="true"
        renderButton={() => <button>Trigger</button>}
        renderContent={() => <div>Content</div>}
      />,
    )

    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', {name: 'Trigger'})

    fireEvent.click(trigger)

    expect(screen.queryByText('Content')).toBeInTheDocument()

    fireEvent.keyDown(screen.getByText('Content'), {key: 'Escape'})

    expect(screen.queryByText('Content')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()

    // Check that the button regains focus
    expect(document.activeElement).toBe(trigger)
  })

  it('should focus the first focusable element in the popover when opened', async () => {
    render(
      <PopoverButton
        ariaHasPopUp="true"
        renderButton={() => <button>Trigger</button>}
        renderContent={() => (
          <div data-testid="menu">
            <button tabIndex={0}>First</button>
            <button tabIndex={0}>Second</button>
          </div>
        )}
      />,
    )

    expect(screen.queryByTestId('menu')).not.toBeInTheDocument()
    expect(screen.queryByText('First')).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', {name: 'Trigger'})

    fireEvent.click(trigger)

    // Check that the first focusable element is focused
    expect(document.activeElement).toBe(screen.getByRole('button', {name: 'First'}))
  })

  it('should close popover when clicking outside and focus returned to button', async () => {
    render(
      <PopoverButton
        ariaHasPopUp="true"
        renderButton={() => <button>Trigger</button>}
        renderContent={() => <div>Content</div>}
      />,
    )

    expect(screen.queryByText('Content')).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', {name: 'Trigger'})

    fireEvent.click(trigger)

    expect(screen.queryByText('Content')).toBeInTheDocument()

    // Simulate outside click
    fireEvent.mouseDown(document.body)

    // Check that the popover is closed and focus is returned to the trigger button
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()

    // Check that the button regains focus
    expect(document.activeElement).toBe(trigger)
  })

  it('should call `onOpen` when popover is opened', async () => {
    const onOpen = jest.fn()

    render(
      <PopoverButton
        ariaHasPopUp="true"
        onOpen={onOpen}
        renderButton={() => <button>Trigger</button>}
        renderContent={() => <div>Content</div>}
      />,
    )

    const trigger = screen.getByRole('button', {name: 'Trigger'})

    fireEvent.click(trigger)

    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('should call `onClose` when popover is closed', async () => {
    const onClose = jest.fn()

    render(
      <PopoverButton
        ariaHasPopUp="true"
        onClose={onClose}
        renderButton={() => <button>Trigger</button>}
        renderContent={() => <div>Content</div>}
      />,
    )

    const trigger = screen.getByRole('button', {name: 'Trigger'})

    fireEvent.click(trigger)
    fireEvent.click(trigger)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should set appropriate ARIA attributes on the button and popover content', async () => {
    render(
      <PopoverButton
        ariaHasPopUp="true"
        renderButton={() => <button>Trigger</button>}
        renderContent={() => <div>Content</div>}
      />,
    )

    const trigger = screen.getByRole('button', {name: 'Trigger'})
    const ariaControls = trigger.getAttribute('aria-controls')

    expect(trigger).toHaveAttribute('aria-haspopup', 'true')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('aria-controls')

    fireEvent.click(trigger)

    // After clicking, aria-expanded should be true
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    const content = screen.getByText('Content')

    expect(content).toHaveAttribute('aria-labelledby', trigger.id)
    expect(content).toHaveAttribute('id', ariaControls)

    fireEvent.click(trigger)

    // After clicking again, aria-expanded should revert to false
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('should close popover when invoking `close` callback from `renderContent`', async () => {
    render(
      <PopoverButton
        ariaHasPopUp="true"
        renderButton={() => <button>Trigger</button>}
        renderContent={({close}) => <button onClick={close}>Close</button>}
      />,
    )

    expect(screen.queryByText('Close')).not.toBeInTheDocument()

    const trigger = screen.getByRole('button', {name: 'Trigger'})

    fireEvent.click(trigger)

    expect(screen.queryByText('Close')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Close'))

    expect(screen.queryByText('Close')).not.toBeInTheDocument()
  })

  it('should return `isOpen` from `renderButton`', async () => {
    render(
      <PopoverButton
        ariaHasPopUp="true"
        renderButton={({isOpen}) => <button>{isOpen ? 'Open' : 'Closed'}</button>}
        renderContent={() => <div>Content</div>}
      />,
    )

    expect(screen.getByRole('button')).toHaveTextContent('Closed')

    fireEvent.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toHaveTextContent('Open')
  })
})
