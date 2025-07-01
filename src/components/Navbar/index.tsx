import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { getSelectedElement } from '../Vds/Tabs/VdsTabsUtils'
import { VdsTabs, type VdsTabConfig } from '../Vds/Tabs/VdsTabs'

const tabsConfig: VdsTabConfig[] = [
  { id: 'home', label: 'Home', link: '/', selected: true },
  { id: 'advanced-table', label: 'Advanced Table', link: '/advanced-table' },
  { id: 'buttons', label: 'Buttons', link: '/buttons' },
]

export function Navbar() {
  const navigate = useNavigate()
  const [, setSelectedTab] = useState(getSelectedElement(tabsConfig))
  const handleTabSelect = (tab: VdsTabConfig) => {
    setSelectedTab(tab)

    if (tab.link) {
      navigate({ to: tab.link })
    }
  }

  return <VdsTabs onSelection={handleTabSelect} config={tabsConfig} />
}
