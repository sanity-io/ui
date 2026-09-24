import {Box, useTheme_v2} from '@sanity/ui'
import {useEffect, useRef, useState} from 'react'
import {styled} from 'styled-components'

const Root = styled(Box)`
  scrollbar-gutter: stable;
`

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

  return (
    <Root
      flex={1}
      overflow="auto"
      padding={padding}
      ref={ref}
      style={{paddingRight: Math.max(0, space[padding] - gutter)}}
    >
      {children}
    </Root>
  )
}
