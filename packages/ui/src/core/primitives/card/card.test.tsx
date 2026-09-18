/** @vitest-environment jsdom */

import {screen} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {render} from '../../../../test/utils'
import {Card} from './card'

describe('<Card />', () => {
  it('applies the inherited scheme as `color-scheme` on its own element', () => {
    render(<Card data-testid="card" />, {scheme: 'dark'})

    const card = screen.getByTestId('card')

    expect(card).toHaveAttribute('data-scheme', 'dark')
    expect(card).toHaveStyle({colorScheme: 'dark'})
  })

  it('applies the `scheme` prop rather than the parent scheme', () => {
    render(<Card data-testid="card" scheme="dark" />, {scheme: 'light'})

    const card = screen.getByTestId('card')

    expect(card).toHaveAttribute('data-scheme', 'dark')
    expect(card).toHaveStyle({colorScheme: 'dark'})
  })

  it('passes its scheme on to nested cards', () => {
    render(
      <Card scheme="dark">
        <Card data-testid="inherited" />
        <Card data-testid="overridden" scheme="light" />
      </Card>,
      {scheme: 'light'},
    )

    const inherited = screen.getByTestId('inherited')
    const overridden = screen.getByTestId('overridden')

    expect(inherited).toHaveAttribute('data-scheme', 'dark')
    expect(inherited).toHaveStyle({colorScheme: 'dark'})
    expect(overridden).toHaveAttribute('data-scheme', 'light')
    expect(overridden).toHaveStyle({colorScheme: 'light'})
  })

  it('keeps consumer inline styles alongside `color-scheme`', () => {
    render(<Card data-testid="card" style={{width: 100}} />)

    expect(screen.getByTestId('card')).toHaveStyle({colorScheme: 'light', width: '100px'})
  })
})
