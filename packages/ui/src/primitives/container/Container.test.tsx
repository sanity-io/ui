import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Container} from './Container'

describe('primitives/container', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<Container width={1}>Container content</Container>, {
      scheme: 'light',
    })

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Container width={1}>Container content</Container>, {
      scheme: 'dark',
    })

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render children', () => {
    const {container} = render(<Container>Container content</Container>)
    const view = within(container)

    expect(view.getByText('Container content')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Container data-testid="container">content</Container>)
    const view = within(container)

    expect(view.getByTestId('container')).toHaveAttribute('data-ui', 'Container')
  })
})
