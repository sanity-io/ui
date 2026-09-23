import {Box} from '@sanity/ui'
import {styled} from 'styled-components'

/**
 * The scrolling body of a sidebar flow. It always reserves the scrollbar's
 * space, so the content does not shift when the list grows or shrinks past
 * the point where it needs to scroll.
 *
 * @internal
 */
export const ScrollArea = styled(Box)`
  scrollbar-gutter: stable;
`
