import { useMemo, useState } from 'react'
import { type MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'
import { Button, Title, Checkbox } from '@mantine/core'
import { type Person, data as initialData, moreData } from '../mocks/makeData'
import Table from '@/components/AdvancedTable'
import classes from './Pages.module.scss'

export function AdvancedTablePage() {
  const [data, setData] = useState<Person[]>(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [enableRowSelection, setEnableRowSelection] = useState(true)
  const [enableSorting, setEnableSorting] = useState(false)

  const columns = useMemo<MRTColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 100,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        enableResizing: false, // disable resizing for this column
        size: 100,
      },
      {
        accessorKey: 'email',
        header: 'Email Address',
        size: 200,
      },
      {
        accessorKey: 'timeInVerzion',
        header: 'Time in Verzion (months)',
        size: 120,
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 100,
      },
    ],
    [],
  )

  const fetchLatestData = async () => {
    setIsLoading(true)
    // wait 2 seconds
    await new Promise(resolve => {
      setTimeout(resolve, 2000)
    })
    setData([...data, ...moreData])
    setIsLoading(false)
  }

  return (
    <div className={classes.container}>
      <Title order={1} align="center" m="30px">
        Advanced React Table
      </Title>
      <Table
        columns={columns}
        data={data}
        enableRowSelection={enableRowSelection}
        enableSorting={enableSorting}
      />
      <div className={classes.advanced_table_page_bottom}>
        <Button onClick={fetchLatestData} loading={isLoading}>
          Fetch latest data
        </Button>
        <Checkbox
          checked={enableRowSelection}
          label="Enable Row Selection"
          onChange={() => setEnableRowSelection(!enableRowSelection)}
        />
        <Checkbox
          checked={enableSorting}
          label="Enable Sorting"
          onChange={() => setEnableSorting(!enableSorting)}
        />
      </div>
    </div>
  )
}
