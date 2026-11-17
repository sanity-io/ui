import type {KeyboardEvent} from 'react'

export function handleFocusKeyDown(
  e: KeyboardEvent<HTMLDivElement>,
  selector: string,
  orientation: 'horizontal' | 'vertical' = 'vertical',
) {
  if (e.altKey || e.ctrlKey || e.metaKey) {
    return
  }

  const list = e.currentTarget
  const items = Array.from(list.querySelectorAll<HTMLElement>(selector))
  const focusedIndex = items.indexOf(document.activeElement as HTMLElement)

  if (
    (orientation === 'horizontal' && e.key === 'ArrowLeft') ||
    (orientation === 'vertical' && e.key === 'ArrowUp')
  ) {
    e.preventDefault()

    if (focusedIndex === -1) {
      items[items.length - 1]?.focus()
    } else {
      items[(focusedIndex - 1 + items.length) % items.length]?.focus()
    }
  }

  if (
    (orientation === 'horizontal' && e.key === 'ArrowRight') ||
    (orientation === 'vertical' && e.key === 'ArrowDown')
  ) {
    e.preventDefault()

    if (focusedIndex === -1) {
      items[0]?.focus()
    } else {
      items[(focusedIndex + 1) % items.length]?.focus()
    }
  }

  if (e.key === 'Home') {
    e.preventDefault()
    items[0]?.focus()
  }

  if (e.key === 'End') {
    e.preventDefault()
    items[items.length - 1]?.focus()
  }
}
