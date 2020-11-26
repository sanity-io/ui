import React, {useCallback} from 'react'

export function AutocompleteOption(props: {
  children: React.ReactNode
  id: string
  onSelect: (v: string) => void
  selected: boolean
  value: string
}) {
  const {children, id, onSelect, selected, value} = props

  const handleClick = useCallback(() => {
    onSelect(value)
  }, [onSelect, value])

  return (
    <li aria-selected={selected} id={id} role="presentation" onClick={handleClick}>
      {children}
    </li>
  )
}
