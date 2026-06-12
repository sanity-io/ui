/** @jest-environment jsdom */

import '../../../../test/mocks/resizeObserver.mock'
import '../../../../test/mocks/matchMedia.mock'

import {screen} from '@testing-library/react'

import {render} from '../../../../test'
import {Button, Text} from '../../primitives'
import {Popover} from './popover'

describe('Popover', () => {
  it('should render the content when open (the popover card is lazy loaded on first open)', async () => {
    render(
      <Popover content={<Text size={1}>{'Popover content'}</Text>} open>
        <Button mode="bleed" text="Reference" />
      </Popover>,
    )

    // Validate popover content is rendered
    await screen.findByText('Popover content')
  })

  it('should not render the content when closed', () => {
    render(
      <Popover content={<Text size={1}>{'Popover content'}</Text>}>
        <Button mode="bleed" text="Reference" />
      </Popover>,
    )

    expect(screen.queryByText('Popover content')).not.toBeInTheDocument()
  })

  it('should render the content when open and animated', async () => {
    render(
      <Popover animate content={<Text size={1}>{'Animated popover content'}</Text>} open>
        <Button mode="bleed" text="Reference" />
      </Popover>,
    )

    // Validate popover content is rendered
    await screen.findByText('Animated popover content')
  })
})
