import {Box, useTheme_v2} from '@sanity/ui'
import {createContext, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {styled} from 'styled-components'

const Root = styled(Box)`
  scrollbar-gutter: stable;
`

/** How far the content of a scroll area sits from its edges, in pixels */
interface ScrollAreaInset {
  left: number
  right: number
  bottom: number
}

const ScrollAreaInsetContext = createContext<ScrollAreaInset>({left: 0, right: 0, bottom: 0})

/**
 * The scrolling body of a sidebar flow. It always reserves the scrollbar's
 * space, so the content does not shift when the list grows or shrinks past
 * the point where it needs to scroll — and it takes that space out of its
 * right padding, so the content stays centered rather than hugging the left.
 * With overlay scrollbars there is no gutter and the padding stays even.
 *
 * @internal
 */
export function ScrollArea(props: {children: React.ReactNode; padding: number}) {
  const {children, padding} = props
  const {space} = useTheme_v2()
  const ref = useRef<HTMLDivElement | null>(null)
  const [gutter, setGutter] = useState(0)

  useEffect(() => {
    const element = ref.current

    if (!element) return undefined

    // The reserved gutter is the part of the box the content cannot use
    const measure = () => setGutter(element.offsetWidth - element.clientWidth)

    measure()

    const observer = new ResizeObserver(measure)

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const inset = useMemo<ScrollAreaInset>(
    () => ({
      left: space[padding],
      right: Math.max(0, space[padding] - gutter),
      bottom: space[padding],
    }),
    [gutter, padding, space],
  )

  return (
    <Root flex={1} overflow="auto" padding={padding} ref={ref} style={{paddingRight: inset.right}}>
      <ScrollAreaInsetContext.Provider value={inset}>{children}</ScrollAreaInsetContext.Provider>
    </Root>
  )
}

/**
 * Content that runs edge to edge in a scroll area — up to the scrollbar —
 * instead of sitting inside its padding. It goes last: it runs down to the
 * bottom edge too.
 *
 * @internal
 */
export function ScrollAreaBleed(props: {children: React.ReactNode}) {
  const {left, right, bottom} = useContext(ScrollAreaInsetContext)

  return (
    <div style={{marginLeft: -left, marginRight: -right, marginBottom: -bottom}}>
      {props.children}
    </div>
  )
}
