import { styled } from '@linaria/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useMemo } from 'react'

import FlexBox from '~/components/FlexBox'
import IamHero from '~/components/IamHero'
import Typography from '~/components/Typography'
import getTeam from '~/queries/getTeam'
import { COLORS } from '~/styles/constants'
import { getFormattedDate } from '~/utils/dates'

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
  const { teamId } = useParams({ from: '/teams/$teamId' })
  const { data: team } = useSuspenseQuery(getTeam({ teamId }))

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
        value: getFormattedDate(team?.createdAt || ''),
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
    <>
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
      <IamHero
        title={team?.displayName || 'Team Name'}
        subtitle="We automatically created this team for you when you created  your account. Use this team to collaborate with colleagues and manage API client test credentials"
        showActionButton
      >
        {footerItemsJSX}
      </IamHero>
    </>
  )
}
