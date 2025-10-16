import { TitleLockup } from "@vds/type-lockups";
import { useState } from "react";
import Block from "~/components/Block";
import { VdsTabs, type TabItem } from "~/components/Vds/Tabs";
import AccountTab from "./AccountTab";
import TeamsTab from "./TeamsTab";

const tabs: TabItem[] = [
  { id: 'account', label: 'Account', selected: true },
  { id: 'teams', label: 'Teams' },
]

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0])
  const handleSelectTabClick = (tab: TabItem) => {
    setSelectedTab(tab)
  }

  return (
    <Block>
      <TitleLockup
        data={{
          title: {
            size: 'titleLarge',
            bold: false,
            children: 'My Profile',
          },
          subtitle: {
            size: 'bodyLarge',
            children: 'View and update your account details',
          },
        }}
      />
      <VdsTabs onClick={handleSelectTabClick} tabs={tabs} orientation="horizontal" borderLine />
      {selectedTab.id === 'account' && <AccountTab />}
      {selectedTab.id === 'teams' && <TeamsTab />}
    </Block>
  );
};

