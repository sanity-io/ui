/* eslint-disable react-refresh/only-export-components */

import {Card, Flex, Grid, Text} from '@sanity/ui'
import type {ColorScheme} from '@sanity/ui/theme'

interface MatrixBuilderProps<Rows extends string[], Cols extends string[]> {
  scheme?: ColorScheme
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
        <Flex key={column + 'head'} align={'center'}>
          <Text
            style={{textTransform: 'capitalize', textAlign: 'center', width: '100%'}}
            weight="semibold"
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
    <Card border padding={4} radius={2} scheme={scheme}>
      <Grid
        gapX={3}
        gapY={2}
        style={{
          gridTemplateColumns: `repeat(${columns.length + 1}, auto)`,
          gridTemplateRows: `repeat(${rows.length + 1}, auto)`,
        }}
      >
        {/* First row, columns titles */}
        <FirstRow columns={columns} title={title} />
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
}: MatrixBuilderProps<Rows, Cols>): React.JSX.Element {
  return (
    <Table columns={columns} rows={rows} scheme={scheme} subHeader={subHeader} title={title}>
      {rows.map((row) => (
        <Row key={row} row={row}>
          {columns.map((column) => renderItem({row, column}))}
        </Row>
      ))}
    </Table>
  )
}
