import { TitleLockup } from '@vds/type-lockups'
import { useMemo } from 'react'

import Block from '~/components/Block'
import FlexBox from '~/components/FlexBox'
import ProfileCard, { type FooterItems } from './ProfileCard'
import { members } from '~/mocks/member'

const member = members[0]

export default function ProfilePage() {
  const memberFooterItems: FooterItems[] = useMemo(
    () => [
      {
        label: 'Display Name',
        value: member?.displayName || 'loading...',
      },
    ],
    [member],
  )

  const emailFooterItems: FooterItems[] = useMemo(
    () => [
      {
        label: 'Email',
        value: member?.email || 'loading...',
      },
    ],
    [member],
  )

  const handleMemberEdit = () => {}

  return (
    <Block>
      <TitleLockup
        data={{
          title: {
            size: 'titleXLarge',
            bold: false,
            children: 'My Profile',
          },
          subtitle: {
            size: 'bodyLarge',
            children: 'View and update your account details',
          },
        }}
      />
      <FlexBox gap="2.5rem" wrap>
        <ProfileCard title="Member" onEdit={handleMemberEdit} footerItems={memberFooterItems} />
        <ProfileCard title="Email" footerItems={emailFooterItems} />
      </FlexBox>
    </Block>
  )
}
