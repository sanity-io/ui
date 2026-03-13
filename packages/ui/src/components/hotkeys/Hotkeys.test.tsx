import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Hotkeys} from './Hotkeys'

describe('components/hotkeys', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<Hotkeys keys={['⌘', 'S']} />, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Hotkeys keys={['⌘', 'S']} />, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render keys', () => {
    const {container} = render(<Hotkeys keys={['⌘', 'S']} />)
    const view = within(container)

    expect(view.getByText('⌘')).toBeInTheDocument()
    expect(view.getByText('S')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Hotkeys keys={['Enter']} data-testid="hotkeys" />)
    const view = within(container)

    expect(view.getByTestId('hotkeys')).toHaveAttribute('data-ui', 'Hotkeys')
  })

  it('should render as a kbd element by default', () => {
    const {container} = render(<Hotkeys keys={['A']} data-testid="hotkeys" />)
    const view = within(container)

    expect(view.getByTestId('hotkeys').tagName).toBe('KBD')
  })

  it('should render each key as a nested kbd element', () => {
    const {container} = render(<Hotkeys keys={['Ctrl', 'Alt', 'Delete']} data-testid="hotkeys" />)
    const view = within(container)

    const kbdElements = view.getByTestId('hotkeys').querySelectorAll('kbd')

    expect(kbdElements).toHaveLength(3)
  })

  it('should return undefined when keys is empty', () => {
    const {container} = render(
      <div data-testid="wrapper">
        <Hotkeys keys={[]} />
      </div>,
    )
    const view = within(container)

    const wrapper = view.getByTestId('wrapper')

    expect(wrapper.children).toHaveLength(0)
  })

  it('should render a single key', () => {
    const {container} = render(<Hotkeys keys={['Escape']} />)
    const view = within(container)

    expect(view.getByText('Escape')).toBeInTheDocument()
  })

  it('should render multiple keys', () => {
    const {container} = render(<Hotkeys keys={['⌘', 'Shift', 'P']} />)
    const view = within(container)

    expect(view.getByText('⌘')).toBeInTheDocument()
    expect(view.getByText('Shift')).toBeInTheDocument()
    expect(view.getByText('P')).toBeInTheDocument()
  })
})
