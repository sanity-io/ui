import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Grid} from './Grid'

describe('primitives/grid', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(
      <Grid gridTemplateColumns={3} gap={2}>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Grid>,
      {scheme: 'light'},
    )

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(
      <Grid gridTemplateColumns={3} gap={2}>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Grid>,
      {scheme: 'dark'},
    )

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render children', () => {
    const {container} = render(
      <Grid>
        <div>Grid child</div>
      </Grid>,
    )
    const view = within(container)

    expect(view.getByText('Grid child')).toBeInTheDocument()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Grid data-testid="grid">content</Grid>)
    const view = within(container)

    expect(view.getByTestId('grid')).toHaveAttribute('data-ui', 'Grid')
  })

  it('should render as a custom element', () => {
    const {container} = render(
      <Grid as="section" data-testid="grid">
        content
      </Grid>,
    )
    const view = within(container)

    expect(view.getByTestId('grid').tagName).toBe('SECTION')
  })
})
