import {Card, Text} from '../../../src/primitives'

interface MatrixBuilderProps<Rows extends string[], Cols extends string[]> {
  scheme: 'light' | 'dark'
  columns: Cols
  rows: Rows
  title: string
  renderItem: ({row, column}: {row: Rows[number]; column: Cols[number]}) => React.ReactNode
}

/**
 * Creates a two dimensions matrix if components, to be used in Storybook when having a component
 * that has multiple styles that can be combined.
 */
export function MatrixBuilder<Rows extends string[], Cols extends string[]>({
  scheme,
  columns,
  rows,
  title,
  renderItem,
}: MatrixBuilderProps<Rows, Cols>): JSX.Element {
  return (
    <Card scheme={scheme} padding={4} border marginBottom={4}>
      <table
        style={{
          borderCollapse: 'collapse',
          tableLayout: 'fixed',
          width: '100%',
          borderSpacing: '10px 10px',
        }}
      >
        <thead>
          <tr>
            <th>
              <Text weight="semibold">{title}</Text>
            </th>
            {columns.map((column) => (
              <th key={column + 'head'}>
                <Text weight="semibold" style={{textTransform: 'capitalize'}}>
                  {column}
                </Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{borderTop: '16px solid transparent'}}>
          {rows.map((row) => (
            <tr
              key={row}
              style={{
                borderBottom: '16px solid transparent',
              }}
            >
              <td style={{verticalAlign: 'middle', textAlign: 'center'}}>
                <Text
                  style={{
                    textTransform: 'capitalize',
                  }}
                >
                  {row}
                </Text>
              </td>
              {columns.map((column) => (
                <td key={column + row} style={{verticalAlign: 'middle', textAlign: 'center'}}>
                  {renderItem({column, row})}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
