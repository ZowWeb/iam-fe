import { IconChevronLeft } from '@tabler/icons-react'
import { TitleLockup } from '@vds/type-lockups'
import type { MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import IamHero from '~/components/IamHero'
import FlexBox from '~/components/FlexBox'
import Link from '~/components/Link'
import { COLORS } from '~/styles/constants'
import ActionToolbar from '~/components/ActionToolbar'
import Table from '~/components/AdvancedTable'
import Block from '~/components/Block'
import type { PolicyTag } from '~/types/data'
import useMember from '~/hooks/useMember'
import { FooterContainer, FooterItemWrapper, Label, Value } from './styles'

const columns: MRTColumnDef<PolicyTag>[] = [
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

const policyTags: PolicyTag[] = [{ id: 'pt-dummy01', policyTagName: 'Team access' }]

const MemberPage = () => {
  const { teamId, userId } = useParams({ from: '/_authenticated/teams/$teamId/users/$userId' })
  const { member } = useMember({ userId })
  /**
 * Uncomment when APIFIAM-606 is ready
  const { policyTags } = usePolicyTagsByPrincipal({
    teamId,
    principalId: userId,
  })
 */

  const navigate = useNavigate()

  const handleActionButtonClick = () => {
    navigate({ to: '/teams/$teamId/users/$userId/roles', params: { teamId, userId } })
  }

  const footerItems = useMemo(
    () => [
      {
        label: 'Email',
        value: member?.email,
      },
      {
        label: 'VZRN',
        value: '6340634063406340',
      },
      {
        label: 'Last signed in',
        value: 'July 21, 2025 12:24 PM',
      },
    ],
    [member],
  )

  const footerItemsJSX = useMemo(
    () => (
      <FooterContainer alignItems="flex-start">
        {footerItems.map(item => (
          <FooterItemWrapper key={item.label} direction="column" alignItems="flex-start">
            <Label>{item.label}</Label>
            <Value>{item.value}</Value>
          </FooterItemWrapper>
        ))}
      </FooterContainer>
    ),
    [footerItems],
  )

  return (
    <Block>
      <Link to="..">
        <FlexBox>
          <IconChevronLeft size={20} />
          <span>Back to member list</span>
        </FlexBox>
      </Link>
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
      <IamHero title={member?.displayName || 'Member name'} showActionButton>
        {footerItemsJSX}
      </IamHero>
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
              'Policies define the specific permissions this member has to perform actions and access resources.',
          },
        }}
      />
      <ActionToolbar ctaConfig={{ label: 'Manage policies', onClick: handleActionButtonClick }} />
      <Table {...{ data: policyTags, columns }} />
    </Block>
  )
}

export default MemberPage
