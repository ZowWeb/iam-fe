import { TitleLockup } from "@vds/type-lockups";
import Block from "~/components/Block";
import FlexBox from "~/components/FlexBox";
import ProfileCard, { type FooterItems } from "./ProfileCard";
import useMember from "~/hooks/useMember";
import { useMemo } from "react";


export default function ProfilePage() {
  const { member } = useMember({ userId: 'dummy' })

  const memberFooterItems: FooterItems[] = useMemo(() => ([{
    label: 'Display Name', value: member?.displayName || 'loading...'
  }]), [member])

  const emailFooterItems: FooterItems[] = useMemo(() => ([{
    label: 'Email', value: member?.email || 'loading...'
  }]), [member])

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
      <FlexBox gap='2.5rem' wrap={true}>
        <ProfileCard title='Member' footerItems={memberFooterItems} />
        <ProfileCard title='Email' footerItems={emailFooterItems} />
      </FlexBox>
    </Block>
  );
};

