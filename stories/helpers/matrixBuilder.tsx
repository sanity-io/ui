import {Card, Flex, Grid, Text} from '../../src/primitives'

interface MatrixBuilderProps<Rows extends string[], Cols extends string[]> {
  scheme: 'light' | 'dark'
  columns: Cols
  rows: Rows
  title: string
  subHeader?: React.ReactNode
  renderItem: ({row, column}: {row: Rows[number]; column: Cols[number]}) => React.ReactNode
}

const FirstRow = <Rows extends string[], Cols extends string[]>({
  title,
  columns,
}: Pick<MatrixBuilderProps<Rows, Cols>, 'columns' | 'title'>) => {
  return (
    <>
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
    </>
  )
}

interface RowProps {
  row: string
  children: React.ReactNode
}

const Row = ({row, children}: RowProps) => {
  return (
    <>
      <Flex align={'center'}>
        <Text style={{textTransform: 'capitalize'}}>{row}</Text>
      </Flex>
      {children}
    </>
  )
}

type TableProps<Rows extends string[], Cols extends string[]> = Pick<
  MatrixBuilderProps<Rows, Cols>,
  'scheme' | 'columns' | 'rows' | 'title' | 'subHeader'
> & {
  children: React.ReactNode
}

const Table = <Rows extends string[], Cols extends string[]>({
  children,
  scheme,
  columns,
  rows,
  title,
  subHeader,
}: TableProps<Rows, Cols>) => {
  return (
    <Card scheme={scheme} padding={4} border radius={2}>
      <Grid
        gapX={3}
        gapY={2}
        style={{
          gridTemplateColumns: `repeat(${columns.length + 1}, auto)`,
          gridTemplateRows: `repeat(${rows.length + 1}, auto)`,
        }}
      >
        {/* First row, columns titles */}
        <FirstRow title={title} columns={columns} />
        {subHeader}
        {/* Rows titles and items */}
        {children}
      </Grid>
    </Card>
  )
}

/**
 * Creates a two dimensions matrix if components, to be used in Storybook when having a component
 * that has multiple styles that can be combined.
 */
export function matrixBuilder<Rows extends string[], Cols extends string[]>({
  scheme,
  columns,
  rows,
  title,
  renderItem,
  subHeader,
}: MatrixBuilderProps<Rows, Cols>): JSX.Element {
  return (
    <Table scheme={scheme} columns={columns} rows={rows} title={title} subHeader={subHeader}>
      {rows.map((row) => (
        <Row row={row} key={row}>
          {columns.map((column) => renderItem({row, column}))}
        </Row>
      ))}
    </Table>
  )
}
