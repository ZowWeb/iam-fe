import { IconChevronLeft } from '@tabler/icons-react'

import FlexBox from '~/components/FlexBox'
import Link from '~/components/Link'
import { FooterContainer, FooterItemWrapper, Label, StyledCodeBlock, Value, Subtitle } from './styles'
import DetailsHeader from './components/DetailsHeader'
import { Route } from '~/routes/_authenticated/teams/$teamId/policies/$policyId'
import usePolicy from '~/hooks/usePolicy'
import { truncateMaxedOutText } from '~/utils'
import CodeBlock from './components/CodeBlock'
import { FONT_WEIGHTS } from '~/styles/constants'

const footerItems = [
  {
    label: 'Created',
    value: 'July 21, 2025 12:24 PM',
  },
  {
    label: 'Created by',
    value: 'John Doe',
  },
  {
    label: 'Last updated',
    value: 'July 21, 2025 12:24 PM',
  },
]

const footerItemsJSX = (
  <FlexBox direction="column" gap="1.5rem">
    <Subtitle weight={FONT_WEIGHTS.medium}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo lorem in diam hendrerit, vel
      vestibulum elit dapibus. Quisque facilisis justo condimentum
    </Subtitle>
    <FooterContainer alignItems="flex-start">
      {footerItems.map(item => (
        <FooterItemWrapper key={item.label} direction="column" alignItems="flex-start">
          <Label>{item.label}</Label>
          <Value>{item.value}</Value>
        </FooterItemWrapper>
      ))}
    </FooterContainer>
  </FlexBox>
)

export default function PolicyPage() {
  const { teamId, policyId } = Route.useParams()
  const { policy } = usePolicy({ teamId, policyId })

  return (
    <>
      <Link to="..">
        <FlexBox customStyle={{ marginBottom: '2rem' }}>
          <IconChevronLeft name="arrow-left" size={20} />
          <span>Back to policies list</span>
        </FlexBox>
      </Link>
      <DetailsHeader
        title={truncateMaxedOutText(policy?.name || 'Policy Name', 100)}
        showActionButton
        gap="0.625rem"
      >
        {footerItemsJSX}
      </DetailsHeader>
      <StyledCodeBlock>
        <CodeBlock data={policy} />
      </StyledCodeBlock>
    </>
  )
}
