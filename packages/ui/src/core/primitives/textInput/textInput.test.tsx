/** @vitest-environment jsdom */

import {fireEvent, screen} from '@testing-library/react'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {responsiveInputPaddingStyle} from '../../styles/input/responsiveInputPaddingStyle'
import {TextInput} from './textInput'

import {textInputClearButton} from './textInput.css'

vi.mock('../../styles/input/responsiveInputPaddingStyle', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../styles/input/responsiveInputPaddingStyle')>()

  return {
    ...actual,
    responsiveInputPaddingStyle: vi.fn(actual.responsiveInputPaddingStyle),
  }
})

describe('primitives/textInput', () => {
  const mockedResponsiveInputPaddingStyle = vi.mocked(responsiveInputPaddingStyle)

  beforeEach(() => {
    mockedResponsiveInputPaddingStyle.mockClear()
  })

  it('should support `gap`', () => {
    render(<TextInput gap={2} icon={() => null} />)

    expect(mockedResponsiveInputPaddingStyle).toHaveBeenCalledWith(
      expect.objectContaining({$space: [2]}),
    )
  })

  it('attaches a forwarded callback ref once, not on every render', () => {
    const forwardedRef = vi.fn()
    // StrictMode replays effects on mount, which would attach the ref a second time by design
    const {rerender} = render(<TextInput placeholder="One" ref={forwardedRef} />, {strict: false})

    expect(forwardedRef).toHaveBeenCalledTimes(1)
    expect(forwardedRef).toHaveBeenCalledWith(screen.getByPlaceholderText('One'))

    rerender(<TextInput placeholder="Two" ref={forwardedRef} />)

    // A re-render used to detach (`null`) and re-attach the ref
    expect(forwardedRef).toHaveBeenCalledTimes(1)
  })

  describe('clearButton', () => {
    it('renders no clear button by default', () => {
      render(<TextInput />)

      expect(screen.queryByRole('button', {name: 'Clear'})).toBeNull()
    })

    it('labels the clear button "Clear" when `clearButton` is `true`', () => {
      render(<TextInput clearButton />)

      const button = screen.getByRole('button', {name: 'Clear'})

      expect(button).toHaveAttribute('data-qa', 'clear-button')
      expect(button).toHaveClass(textInputClearButton)
    })

    it('forwards the `clearButton` object to the button and keeps the internal class', () => {
      render(<TextInput clearButton={{'aria-label': 'Reset', 'className': 'my-clear'}} />)

      const button = screen.getByRole('button', {name: 'Reset'})

      expect(button).toHaveClass(textInputClearButton)
      expect(button).toHaveClass('my-clear')
    })

    it('renders no clear button when the input is read only', () => {
      render(<TextInput clearButton readOnly />)

      expect(screen.queryByRole('button', {name: 'Clear'})).toBeNull()
    })

    it('calls `onClear` and refocuses the input on click', () => {
      const onClear = vi.fn()

      render(<TextInput clearButton onClear={onClear} placeholder="Search" />)

      fireEvent.click(screen.getByRole('button', {name: 'Clear'}))

      expect(onClear).toHaveBeenCalledTimes(1)
      expect(screen.getByPlaceholderText('Search')).toHaveFocus()
    })
  })
})
