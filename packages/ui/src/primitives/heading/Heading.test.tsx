import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Heading} from './Heading'

describe('primitives/heading', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(
      <Heading as="h1" size={3}>
        Page title
      </Heading>,
      {scheme: 'light'},
    )

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(
      <Heading as="h1" size={3}>
        Page title
      </Heading>,
      {scheme: 'dark'},
    )

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render text', () => {
    const {container} = render(<Heading>Heading text</Heading>)
    const view = within(container)

    expect(view.getByText('Heading text')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Heading data-testid="heading">Title</Heading>)
    const view = within(container)

    expect(view.getByTestId('heading')).toHaveAttribute('data-ui', 'Heading')
  })

  it('should render as a custom element', () => {
    const {container} = render(
      <Heading as="h2" data-testid="heading">
        Subtitle
      </Heading>,
    )
    const view = within(container)

    expect(view.getByTestId('heading').tagName).toBe('H2')
  })

  it('should render with textOverflow', () => {
    const {container} = render(
      <Heading textOverflow="ellipsis" data-testid="heading">
        Long heading text that overflows
      </Heading>,
    )
    const view = within(container)

    expect(view.getByText('Long heading text that overflows')).toBeInTheDocument()
  })
})
