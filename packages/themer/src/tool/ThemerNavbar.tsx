import {ColorWheelIcon} from '@sanity/icons/ColorWheel'
import {Button, Text} from '@sanity/ui'
import {Tooltip} from '@sanity/ui/tooltip'
import {animate, useMotionValue} from 'motion/react'
import {useCallback, useEffect, useState} from 'react'
import {type NavbarProps} from 'sanity'

import {AnimatedColorWheelIcon} from './AnimatedColorWheelIcon'
import {ANIMATION_DURATION} from './colorWheel'
import {ThemerContextValue, useThemer} from './context'
import {hasVisited, markVisited} from './storage'
import {NAVBAR_SELECTOR} from './useStudioNavbarHeight'

/**
 * Opens or closes the sidebar — and notes the visit, which is what stops the
 * navbar from introducing the tool
 */
function toggleSidebar(send: ThemerContextValue['send']) {
  markVisited()
  send({type: 'sidebar.toggle'})
}

/**
 * Whether the navbar has had its one chance per page load to introduce the
 * tool. Module state rather than component state on purpose: the button
 * remounts with the navbar (switching workspaces, crossing the narrow-screen
 * breakpoint) and renders once per Studio copy in the split preview, and none
 * of those should earn another introduction — only loading the page again does.
 */
let introduced = false

/**
 * The topbar toggle, with an icon that plays its color wheel animation: on
 * hovering the button, every time; and on hovering the navbar it sits in,
 * once — a "hey, look, new tool!" for anyone who has never opened the
 * sidebar, which the visit noted by {@link toggleSidebar} ends for good.
 */
function ThemerNavbarButton() {
  const {open, send} = useThemer()
  const progress = useMotionValue(0)
  // The button element comes through state rather than a ref: the tooltip
  // wraps the button and hands the element on once it has rendered, which is
  // after a plain ref would have been read
  const [button, setButton] = useState<HTMLButtonElement | null>(null)

  const play = useCallback(() => {
    // A run in progress plays out — hovering again does not cut it short
    if (progress.isAnimating()) return

    animate(progress, [0, 1], {duration: ANIMATION_DURATION, ease: 'linear'})
  }, [progress])

  useEffect(() => () => progress.stop(), [progress])

  useEffect(() => {
    const navbar = button?.closest(NAVBAR_SELECTOR)

    if (!navbar || introduced) return undefined

    const introduce = () => {
      // Another navbar (the split preview's) may have had the chance meanwhile
      if (introduced) return

      introduced = true
      // Checked as the pointer comes in, not up front: a click in between
      // (on the button itself) counts
      if (!hasVisited()) play()
    }

    navbar.addEventListener('mouseenter', introduce, {once: true})

    return () => navbar.removeEventListener('mouseenter', introduce)
  }, [button, play])

  return (
    <Tooltip animate content={<Text size={1}>Themer</Text>} portal>
      <Button
        aria-label="Themer"
        icon={<AnimatedColorWheelIcon progress={progress} />}
        mode="bleed"
        onClick={() => toggleSidebar(send)}
        onMouseEnter={play}
        // The Studio's own navbar buttons go through a wrapper that pins them
        // to this padding, where `@sanity/ui` defaults to a roomier 3
        padding={2}
        ref={setButton}
        selected={open}
      />
    </Tooltip>
  )
}

/**
 * Adds the toggle that opens and closes the themer sidebar to the Studio
 * navbar — an icon button with a tooltip in the top bar (like the Tasks
 * toggle), and a regular titled action in the narrow-screen sidebar menu.
 *
 * In the split preview every Studio copy renders its own navbar, so the
 * toggle shows up in both — they drive the same sidebar.
 *
 * @internal
 */
export function ThemerNavbar(props: NavbarProps) {
  const {open, send} = useThemer()

  return props.renderDefault({
    ...props,
    __internal_actions: [
      ...(props.__internal_actions ?? []),
      {
        location: 'topbar',
        name: 'themer-topbar',
        // The component itself rather than a `() => <ThemerNavbarButton />`
        // wrapper: the Studio renders `render` as a component, and a wrapper
        // made anew on every render would remount the button each time —
        // resetting its animation and its once-only introduction
        render: ThemerNavbarButton,
      },
      {
        icon: ColorWheelIcon,
        location: 'sidebar',
        name: 'themer-sidebar',
        onAction: () => toggleSidebar(send),
        selected: open,
        title: 'Themer',
      },
    ],
  })
}
