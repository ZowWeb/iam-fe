import { useMemo, useState } from 'react'
import { MantineReactTable, type MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'
import { Button, Flex, Title } from '@mantine/core'
import { type Person, data as initialData, moreData } from './makeData'

const Table = () => {
  const [data, setData] = useState<Person[]>(initialData)
  const [isLoading, setIsLoading] = useState(false)

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
    <>
      <Title order={1} align="center" m="30px">
        Advanced React Table
      </Title>
      <MantineReactTable
        columns={columns}
        data={data}
        // optionally override the default column widths
        defaultColumn={{
          maxSize: 400,
          minSize: 80,
          size: 60,
        }}
        enableRowNumbers
        enableColumnResizing
        columnResizeMode="onChange"
        enableColumnOrdering
        enableColumnDragging
        state={{ isLoading }}
      />
      <Flex justify="center" align="center" mt={20}>
        <Button onClick={fetchLatestData} loading={isLoading} m="20px auto 0" align="center">
          Fetch latest data
        </Button>
      </Flex>
    </>
  )
}

export default Table
