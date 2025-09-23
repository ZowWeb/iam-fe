import { IconChevronLeft } from '@tabler/icons-react'
import { TitleLockup } from '@vds/type-lockups'
import { useState } from 'react'
import { useParams } from '@tanstack/react-router'

import Block from '~/components/Block'
import FlexBox from '~/components/FlexBox'
import Link from '~/components/Link'
import { VdsTabs, type TabItem } from '~/components/Vds/Tabs'
import { COLORS } from '~/styles/constants'
import { getFormattedDate } from '~/utils/dates'
import { FooterContainer, FooterItemWrapper, Label, Value } from './styles'
import usePolicyTag from '~/hooks/usePolicyTag'
import IamHero from '~/components/IamHero'
import PoliciesTab from './components/PoliciesTab'
import MembersTab from './components/MembersTab'
import ServiceAccountsTab from './components/ServiceAccountsTab'

const tabIds = {
  POLICIES: 'policies',
  MEMBERS: 'members',
  SERVICE_ACCOUNTS: 'service_accoutns',
}

const tabs: TabItem[] = [
  { id: tabIds.POLICIES, label: 'Policies' },
  { id: tabIds.MEMBERS, label: 'Members' },
  { id: tabIds.SERVICE_ACCOUNTS, label: 'Service Accounts' },
]

const footerItems = [
  {
    label: 'Last update',
    value: getFormattedDate(new Date().toUTCString()),
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

export default function RolePage() {
  const { teamId, policyTagId } = useParams({ from: '/_authenticated/teams/$teamId/roles/$policyTagId/' })
  const { policyTag } = usePolicyTag({ teamId, policyTagId })
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0])

  const handleSelectTabClick = (tab: TabItem) => {
    setSelectedTab(tab)
  }

  return (
    <Block>
      <Link to="..">
        <FlexBox>
          <IconChevronLeft size={20} />
          <span>Back to roles list</span>
        </FlexBox>
      </Link>
      <TitleLockup
        data={{
          title: {
            size: 'titleLarge',
            bold: false,
            children: 'Role details',
            color: COLORS.brandHighlight,
          },
          subtitle: {
            size: 'bodyLarge',
            children: 'View details of this role.',
          },
        }}
      />
      <IamHero
        title={policyTag?.policyTagName || 'Role name'}
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo lorem in diam hendrerit, vel vestibulum elit dapibus. Quisque facilisis justo condimentum "
        showActionButton
      >
        {footerItemsJSX}
      </IamHero>
      <VdsTabs onClick={handleSelectTabClick} tabs={tabs} orientation="horizontal" borderLine />
      {selectedTab.id === tabIds.POLICIES && <PoliciesTab />}
      {selectedTab.id === tabIds.MEMBERS && <MembersTab />}
      {selectedTab.id === tabIds.SERVICE_ACCOUNTS && <ServiceAccountsTab />}
    </Block>
  )
}
