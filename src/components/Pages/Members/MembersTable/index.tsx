import { type MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'

import Table from '~/components/AdvancedTable'
import type { Person } from '~/mocks/makeData'
import { StyledMenuItem } from './styles'

const columns: MRTColumnDef<Person>[] = [
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
]

type MembersTableProps = {
  data: Person[]
}

export default function MembersTable({ data }: MembersTableProps) {
  return (
    <Table<Person>
      data={data}
      columns={columns}
      enableRowActions
      renderRowActionMenuItems={
        <>
          {['Resend invite', 'Cancel invite'].map(item => (
            <StyledMenuItem>{item}</StyledMenuItem>
          ))}
        </>
      }
    />
  )
}
