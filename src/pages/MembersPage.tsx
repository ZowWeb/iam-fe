import { Button } from '@mantine/core'
import { useState } from 'react'
import { styled } from '@linaria/react'

import Table from '~/components/AdvancedTable'
import { type Person, data as initialData, moreData } from '../mocks/makeData'
import Block from '~/components/Block'
import IamHero from '~/components/IamHero'
import ActionToolbar from '~/components/AdvancedTable/ActionToolbar'
import FlexBox from '~/components/FlexBox'
import { VdsTabs, type VdsTabConfig } from '~/components/Vds/Tabs/VdsTabs'

const BlockWrapper = styled(Block)`
  align-items: flex-start;
  gap: 2.5rem;

  .letf-section {
    flex: 1 0 20%;
  }

  .right-section {
    flex: 1 0 80%;
  }
`

const tabsConfig: VdsTabConfig[] = [
  { id: 'teamDetails', label: 'Team Details' },
  { id: 'members', label: 'Members', selected: true },
  { id: 'policies', label: 'Policies' },
  { id: 'serviceAccounts', label: 'Service accounts' },
]

const MembersPage = () => {
  const [data, setData] = useState<Person[]>(initialData)
  const [isLoading, setIsLoading] = useState(false)

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
    <BlockWrapper>
      <VdsTabs className="left-section" onSelection={() => {}} config={tabsConfig} />
      <FlexBox direction="column" className="right-section">
        <IamHero />
        <ActionToolbar onAction={() => {}} actionButtonText="Invite members" />
        <Table data={data} />
        <div className="my-4">
          <Button onClick={fetchLatestData} loading={isLoading}>
            Fetch latest data
          </Button>
        </div>
      </FlexBox>
    </BlockWrapper>
  )
}

export default MembersPage
