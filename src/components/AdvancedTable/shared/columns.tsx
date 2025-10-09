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
    Cell: ({ cell }) => (
      <>
        <span className="label-on-phone">Email</span>
        {cell.getValue<string>()}
      </>
    ),
    size: 100,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date joined',
    Cell: ({ cell }) => (
      <>
        <span className="label-on-phone">Date joined</span>
        {getFormattedDate(cell.getValue<string>())}
      </>
    ),
    size: 100,
  },
  {
    accessorKey: 'lastSignIn',
    header: 'Last sign in',
    Cell: ({ cell }) => (
      <div className="hide-on-phone">
        {cell.getValue<string>() ? getFormattedDate(cell.getValue<string>()) : 'Never'}
      </div>
    ),
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
    Cell: ({ cell }) => (
      <>
        <span className="label-on-phone">Description</span>
        {cell.getValue<string>() || 'Lorem ipsum dolor sit amet'}
      </>
    ),
    size: 100,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last updated',
    Cell: ({ cell }) => (
      <>
        <span className="label-on-phone">Last updated</span>
        {getFormattedDate(cell.getValue<string>())}
      </>
    ),
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
    accessorKey: 'description',
    header: 'Description',
    Cell: () => 'Can log in to this team and view public details', // TODO: Remove when APIFIAM-606 is ready
    size: 100,
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last updated',
    Cell: () => 'Jun 22, 2025 12:24 PM', // TODO: Remove when APIFIAM-606 is ready
    size: 100,
  },
  {
    accessorKey: 'applied',
    header: 'Applied',
    Cell: () => 'Jun 22, 2025 12:24 PM', // TODO: Remove when APIFIAM-606 is ready
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
    Cell: ({ cell }) => (
      <>
        <span className="label-on-phone">Created on</span>
        {getFormattedDate(cell.getValue<string>())}
      </>
    ),
    size: 100,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last updated',
    Cell: ({ cell }) => (
      <>
        <span className="label-on-phone">Last updated</span>
        {getFormattedDate(cell.getValue<string>())}
      </>
    ),
    size: 100,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    Cell: ({ cell }) => (
      <>
        <span className="label-on-phone">Status</span>
        {cell.getValue<string>() || 'Active'}
      </>
    ),
    size: 50,
  },
]
