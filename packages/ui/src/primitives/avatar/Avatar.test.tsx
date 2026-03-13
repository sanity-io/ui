import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Avatar} from './Avatar'
import {AvatarCounter} from './AvatarCounter'

describe('primitives/avatar', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<Avatar initials="AB" size={1} />, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Avatar initials="AB" size={1} />, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Avatar initials="AB" data-testid="avatar" />)
    const view = within(container)

    expect(view.getByTestId('avatar')).toHaveAttribute('data-ui', 'Avatar')
  })

  it('should render initials', () => {
    const {container} = render(<Avatar initials="AB" data-testid="avatar" />)
    const view = within(container)

    expect(view.getByText('AB')).toBeInTheDocument()
  })

  it('should truncate initials to 2 characters', () => {
    const {container} = render(<Avatar initials="ABC" data-testid="avatar" />)
    const view = within(container)

    expect(view.getByText('AB')).toBeInTheDocument()
  })

  it('should set aria-label from title', () => {
    const {container} = render(<Avatar initials="AB" title="Alice Brown" data-testid="avatar" />)
    const view = within(container)

    expect(view.getByTestId('avatar')).toHaveAttribute('aria-label', 'Alice Brown')
  })

  it('should render as a span by default', () => {
    const {container} = render(<Avatar initials="AB" data-testid="avatar" />)
    const view = within(container)

    expect(view.getByTestId('avatar').tagName).toBe('SPAN')
  })

  it('should render as a custom element', () => {
    const {container} = render(<Avatar initials="AB" as="div" data-testid="avatar" />)
    const view = within(container)

    expect(view.getByTestId('avatar').tagName).toBe('DIV')
  })

  it('should render an image when src is provided', () => {
    const {container} = render(<Avatar initials="AB" src="https://example.com/avatar.png" data-testid="avatar" />)
    const view = within(container)

    const img = view.getByRole('img')

    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.png')
  })
})

describe('primitives/avatarCounter', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<AvatarCounter count={5} />, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<AvatarCounter count={5} />, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<AvatarCounter count={3} data-testid="counter" />)
    const view = within(container)

    expect(view.getByTestId('counter')).toHaveAttribute('data-ui', 'AvatarCounter')
  })

  it('should render the count', () => {
    const {container} = render(<AvatarCounter count={7} />)
    const view = within(container)

    expect(view.getByText('7')).toBeInTheDocument()
  })

  it('should render as a span by default', () => {
    const {container} = render(<AvatarCounter count={2} data-testid="counter" />)
    const view = within(container)

    expect(view.getByTestId('counter').tagName).toBe('SPAN')
  })

  it('should render as a custom element', () => {
    const {container} = render(<AvatarCounter count={2} as="button" data-testid="counter" />)
    const view = within(container)

    expect(view.getByTestId('counter').tagName).toBe('BUTTON')
  })
})
