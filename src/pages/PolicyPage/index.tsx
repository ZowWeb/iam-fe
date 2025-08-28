import { IconChevronLeft } from '@tabler/icons-react'

import FlexBox from '~/components/FlexBox'
import Link from '~/components/Link'
import { FooterContainer, FooterItemWrapper, Label, StyledCodeBlock, Value } from './styles'
import IamHero from '~/components/IamHero'
import { Route } from '~/routes/teams/$teamId/policies/$policyId'
import usePolicy from '~/hooks/usePolicy'
import { truncateMaxedOutText } from '~/utils'
import CodeBlock from './components/CodeBlock'

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
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi commodo lorem in diam hendrerit, vel
    vestibulum elit dapibus. Quisque facilisis justo condimentum
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
      <IamHero title={truncateMaxedOutText(policy?.name || 'Policy Name', 40)} showActionButton>
        {footerItemsJSX}
      </IamHero>
      <StyledCodeBlock>
        <CodeBlock data={policy} />
      </StyledCodeBlock>
    </>
  )
}
