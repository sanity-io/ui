/** @vitest-environment jsdom */

import {AddIcon} from '@sanity/icons'
import {screen} from '@testing-library/react'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '../../../../test'
import {Flex} from '../flex'
import {Button, ButtonOwnProps} from './button'

vi.mock('../flex', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../flex')>()

  return {
    ...actual,
    // oxlint-disable-next-line no-unsafe-type-assertion
    Flex: vi.fn((props: Record<string, unknown>) => (actual.Flex as any).render(props, null)),
  }
})

describe('atoms/button', () => {
  const mockedFlex = vi.mocked(Flex)

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
    function WrappedButton({button: buttonProps}: {button: ButtonOwnProps}) {
      return <Button {...buttonProps} />
    }

    const buttonProps: ButtonOwnProps = {
      text: 'Button text',
    }

    render(<WrappedButton button={buttonProps} />)

    expect(screen.getByText('Button text')).toBeInTheDocument()
  })

  it('should support `space`', () => {
    // oxlint-disable-next-line no-deprecated
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
    // oxlint-disable-next-line no-deprecated
    render(<Button gap={19} icon={AddIcon} space={20} text="Button text" />)

    const propsList = mockedFlex.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({gap: [19]}))
    expect(propsList).not.toContainEqual(expect.objectContaining({gap: [20]}))
  })
})
