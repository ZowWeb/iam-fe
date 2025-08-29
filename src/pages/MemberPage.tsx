import { IconChevronLeft } from '@tabler/icons-react'
import { TitleLockup } from '@vds/type-lockups'
import { styled } from '@linaria/react'
import type { MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'
import { useNavigate, useParams } from '@tanstack/react-router'

import IamHero from '~/components/IamHero'
import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import Link from '~/components/Link'
import { COLORS } from '~/styles/constants'
import ActionToolbar from '~/components/ActionToolbar'
import Table from '~/components/AdvancedTable'
import type { Policy } from '~/types/data'

const FooterContainer = styled(FlexBox)`
  gap: 3.25rem;
  flex: 0 1 auto;
`

const FooterItemWrapper = styled(FlexBox)`
  flex: 0 1 max-content;
  gap: 0.5rem;
  word-break: break-all;
`

const Label = styled(Typography.Span)`
  font-size: 0.875rem;
  font-weight: 700;
`

const Value = styled(Typography.Span)`
  font-size: 0.875rem;
`

const footerItems = [
  {
    label: 'Email',
    value: 'jane.doe@email.com',
  },
  {
    label: 'VZRN',
    value: '6340634063406340',
  },
  {
    label: 'Last signed in',
    value: 'July 21, 2025 12:24 PM',
  },
]

const footerItemsJSX = (
  <FooterContainer alignItems="flex-start">
    {footerItems.map(item => (
      <FooterItemWrapper key={item.label} direction="column" alignItems="flex-start">
        <Label>{item.label}</Label>
        <Value>{item.value}</Value>
      </FooterItemWrapper>
    ))}
  </FooterContainer>
)

const data: Policy[] = [
  {
    id: 'p-1',
    name: 'Team access',
    description: 'Can log in to this team and view public details',
    lastUpdated: 'June 22, 2025 12:24 PM',
    applied: 'July 18, 2025 12:24 PM',
  },
]

const columns: MRTColumnDef<Policy>[] = [
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
    accessorKey: 'lastUpdated',
    header: 'Last updated',
    size: 100,
  },
  {
    accessorKey: 'applied',
    header: 'Applied',
    size: 100,
  },
]

const MemberPage = () => {
  const { teamId, userId } = useParams({ from: '/teams/$teamId/users/$userId' })
  const navigate = useNavigate()

  const handleManagePoliciesClick = () => {
    navigate({ to: '/teams/$teamId/users/$userId/policies', params: { teamId, userId } })
  }

  return (
    <>
      <Link to="..">
        <FlexBox customStyle={{ marginBottom: '2rem' }}>
          <IconChevronLeft name="arrow-left" size={20} />
          <span>Back to member list</span>
        </FlexBox>
      </Link>
      <FlexBox direction="column" gap="2.5rem">
        <TitleLockup
          data={{
            title: {
              size: 'titleLarge',
              bold: false,
              children: 'Member details',
              color: COLORS.brandHighlight,
            },
            subtitle: {
              size: 'bodyLarge',
              children: 'View details of this member and manage their access.',
            },
          }}
        />
        <IamHero title="John Doe" showActionButton>
          {footerItemsJSX}
        </IamHero>
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
        <ActionToolbar ctaConfig={{ label: 'Manage policies', onClick: handleManagePoliciesClick }} />
        <Table {...{ data, columns }} />
      </FlexBox>
    </>
  )
}

export default MemberPage
