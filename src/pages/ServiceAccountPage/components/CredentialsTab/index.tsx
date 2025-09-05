import { ButtonIcon } from '@vds/button-icons'
import { TitleLockup } from '@vds/type-lockups'
import { Icon, type IconProps } from '@vds/icons'

import FlexBox from '~/components/FlexBox'
import AddCredentialCard from '../AddCredentialCard'
import { StyledLink } from './styles'
import CredentialCard from '../CredentialCard'

const links = [
  {
    label: 'AWS US East 2',
    link: 'http://www.google.com',
  },
  {
    label: 'AWS US West 2',
    link: 'http://www.google.com',
  },
]

const handleLinkClick = (link: string) => {
  navigator.clipboard.writeText(link).then(() => alert('Link has been copied to clipboard!'))
}

export default function CredentialsTab() {
  return (
    <FlexBox direction="column" gap="1.5rem" alignItems="flex-start">
      <TitleLockup
        data={{
          title: {
            primitive: 'h4',
            size: 'titleMedium',
            children: 'Token URL',
          },
          subtitle: {
            primitive: 'p',
            size: 'bodyLarge',
            children: 'Copy the link for the region you require.',
          },
        }}
      />

      <FlexBox gap="1rem" alignItems="center">
        {links.map((item, idx) => (
          <StyledLink gap="0.5rem" key={`link-${idx}-${Date.now().toString()}`}>
            <ButtonIcon
              surfaceType="colorFill"
              kind="highContrast"
              size="large"
              renderIcon={(props: IconProps) => <Icon name="link" {...props} />}
              onClick={() => {
                handleLinkClick(item.link)
              }}
            />
            {item.label}
          </StyledLink>
        ))}
      </FlexBox>

      <TitleLockup
        data={{
          title: {
            primitive: 'h4',
            size: 'titleMedium',
            children: 'Credentials',
          },
          subtitle: {
            primitive: 'p',
            size: 'bodyLarge',
            children:
              'You can create up to 2 credentials. Once created you can disable, re-enable and delete credentials from 3 dot menubar.',
          },
        }}
      />

      <FlexBox gap="2.5rem">
        <AddCredentialCard />
        <CredentialCard />
      </FlexBox>
    </FlexBox>
  )
}
