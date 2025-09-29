import { useMemo, useState } from 'react'
import { IconChevronLeft } from '@tabler/icons-react'
import { TitleLockup } from '@vds/type-lockups'
import { styled } from '@linaria/react'
import { useParams } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import IamHero from '~/components/IamHero'
import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'
import Link from '~/components/Link'
import { COLORS } from '~/styles/constants'
import { getFormattedDate } from '~/utils/dates'
import { VdsTabs, type TabItem } from '~/components/Vds/Tabs'
import CredentialsTab from './components/CredentialsTab'
import RolesTab from './components/RolesTab'
import { getServiceAccount } from '~/queries/getServiceAccount'
import Block from '~/components/Block'

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

const tabs: TabItem[] = [
  { id: 'credentials', label: 'Credentials', selected: true },
  { id: 'roles', label: 'Roles' },
]

export default function ServiceAccountPage() {
  const { teamId, serviceAccountId } = useParams({
    from: '/_authenticated/teams/$teamId/service-accounts/$serviceAccountId/',
  })
  const { data: serviceAccount } = useSuspenseQuery(getServiceAccount({ teamId, serviceAccountId }))
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0])

  const footerItems = useMemo(
    () => [
      {
        label: 'Created',
        value: getFormattedDate(serviceAccount.createdAt),
      },
      {
        label: 'Last update',
        value: getFormattedDate(serviceAccount.updatedAt || ''),
      },
    ],
    [serviceAccount],
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

  const handleSelectTabClick = (tab: TabItem) => {
    setSelectedTab(tab)
  }

  return (
    <Block>
      <Link to="..">
        <FlexBox>
          <IconChevronLeft size={20} />
          <span>Back to service account list</span>
        </FlexBox>
      </Link>
      <TitleLockup
        data={{
          title: {
            size: 'titleLarge',
            bold: false,
            children: 'Service account details',
            color: COLORS.brandHighlight,
          },
          subtitle: {
            size: 'bodyLarge',
            children: 'View details of this service account.',
          },
        }}
      />
      <IamHero title={serviceAccount.displayName} showActionButton>
        {footerItemsJSX}
      </IamHero>
      <VdsTabs onClick={handleSelectTabClick} tabs={tabs} orientation="horizontal" borderLine />
      {selectedTab.id === 'credentials' && <CredentialsTab />}
      {selectedTab.id === 'roles' && <RolesTab />}
    </Block>
  )
}
