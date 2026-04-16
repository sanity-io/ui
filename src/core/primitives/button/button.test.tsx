/** @jest-environment jsdom */

import {AddIcon} from '@sanity/icons'
import {screen} from '@testing-library/react'
import {axe} from 'jest-axe'

import {render} from '../../../../test'
import {Flex} from '../flex'
import {Button, ButtonProps} from './button'

jest.mock('../flex', () => {
  const actual = jest.requireActual('../flex')

  return {
    ...actual,
    Flex: jest.fn((props: Record<string, unknown>) => (actual.Flex as any).render(props, null)),
  }
})

describe('atoms/button', () => {
  const mockedFlex = jest.mocked(Flex)

  beforeEach(() => {
    mockedFlex.mockClear()
  })

  it('Axe: should have no violations', async () => {
    const lightResult = render(<Button icon={AddIcon} text="Label" tone="positive" />, {
      scheme: 'light',
    })

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Button icon={AddIcon} text="Label" tone="positive" />, {
      scheme: 'dark',
    })

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render text', () => {
    render(<Button text="Button text" />)

    expect(screen.getByText('Button text')).toBeInTheDocument()
  })

  it('should wrap button', () => {
    function WrappedButton({button: buttonProps}: {button: ButtonProps}) {
      return <Button {...buttonProps} />
    }

    const buttonProps: ButtonProps = {
      text: 'Button text',
    }

    render(<WrappedButton button={buttonProps} />)

    expect(screen.getByText('Button text')).toBeInTheDocument()
  })

  it('should support `space`', () => {
    render(<Button icon={AddIcon} space={17} text="Button text" />)

    const propsList = mockedFlex.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({gap: [17]}))
  })

  it('should support `gap`', () => {
    render(<Button gap={18} icon={AddIcon} text="Button text" />)

    const propsList = mockedFlex.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({gap: [18]}))
  })

  it('should prefer `gap` over `space` when both are provided', () => {
    render(<Button gap={19} icon={AddIcon} space={20} text="Button text" />)

    const propsList = mockedFlex.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({gap: [19]}))
    expect(propsList).not.toContainEqual(expect.objectContaining({gap: [20]}))
  })
})
