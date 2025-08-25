import { type GridProps, type GridColProps, Grid as MantineGrid } from '@mantine/core'

import { GridWrapper } from './styles'

/**
 * A custom Grid component that wraps the Mantine Grid and styles it according to the VDS design spec.
 *
 * This grid has 12 columns (default gutter: 2.5rem). Make sure to use the Col component to define the columns.
 *
 * @example
 * import Grid from '~/components/Grid'
 *
 * const MyComponent = () => {
 *   return (
 *     <Grid>
 *       <Grid.Col span={4}>Foo</Grid.Col>
 *       <Grid.Col span={4}>Bar</Grid.Col>
 *       <Grid.Col span={4}>Baz</Grid.Col>
 *     </Grid>
 *   )
 * }
 *
 * @see https://v7.mantine.dev/core/grid/
 */
const Grid = (props: GridProps) => {
  return <GridWrapper gutter={props.gutter ?? '2.5rem'} {...props} />
}

export default Grid
Grid.Col = MantineGrid.Col
export type { GridProps, GridColProps }
