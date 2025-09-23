import type { MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'

import type { Member, Policy, PolicyTag, ServiceAccount } from '~/types/data'
import { getFormattedDate } from '~/utils/dates'

export const memberColumns: MRTColumnDef<Member>[] = [
  {
    accessorKey: 'displayName',
    header: 'Display Name',
    size: 100,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 100,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date joined',
    Cell: ({ cell }) => getFormattedDate(cell.getValue<string>()),
    size: 100,
  },
  {
    accessorKey: 'lastSignIn',
    header: 'Last sign in',
    Cell: ({ cell }) => getFormattedDate(cell.getValue<string>()),
    size: 100,
  },
]

export const policyColumns: MRTColumnDef<Policy>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 100,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 100,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last updated',
    Cell: ({ cell }) => getFormattedDate(cell.getValue<string>()),
    size: 100,
  },
]

export const policyTagColumns: MRTColumnDef<PolicyTag>[] = [
  {
    accessorKey: 'policyTagName',
    header: 'Name',
    size: 100,
  },
  {
    accessorKey: 'description', // TODO: Review field not present.
    header: 'Description',
    size: 100,
  },
  {
    accessorKey: 'updatedAt', // TODO: Review field not present.
    header: 'Last updated',
    Cell: ({ cell }) => getFormattedDate(cell.getValue<string>()),
    size: 100,
  },
]

export const serviceAccountColumns: MRTColumnDef<ServiceAccount>[] = [
  {
    accessorKey: 'displayName',
    header: 'Name',
    size: 100,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created on',
    Cell: ({ cell }) => getFormattedDate(cell.getValue<string>()),
    size: 100,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last updated',
    Cell: ({ cell }) => getFormattedDate(cell.getValue<string>()),
    size: 100,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 50,
  },
]
