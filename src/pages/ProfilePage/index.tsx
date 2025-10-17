import { TitleLockup } from "@vds/type-lockups";
import Block from "~/components/Block";
import MemberCard from "./MemberCard";
import FlexBox from "~/components/FlexBox";


export default function ProfilePage() {

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
        <MemberCard />
        <MemberCard />
        <MemberCard />
      </FlexBox>
    </Block>
  );
};

