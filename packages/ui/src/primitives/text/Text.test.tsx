import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Text} from './Text'

describe('primitives/text', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(
      <Text size={2} weight="semibold">
        Hello world
      </Text>,
      {scheme: 'light'},
    )

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(
      <Text size={2} weight="semibold">
        Hello world
      </Text>,
      {scheme: 'dark'},
    )

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render text content', () => {
    const {container} = render(<Text>Some text content</Text>)
    const view = within(container)

    expect(view.getByText('Some text content')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Text data-testid="text">content</Text>)
    const view = within(container)

    expect(view.getByTestId('text')).toHaveAttribute('data-ui', 'Text')
  })

  it('should render as a custom element', () => {
    const {container} = render(
      <Text as="p" data-testid="text">
        Paragraph text
      </Text>,
    )
    const view = within(container)

    expect(view.getByTestId('text').tagName).toBe('P')
  })

  it('should support textOverflow', () => {
    const {container} = render(
      <Text textOverflow="ellipsis" data-testid="text">
        Overflowing text
      </Text>,
    )
    const view = within(container)

    expect(view.getByText('Overflowing text')).toBeInTheDocument()
  })
})
