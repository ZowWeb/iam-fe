import { Button } from '@mantine/core'
import { useState } from 'react'

import Table from '~/components/AdvancedTable'
import { type Person, data as initialData, moreData } from '../mocks/makeData'
import Block from '~/components/Block'
import IamHero from '~/components/IamHero'
import ActionToolbar from '~/components/AdvancedTable/ActionToolbar'
import { VdsTabs, type VdsTabConfig } from '~/components/Vds/Tabs/VdsTabs'
import Grid, { Col } from '~/components/Grid'
import FlexBox from '~/components/FlexBox'

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
    <Block>
      <Grid>
        <Col span={3}>
          <VdsTabs className="left-section" onSelection={() => {}} config={tabsConfig} />
        </Col>
        <Col span={9}>
          <FlexBox direction="column" gap="2.5rem">
            <IamHero title="Members" subtitle="Invite members, remove them , and manage their access." />
            <ActionToolbar onAction={() => {}} actionButtonText="Invite members" />
            <Table data={data} />
            <Button onClick={fetchLatestData} loading={isLoading}>
              Fetch latest data
            </Button>
          </FlexBox>
        </Col>
      </Grid>
    </Block>
  )
}

export default MembersPage
