import { IconChevronLeft } from '@tabler/icons-react'

import Block from '~/components/Block'
import IamHero from '~/components/IamHero'
import { VdsTabs, type VdsTabConfig } from '~/components/Vds/Tabs/VdsTabs'
import Grid, { Col } from '~/components/Grid'
import FlexBox from '~/components/FlexBox'
import Typography from '~/components/Typography'

const tabsConfig: VdsTabConfig[] = [
  { id: 'teamDetails', label: 'Team Details' },
  { id: 'members', label: 'Members', selected: true },
  { id: 'policies', label: 'Policies' },
  { id: 'serviceAccounts', label: 'Service accounts' },
]

const MembersPage = () => {
  return (
    <Block>
      <Grid>
        <Col span={3}>
          <VdsTabs onSelection={() => {}} config={tabsConfig} />
        </Col>
        <Col span={9}>
          <FlexBox customStyle={{ marginBottom: '2rem' }}>
            <IconChevronLeft name="arrow-left" size={20} />
            <span>Back to member list</span>
          </FlexBox>
          <Typography.H3 mb="md" c="vdsRed">
            Member details
          </Typography.H3>
          <Typography.Paragraph>View details of this member and manage their access. </Typography.Paragraph>
          <IamHero />
        </Col>
      </Grid>
    </Block>
  )
}

export default MembersPage
