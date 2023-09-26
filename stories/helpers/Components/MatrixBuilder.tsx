import {Card, Flex, Grid, Text} from '../../../src/primitives'

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
    <Card scheme={scheme} padding={4} border radius={2}>
      <Grid columns={columns.length + 1} rows={rows.length + 1} gap={2}>
        {/* First row, columns titles */}
        <Flex align={'center'}>
          <Text weight="semibold">{title}</Text>
        </Flex>
        {columns.map((column) => (
          <Flex align={'center'} key={column + 'head'}>
            <Text
              weight="semibold"
              style={{textTransform: 'capitalize', textAlign: 'center', width: '100%'}}
            >
              {column}
            </Text>
          </Flex>
        ))}

        {/* Rows titles and items */}
        {rows.map((row) => (
          <>
            <Flex align={'center'}>
              <Text style={{textTransform: 'capitalize'}}>{row}</Text>
            </Flex>
            {columns.map((column) => (
              <Flex key={column + row} style={{verticalAlign: 'middle', textAlign: 'center'}}>
                {renderItem({column, row})}
              </Flex>
            ))}
          </>
        ))}
      </Grid>
    </Card>
  )
}
