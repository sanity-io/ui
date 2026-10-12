/** @vitest-environment jsdom */

import {AddIcon} from '@sanity/icons/Add'
import {screen} from '@testing-library/react'
import {renderToString} from 'react-dom/server'
import {ServerStyleSheet} from 'styled-components'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '../../../../test/utils'
import {buildTheme} from '../../../theme/build/buildTheme'
import {ThemeProvider} from '../../theme/themeProvider'
import {Flex} from '../flex/flex'
import {Button, ButtonOwnProps} from './button'

vi.mock('../flex/flex', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../flex/flex')>()

  return {
    ...actual,
    // oxlint-disable-next-line no-unsafe-type-assertion
    Flex: vi.fn((props: Record<string, unknown>) => (actual.Flex as any)(props)),
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

  it('should support `gap`', () => {
    render(<Button gap={18} icon={AddIcon} text="Button text" />)

    const propsList = mockedFlex.mock.calls.map(([props]) => props)
    expect(propsList).toContainEqual(expect.objectContaining({gap: [18]}))
  })

  it('applies `style.button.root` of the theme to the button, not to `root` elements', () => {
    const sheet = new ServerStyleSheet()

    try {
      renderToString(
        sheet.collectStyles(
          <ThemeProvider theme={buildTheme()}>
            <Button text="Button text" />
          </ThemeProvider>,
        ),
      )
      const css = sheet.getStyleTags()

      expect(css).toMatch(/\{[^}]*transition:background-color 100ms/)
      expect(css).not.toMatch(/ root\{/)
    } finally {
      sheet.seal()
    }
  })
})
