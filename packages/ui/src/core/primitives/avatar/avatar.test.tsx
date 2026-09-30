/** @vitest-environment jsdom */

import {fireEvent} from '@testing-library/react'
import {useLayoutEffect} from 'react'
import {describe, expect, it} from 'vitest'

import {render} from '../../../../test/utils'
import {buildTheme} from '../../../theme/build/buildTheme'
import {Avatar} from './avatar'

const {avatar: avatarTheme} = buildTheme().v2!

interface AvatarFrame {
  imageSrc: string | null
  initials: string
}

function readAvatarFrame(): AvatarFrame {
  const root = document.querySelector('[data-ui="Avatar"]')

  return {
    imageSrc: root?.querySelector('img')?.getAttribute('src') ?? null,
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
  it('renders the image as a native <img> that React can wait for in a <ViewTransition>', () => {
    render(<Avatar initials="AB" src="/photo.png" />)

    const img = document.querySelector('[data-ui="Avatar"] img')!

    expect(img).toBeInstanceOf(HTMLImageElement)
    expect(img.getAttribute('src')).toBe('/photo.png')
    // Decorative: the root carries the accessible name through `title`
    expect(img.getAttribute('alt')).toBe('')
    // `loading="lazy"` would opt the image out of React's suspensey images
    expect(img.hasAttribute('loading')).toBe(false)
    expect(document.querySelector('[data-ui="Avatar"] image')).toBeNull()
  })

  it('gives the image the intrinsic size of the theme avatar size', () => {
    const {rerender} = render(<Avatar src="/photo.png" />)
    const img = () => document.querySelector('[data-ui="Avatar"] img')!
    const {size: defaultSize} = avatarTheme.sizes[1]

    expect(img().getAttribute('width')).toBe(String(defaultSize))
    expect(img().getAttribute('height')).toBe(String(defaultSize))

    rerender(<Avatar size={2} src="/photo.png" />)

    expect(img().getAttribute('width')).toBe(String(avatarTheme.sizes[2].size))
    expect(img().getAttribute('height')).toBe(String(avatarTheme.sizes[2].size))

    // Responsive sizes are resolved in CSS, the first step is the intrinsic size
    rerender(<Avatar size={[0, 2]} src="/photo.png" />)

    expect(img().getAttribute('width')).toBe(String(avatarTheme.sizes[0].size))
    expect(img().getAttribute('height')).toBe(String(avatarTheme.sizes[0].size))
  })

  it('falls back to the initials once the image fails to load', () => {
    render(<Avatar initials="AB" src="/broken.png" />)

    expect(readAvatarFrame()).toEqual({imageSrc: '/broken.png', initials: ''})

    fireEvent.error(document.querySelector('img')!)

    expect(readAvatarFrame()).toEqual({imageSrc: null, initials: 'AB'})
  })

  it('shows the image for a new src without ever committing the initials fallback', () => {
    const frames: AvatarFrame[] = []

    const {rerender} = render(
      <>
        <Avatar initials="AB" src="/broken.png" />
        <FrameRecorder frames={frames} />
      </>,
    )

    fireEvent.error(document.querySelector('img')!)
    expect(readAvatarFrame()).toEqual({imageSrc: null, initials: 'AB'})

    const firstFrameAfterSrcChange = frames.length

    rerender(
      <>
        <Avatar initials="AB" src="/working.png" />
        <FrameRecorder frames={frames} />
      </>,
    )

    expect(readAvatarFrame()).toEqual({imageSrc: '/working.png', initials: ''})
    expect(frames.slice(firstFrameAfterSrcChange)).not.toContainEqual({
      imageSrc: null,
      initials: 'AB',
    })
  })

  it('keeps the initials when src is removed after a failure', () => {
    const {rerender} = render(<Avatar initials="AB" src="/broken.png" />)

    fireEvent.error(document.querySelector('img')!)

    rerender(<Avatar initials="AB" />)

    expect(readAvatarFrame()).toEqual({imageSrc: null, initials: 'AB'})
  })

  it('falls back again when a replacement image also fails', () => {
    const {rerender} = render(<Avatar initials="AB" src="/broken.png" />)

    fireEvent.error(document.querySelector('img')!)
    rerender(<Avatar initials="AB" src="/also-broken.png" />)

    expect(readAvatarFrame()).toEqual({imageSrc: '/also-broken.png', initials: ''})

    fireEvent.error(document.querySelector('img')!)

    expect(readAvatarFrame()).toEqual({imageSrc: null, initials: 'AB'})
  })
})
