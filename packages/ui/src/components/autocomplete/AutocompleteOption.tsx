import {_isEnterToClickElement} from '@sanity/ui/core'
import {type KeyboardEvent, type ReactNode} from 'react'

export interface AutocompleteOptionProps {
  /**
   * The content to render inside the option.
   */
  children: ReactNode
  /**
   * A unique identifier for the option element, used for accessibility.
   */
  id: string
  /**
   * A callback that fires when the option is selected.
   */
  onSelect: (v: string) => void
  /**
   * Whether this option is currently highlighted in the list.
   */
  selected: boolean
  /**
   * The value associated with this option, passed to `onSelect` when chosen.
   */
  value: string
}

export function AutocompleteOption(props: AutocompleteOptionProps): React.JSX.Element {
  const {children, id, onSelect, selected, value} = props

  const handleClick = () => {
    // Calling the `onSelect` in a timeout is a fix to
    // allow the `click` event to propagate in some cases
    setTimeout(() => {
      onSelect(value)
    }, 0)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter' && !_isEnterToClickElement(event.currentTarget)) {
      handleClick()
    }
  }

  return (
    <li
      aria-selected={selected}
      data-ui="AutocompleteOption"
      id={id}
      role="option"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </li>
  )
}
