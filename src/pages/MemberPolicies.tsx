import { IconChevronLeft } from '@tabler/icons-react'
import { TitleLockup } from '@vds/type-lockups'
import { styled } from '@linaria/react'
import type { MRT_ColumnDef as MRTColumnDef } from 'mantine-react-table'
import { Button } from '@vds/buttons'

import Block from '~/components/Block'
import IamHero from '~/components/IamHero'
import { VdsTabs, type VdsTabConfig } from '~/components/Vds/Tabs/VdsTabs'
import Grid, { Col } from '~/components/Grid'
import FlexBox from '~/components/FlexBox'
import Link from '~/components/Link'
import { COLORS } from '~/styles/constants'
import ActionToolbar from '~/components/AdvancedTable/ActionToolbar'
import Table from '~/components/AdvancedTable'
import type { Policy } from '~/types/data'
import { policies as data } from '~/mocks/policiesData'
import Badge from '~/components/Badge'

const IamHeroContent = styled(FlexBox)``
const IamHeroSubtitle = styled.div``

const tabsConfig: VdsTabConfig[] = [
  { id: 'teamDetails', label: 'Team Details' },
  { id: 'members', label: 'Members', selected: true },
  { id: 'policies', label: 'Policies' },
  { id: 'serviceAccounts', label: 'Service accounts' },
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
]

const options = {
  enableRowSelection: true,
  mantineSelectCheckboxProps: { color: 'black' },
  mantineSelectAllCheckboxProps: { color: 'black' },
}

export default function MemberPolicies() {
  return (
    <Block>
      <Grid>
        <Col span={3}>
          <VdsTabs onSelection={() => {}} config={tabsConfig} />
        </Col>
        <Col span={9}>
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
                  children: 'Assign a member policy',
                  color: COLORS.brandHighlight,
                },
                subtitle: {
                  size: 'bodyLarge',
                  children: 'Add or remove a policy from the list bellow. Click save to commit the change.',
                },
              }}
            />

            <IamHero title="John Smith" showActionButton={false} gap="0">
              <IamHeroContent direction="column" alignItems="flex-start" gap="1rem">
                <IamHeroSubtitle>john.smith@email.com</IamHeroSubtitle>
                <FlexBox>
                  <FlexBox>
                    <Badge value="3&nbsp;&nbsp;Policies assigned" color="blue" />
                  </FlexBox>
                  <FlexBox justifyContent="end" gap="1rem">
                    <Button size="small">Save</Button>
                    <Button size="small" use="secondary">
                      Cancel
                    </Button>
                  </FlexBox>
                </FlexBox>
              </IamHeroContent>
            </IamHero>

            <ActionToolbar onAction={() => {}} />
            <Table {...{ columns, data, options }} />
          </FlexBox>
        </Col>
      </Grid>
    </Block>
  )
}
