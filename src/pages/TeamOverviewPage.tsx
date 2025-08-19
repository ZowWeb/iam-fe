import { styled } from '@linaria/react'
import { useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'

import Block from '~/components/Block'
import FlexBox from '~/components/FlexBox'
import Grid, { Col } from '~/components/Grid'
import IamHero from '~/components/IamHero'
import Typography from '~/components/Typography'
import { VdsTabs, type VdsTabConfig } from '~/components/Vds/Tabs/VdsTabs'
import useTeam from '~/hooks/useTeam'
import { Route } from '~/routes/teams/$teamId'
import { COLORS } from '~/styles/constants'
import { getFormatedDate } from '~/utils/dates'

const tabsConfig: VdsTabConfig[] = [
  { id: 'teamDetails', label: 'Team Details', selected: true },
  { id: 'members', label: 'Members', link: '/teams/$teamId/users/' },
  { id: 'policies', label: 'Policies' },
  { id: 'serviceAccounts', label: 'Service accounts' },
]

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

const Hero = styled(FlexBox)`
  padding: 0 0 2.5rem 0;
`

const HeroColumn = styled(FlexBox)`
  padding: 0 0 0.75rem 0;
`

const HeroImageColumn = styled(FlexBox)`
  width: auto;
`

const Subtitle = styled(Typography.Span)`
  color: ${COLORS.secondary};
`

export default function TeamOverviewPage() {
  let { teamId } = Route.useParams()
  teamId = 'team-00SJ5QRNQE93FS5CX09K7CBQ8G' // TODO: Remove
  const { team, isLoading } = useTeam({ teamId })
  const navigate = useNavigate()

  const handleTabSelection = (tab: VdsTabConfig) => {
    if (tab.link) {
      navigate({ to: tab.link, params: { teamId: 'team1' } })
    }
  }

  const footerItems = useMemo(
    () => [
      {
        label: 'Team ID',
        value: team?.id,
      },
      {
        label: 'Type',
        value: team?.kind,
      },
      {
        label: 'Created',
        value: getFormatedDate(team?.createdAt || ''),
      },
    ],
    [team],
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
      <Grid>
        <Col span={3}>
          <VdsTabs onSelection={handleTabSelection} config={tabsConfig} />
        </Col>
        <Col span={9}>
          <Hero>
            <HeroColumn direction="column" alignItems="flex-start">
              <Typography.H2>Identity & Access Management</Typography.H2>
              <Subtitle size="1.5rem">
                Securely control API access and define team permissions for collaborative development.
              </Subtitle>
            </HeroColumn>
            <HeroImageColumn>
              <img height="270px" src="/hero_goraphics.png" alt="Hero" />
            </HeroImageColumn>
          </Hero>

          {!isLoading && (
            <IamHero
              title={team?.displayName || ''}
              subtitle="We automatically created this team for you when you created  your account. Use this team to collaborate with colleagues and manage API client test credentials"
              showActionButton
            >
              {footerItemsJSX}
            </IamHero>
          )}
        </Col>
      </Grid>
    </Block>
  )
}
