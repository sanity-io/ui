import {css} from 'styled-components'

/**
 * @internal
 */
export function fontColorStyle(props: {
  $accent?: boolean
  $muted?: boolean
}): ReturnType<typeof css> | undefined {
  if (props.$muted) {
    return css`
      color: var(--card-muted-fg-color);
    `
  }

  if (props.$accent) {
    return css`
      color: var(--card-accent-fg-color);
    `
  }

  return undefined
}
