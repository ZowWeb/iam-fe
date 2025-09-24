import { TitleLockup } from '@vds/type-lockups'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Button } from '@vds/buttons'

import usePolicyTagsByPrincipal from '~/hooks/withSuspense/usePolicyTagsByPrincipal'
import { Width, Card } from './styles'
import Table from '~/components/AdvancedTable'
import ActionToolbar from '~/components/ActionToolbar'
import { policyTagColumns } from '~/components/AdvancedTable/shared/columns'

export default function RolesTab() {
  const { teamId, serviceAccountId } = useParams({
    from: '/_authenticated/teams/$teamId/service-accounts/$serviceAccountId/',
  })
  const { policyTags, isLoading } = usePolicyTagsByPrincipal({ teamId, principalId: serviceAccountId })
  const isPolicyTagsDataAvailable = policyTags.length > 0
  const navigate = useNavigate()

  const handleActionButtonClick = () => {
    navigate({
      to: '/teams/$teamId/service-accounts/$serviceAccountId/roles',
      params: { teamId, serviceAccountId },
    })
  }

  return isPolicyTagsDataAvailable ? (
    <>
      <TitleLockup
        data={{
          title: {
            primitive: 'h4',
            size: 'titleMedium',
            children: 'Applied roles',
          },
          subtitle: {
            primitive: 'p',
            size: 'bodyLarge',
            children:
              'Roles define the specific permissions this member has to perform actions and access resources.',
          },
        }}
      />
      <ActionToolbar ctaConfig={{ label: 'Manage roles', onClick: handleActionButtonClick }} />
      <Table
        {...{
          data: policyTags,
          columns: policyTagColumns,
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
              children: 'No Roles Assigned',
            },
            subtitle: {
              size: 'bodyLarge',
              children:
                'Roles control what actions this service account can perform and what resources it can access. Add roles to grant the necessary permissions.',
            },
          }}
        />
      </Width>
      <Button size="large" use="primary" onClick={handleActionButtonClick}>
        Add roles
      </Button>
    </Card>
  )
}
