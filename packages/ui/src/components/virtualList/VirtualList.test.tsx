import {within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {axe} from 'vitest-axe'

import {render} from '$test/utils'

import {VirtualList} from './VirtualList'

describe('components/virtualList', () => {
  it('Axe: should have no violations', async () => {
    const items = [{id: '1', label: 'Item 1'}]

    const lightResult = render(
      <VirtualList items={items} renderItem={(item) => <div>{item.label}</div>} />,
      {scheme: 'light'},
    )

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()

    const darkResult = render(
      <VirtualList items={items} renderItem={(item) => <div>{item.label}</div>} />,
      {scheme: 'dark'},
    )

    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })

  it('should render with data-ui attribute', () => {
    const {container} = render(
      <VirtualList
        data-testid="virtual-list"
        items={[{id: '1', label: 'Item 1'}]}
        renderItem={(item) => <div>{item.label}</div>}
      />,
    )
    const view = within(container)

    expect(view.getByTestId('virtual-list')).toBeInTheDocument()
  })

  // VirtualList requires real scroll/element dimensions to compute which items
  // to render. In jsdom all measurements are 0, so items are never virtualised
  // into the DOM. Item-rendering behaviour should be tested in an e2e or
  // browser-based environment instead.

  it('should render as a div by default', () => {
    const {container} = render(
      <VirtualList
        data-testid="virtual-list"
        items={[{id: '1', label: 'Item'}]}
        renderItem={(item) => <div>{item.label}</div>}
      />,
    )
    const view = within(container)

    expect(view.getByTestId('virtual-list').tagName).toBe('DIV')
  })

  it('should render with empty items array', () => {
    const {container} = render(
      <VirtualList data-testid="virtual-list" items={[]} renderItem={() => null} />,
    )
    const view = within(container)

    expect(view.getByTestId('virtual-list')).toBeInTheDocument()
  })
})
