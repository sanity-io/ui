import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {Skeleton} from './Skeleton'

describe('primitives/skeleton', () => {
  it('Axe: should have no violations', async () => {
    const lightResult = render(<Skeleton style={{width: 200, height: 20}} radius={2} />, {
      scheme: 'light',
    })

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(<Skeleton style={{width: 200, height: 20}} radius={2} />, {
      scheme: 'dark',
    })

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(<Skeleton data-testid="skeleton" style={{width: 100, height: 16}} />)
    const view = within(container)

    expect(view.getByTestId('skeleton')).toHaveAttribute('data-ui', 'Skeleton')
  })

  it('should render as a div by default', () => {
    const {container} = render(<Skeleton data-testid="skeleton" style={{width: 100, height: 16}} />)
    const view = within(container)

    expect(view.getByTestId('skeleton').tagName).toBe('DIV')
  })

  it('should render as a custom element', () => {
    const {container} = render(<Skeleton as="span" data-testid="skeleton" style={{width: 100, height: 16}} />)
    const view = within(container)

    expect(view.getByTestId('skeleton').tagName).toBe('SPAN')
  })

  it('should be visible by default when no delay is set', () => {
    const {container} = render(<Skeleton data-testid="skeleton" style={{width: 100, height: 16}} />)
    const view = within(container)

    expect(view.getByTestId('skeleton')).toHaveAttribute('data-visible', '')
  })

  it('should set data-animated when animated is true', () => {
    const {container} = render(<Skeleton animated data-testid="skeleton" style={{width: 100, height: 16}} />)
    const view = within(container)

    expect(view.getByTestId('skeleton')).toHaveAttribute('data-animated', '')
  })

  it('should not set data-animated by default', () => {
    const {container} = render(<Skeleton data-testid="skeleton" style={{width: 100, height: 16}} />)
    const view = within(container)

    expect(view.getByTestId('skeleton')).not.toHaveAttribute('data-animated')
  })

  it('should not be visible initially when delay is set', () => {
    const {container} = render(<Skeleton delay={500} data-testid="skeleton" style={{width: 100, height: 16}} />)
    const view = within(container)

    expect(view.getByTestId('skeleton')).not.toHaveAttribute('data-visible')
  })
})
