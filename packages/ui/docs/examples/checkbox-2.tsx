import {Checkbox} from '@sanity/ui'

// Row selection in a table. Each Checkbox is named by the row's name cell with
// aria-labelledby, so screen readers announce "Select Ada Lovelace" without printing
// the name beside every checkbox. The header checkbox has no visible text to point at,
// so it uses aria-label.
//
// The header checkbox is the "select all" parent: `indeterminate` renders the
// mixed mark when some but not all rows are selected. Set `checked` false
// while indeterminate is true — the mixed mark replaces the tick.

export function SelectableRows({
  rows,
  selected,
  onToggleRow,
  onToggleAll,
}: {
  rows: {id: string; name: string}[]
  selected: string[]
  onToggleRow: (id: string) => void
  onToggleAll: (checked: boolean) => void
}) {
  const allSelected = rows.length > 0 && selected.length === rows.length
  const someSelected = selected.length > 0 && !allSelected

  return (
    <table>
      <thead>
        <tr>
          <th>
            <Checkbox
              aria-label="Select all rows"
              checked={allSelected}
              indeterminate={someSelected}
              onChange={(event) => onToggleAll(event.currentTarget.checked)}
            />
          </th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>
              <Checkbox
                aria-labelledby={`row-${row.id}-name`}
                checked={selected.includes(row.id)}
                onChange={() => onToggleRow(row.id)}
              />
            </td>
            <td id={`row-${row.id}-name`}>{row.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
