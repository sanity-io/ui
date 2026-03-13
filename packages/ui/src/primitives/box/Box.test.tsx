import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Box} from './Box'

describe('primitives/box', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<Box padding={3}>Box content</Box>, {scheme: 'light'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Box padding={3}>Box content</Box>, {scheme: 'dark'})

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render children', () => {
    const {container} = render(<Box>Box content</Box>)
    const view = within(container)

    expect(view.getByText('Box content')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Box data-testid="box">content</Box>)
    const view = within(container)

    expect(view.getByTestId('box')).toHaveAttribute('data-ui', 'Box')
  })

  it('should render as a custom element', () => {
    const {container} = render(
      <Box as="section" data-testid="box">
        content
      </Box>,
    )
    const view = within(container)

    expect(view.getByTestId('box').tagName).toBe('SECTION')
  })
})
