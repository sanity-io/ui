import {screen} from '@testing-library/react'
import {describe, expect, it, vi} from 'vitest'

import {render} from '$test/utils'

import {Button} from '../button/Button'
import {Popover} from './Popover'

// Records whether the motion-bearing animated layer chunk has been evaluated. The lazy import in
// `Popover.tsx` resolves to this mocked module, so the factory only runs once the animated path is
// actually reached. The non-animated path must never trigger it, which is the lazy-load invariant.
const {animatedChunkState} = vi.hoisted(() => ({animatedChunkState: {evaluated: false}}))

vi.mock('./PopoverLayerAnimated', async (importOriginal) => {
  animatedChunkState.evaluated = true
  return importOriginal<typeof import('./PopoverLayerAnimated')>()
})

describe('Popover', () => {
  describe('Non-animated path', () => {
    it('renders content synchronously when open without animate', () => {
      render(
        <Popover content={<span>Static content</span>} open placement="top">
          <Button mode="bleed" text="Reference" />
        </Popover>,
      )

      // No awaiting: the static layer mounts in the same commit that opens the popover.
      expect(screen.getByText('Static content')).toBeInTheDocument()
    })

    it('does not evaluate the motion-bearing animated chunk on a static render', () => {
      // Guard: this assertion is only meaningful before any animated render in this file has run.
      expect(animatedChunkState.evaluated).toBe(false)

      render(
        <Popover content={<span>Static content</span>} open placement="top">
          <Button mode="bleed" text="Reference" />
        </Popover>,
      )

      expect(screen.getByText('Static content')).toBeInTheDocument()
      // The motion chunk stays out of the static render path.
      expect(animatedChunkState.evaluated).toBe(false)
    })
  })

  describe('Animated path', () => {
    it('renders content when open with animate', async () => {
      render(
        <Popover animate content={<span>Animated content</span>} open placement="top">
          <Button mode="bleed" text="Reference" />
        </Popover>,
      )

      // The animated layer is lazily loaded, so content arrives asynchronously.
      expect(await screen.findByText('Animated content')).toBeInTheDocument()
      // Reaching the animated path is what loads the motion-bearing chunk.
      expect(animatedChunkState.evaluated).toBe(true)
    })
  })
})
