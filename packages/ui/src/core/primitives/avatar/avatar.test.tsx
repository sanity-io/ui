/** @vitest-environment jsdom */

import {fireEvent} from '@testing-library/react'
import {useLayoutEffect} from 'react'
import {describe, expect, it} from 'vitest'

import {render} from '../../../../test/utils'
import {Avatar} from './avatar'

interface AvatarFrame {
  imageHref: string | null
  initials: string
}

function readAvatarFrame(): AvatarFrame {
  const root = document.querySelector('[data-ui="Avatar"]')

  return {
    imageHref: root?.querySelector('image')?.getAttribute('href') ?? null,
    initials: root?.textContent ?? '',
  }
}

function FrameRecorder({frames}: {frames: AvatarFrame[]}) {
  useLayoutEffect(() => {
    frames.push(readAvatarFrame())
  })

  return null
}

describe('primitives/avatar', () => {
  it('falls back to the initials once the image fails to load', () => {
    render(<Avatar initials="AB" src="/broken.png" />)

    expect(readAvatarFrame()).toEqual({imageHref: '/broken.png', initials: ''})

    fireEvent.error(document.querySelector('image')!)

    expect(readAvatarFrame()).toEqual({imageHref: null, initials: 'AB'})
  })

  it('shows the image for a new src without ever committing the initials fallback', () => {
    const frames: AvatarFrame[] = []

    const {rerender} = render(
      <>
        <Avatar initials="AB" src="/broken.png" />
        <FrameRecorder frames={frames} />
      </>,
    )

    fireEvent.error(document.querySelector('image')!)
    expect(readAvatarFrame()).toEqual({imageHref: null, initials: 'AB'})

    const firstFrameAfterSrcChange = frames.length

    rerender(
      <>
        <Avatar initials="AB" src="/working.png" />
        <FrameRecorder frames={frames} />
      </>,
    )

    expect(readAvatarFrame()).toEqual({imageHref: '/working.png', initials: ''})
    expect(frames.slice(firstFrameAfterSrcChange)).not.toContainEqual({
      imageHref: null,
      initials: 'AB',
    })
  })

  it('keeps the initials when src is removed after a failure', () => {
    const {rerender} = render(<Avatar initials="AB" src="/broken.png" />)

    fireEvent.error(document.querySelector('image')!)

    rerender(<Avatar initials="AB" />)

    expect(readAvatarFrame()).toEqual({imageHref: null, initials: 'AB'})
  })

  it('falls back again when a replacement image also fails', () => {
    const {rerender} = render(<Avatar initials="AB" src="/broken.png" />)

    fireEvent.error(document.querySelector('image')!)
    rerender(<Avatar initials="AB" src="/also-broken.png" />)

    expect(readAvatarFrame()).toEqual({imageHref: '/also-broken.png', initials: ''})

    fireEvent.error(document.querySelector('image')!)

    expect(readAvatarFrame()).toEqual({imageHref: null, initials: 'AB'})
  })
})
