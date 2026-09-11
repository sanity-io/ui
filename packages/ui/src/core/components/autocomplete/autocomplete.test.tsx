/** @vitest-environment jsdom */

import {fireEvent, screen} from '@testing-library/react'

// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/resizeObserver.mock'
// oxlint-disable-next-line no-unassigned-import
import '../../../../test/mocks/matchMedia.mock'
import {describe, expect, it, vi} from 'vitest'

import {render} from '../../../../test/utils'
import {Autocomplete} from './autocomplete'

const OPTIONS = [{value: 'foo'}, {value: 'bar'}]

describe('components/autocomplete', () => {
  it('renders no open button by default', () => {
    render(<Autocomplete id="ac" options={OPTIONS} />)

    expect(screen.queryByRole('button', {name: 'Open'})).toBeNull()
  })

  it('labels the open button "Open" when `openButton` is `true`', () => {
    render(<Autocomplete id="ac" openButton options={OPTIONS} />)

    expect(screen.getByRole('button', {name: 'Open'})).toBeInTheDocument()
  })

  it('forwards the `openButton` object to the button', () => {
    render(
      <Autocomplete
        id="ac"
        openButton={{'aria-label': 'Show countries', 'title': 'Countries'}}
        options={OPTIONS}
      />,
    )

    const button = screen.getByRole('button', {name: 'Show countries'})

    expect(button).toHaveAttribute('title', 'Countries')
  })

  it('runs the `openButton` onClick and expands the list on click', () => {
    const onClick = vi.fn()

    render(<Autocomplete id="ac" openButton={{onClick}} options={OPTIONS} placeholder="Search" />)

    const input = screen.getByPlaceholderText('Search')

    fireEvent.focus(input)

    expect(input).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(screen.getByRole('button', {name: 'Open'}))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(input).toHaveAttribute('aria-expanded', 'true')
  })
})
