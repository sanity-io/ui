import {type RefObject, useEffect, useState} from 'react'

/** The Studio navbar's root, the `Card` that draws its bottom border */
const NAVBAR_SELECTOR = '[data-ui="Navbar"]'

/**
 * The height of the Studio navbar inside the given element, in pixels — kept
 * up to date as the navbar renders, remounts and resizes, and `null` until
 * there is one. The themer's header takes this height, so that its bottom
 * border lines up with the navbar's whatever height the Studio version, its
 * breakpoint or a custom navbar gives it.
 *
 * @internal
 */
export function useStudioNavbarHeight(ref: RefObject<HTMLElement | null>): number | null {
  const [height, setHeight] = useState<number | null>(null)

  useEffect(() => {
    const root = ref.current

    if (!root) return undefined

    let navbar: Element | null = null
    const resizeObserver = new ResizeObserver(() => {
      if (navbar) setHeight(navbar.getBoundingClientRect().height)
    })

    // The navbar can render after the layout (the Studio suspends while it
    // loads) and remount (switching workspaces), so it is looked up again
    // whenever the Studio's DOM changes — cheap, as it sits near the top
    const observeNavbar = () => {
      const next = root.querySelector(NAVBAR_SELECTOR)

      if (next === navbar) return

      if (navbar) resizeObserver.unobserve(navbar)

      navbar = next

      if (navbar) {
        resizeObserver.observe(navbar)
        setHeight(navbar.getBoundingClientRect().height)
      } else {
        setHeight(null)
      }
    }

    const mutationObserver = new MutationObserver(observeNavbar)

    mutationObserver.observe(root, {childList: true, subtree: true})
    observeNavbar()

    return () => {
      mutationObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [ref])

  return height
}
