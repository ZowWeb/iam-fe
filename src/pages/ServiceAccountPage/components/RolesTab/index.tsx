import { TitleLockup } from '@vds/type-lockups'
import { useParams } from '@tanstack/react-router'
import { Button } from '@vds/buttons'
import type { MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'

import usePolicyTagsByPrincipal from '~/hooks/suspense/usePolicyTagsByPrincipal'
import { Width, Card } from './styles'
import Table from '~/components/AdvancedTable'
import type { PolicyTag } from '~/types/data'
import ActionToolbar from '~/components/ActionToolbar'
import { getFormattedDate } from '~/utils/dates'

const columns: MRTColumnDef<PolicyTag>[] = [
  {
    accessorKey: 'policyTagName',
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
  {
    accessorKey: 'appliedAt',
    header: 'Applied',
    Cell: ({ cell }) => getFormattedDate(cell.getValue<string>()),
    size: 100,
  },
]

export default function RolesTab() {
  const { teamId, serviceAccountId } = useParams({
    from: '/_authenticated/teams/$teamId/service-accounts/$serviceAccountId/',
  })
  const { policyTags, isLoading } = usePolicyTagsByPrincipal({ teamId, principalId: serviceAccountId })
  const isPolicyTagsDataAvailable = policyTags?.length > 0

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isPolicyTagsDataAvailable ? (
        <>
          <TitleLockup
            data={{
              title: {
                primitive: 'h4',
                size: 'titleMedium',
                children: 'Applied policies',
              },
              subtitle: {
                primitive: 'p',
                size: 'bodyLarge',
                children:
                  'Policies define the specific permissions this member has to perform actions and access resources.',
              },
            }}
          />
          <ActionToolbar ctaConfig={{ label: 'Manage roles', onClick: () => {} }} />
          <Table
            {...{
              data: policyTags,
              columns,
              isLoading,
              enableRowActions: false,
              rowActionMenuItems: undefined,
            }}
          />
        </>
      ) : (
        <Card direction="column" justifyContent="center">
          <Width>
            <TitleLockup
              textAlignment="center"
              data={{
                title: {
                  size: 'titleLarge',
                  bold: true,
                  children: 'No Policies Assigned',
                },
                subtitle: {
                  size: 'bodyLarge',
                  children:
                    'Policies control what actions this service account can perform and what resources it can access. Add policies to grant the necessary permissions.',
                },
              }}
            />
          </Width>
          <Button size="large" use="primary" onClick={() => {}}>
            Add policies
          </Button>
        </Card>
      )}
    </>
  )
}
