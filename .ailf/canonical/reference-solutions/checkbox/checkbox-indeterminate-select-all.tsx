import {Checkbox, VStack} from '@sanity/ui'
import {useState} from 'react'

const ITEMS = ['Posts', 'Pages', 'Authors']

export function SelectAll() {
  const [selected, setSelected] = useState<string[]>(['Posts'])
  const all = selected.length === ITEMS.length
  const some = selected.length > 0 && !all

  return (
    <VStack gap={2}>
      <Checkbox
        label="Select all"
        checked={all}
        indeterminate={some}
        onChange={(e) => setSelected(e.currentTarget.checked ? [...ITEMS] : [])}
      />
      {ITEMS.map((item) => (
        <Checkbox
          key={item}
          label={item}
          checked={selected.includes(item)}
          onChange={(e) =>
            setSelected((prev) =>
              e.currentTarget.checked ? [...prev, item] : prev.filter((i) => i !== item),
            )
          }
        />
      ))}
    </VStack>
  )
}
