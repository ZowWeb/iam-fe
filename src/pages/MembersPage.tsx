import { Button, Menu } from '@mantine/core'
import { useState } from 'react'
import type { MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'
import { styled } from '@linaria/react'

import Table from '~/components/AdvancedTable'
import { data as initialData, moreData } from '../mocks/makeData'
import Block from '~/components/Block'
import IamHero from '~/components/IamHero'
import ActionToolbar from '~/components/AdvancedTable/ActionToolbar'
import { VdsTabs, type VdsTabConfig } from '~/components/Vds/Tabs/VdsTabs'
import Grid, { Col } from '~/components/Grid'
import FlexBox from '~/components/FlexBox'
import type { Person } from '~/types/data'

const tabsConfig: VdsTabConfig[] = [
  { id: 'teamDetails', label: 'Team Details' },
  { id: 'members', label: 'Members', selected: true },
  { id: 'policies', label: 'Policies' },
  { id: 'serviceAccounts', label: 'Service accounts' },
]

const columns: MRTColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
    size: 100,
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    enableResizing: false, // disable resizing for this column
    size: 100,
  },
  {
    accessorKey: 'email',
    header: 'Email Address',
    size: 200,
  },
  {
    accessorKey: 'timeInVerzion',
    header: 'Time in Verzion (months)',
    size: 120,
  },
  {
    accessorKey: 'country',
    header: 'Country',
    size: 100,
  },
]

const StyledMenuItem = styled(Menu.Item)`
  padding: 0.7rem 1.25rem;
  font-size: 1rem;
`

const renderRowActionMenuItems = () => (
  <>
    {['Resend invite', 'Cancel invite'].map(item => (
      <StyledMenuItem>{item}</StyledMenuItem>
    ))}
  </>
)

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
            <Table {...{ data, columns, enableRowActions: true, renderRowActionMenuItems }} />
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
