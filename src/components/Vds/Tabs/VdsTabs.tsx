import { Tab, Tabs } from '@vds/tabs'
import { useState } from 'react'
import { getSelectedElement } from './VdsTabsUtils'

export interface VdsTabConfig {
  id: string
  label: string
  selected?: boolean
}

export interface VdsTabsProps {
  config: VdsTabConfig[]
  onSelection: (tab: VdsTabConfig) => void
  orientation?: 'vertical' | 'horizontal'
}

export function VdsTabs({ config, onSelection, orientation = 'vertical' }: VdsTabsProps) {
  const [selected, setSelected] = useState(getSelectedElement(config))
  const handleSelect = (tab: VdsTabConfig) => {
    onSelection(tab)
    setSelected(tab)
  }

  return (
    <Tabs orientation={orientation} indicatorPosition="bottom">
      {config.map(tab => {
        const isSelected: boolean = tab.label === selected?.label
        return (
          <Tab key={tab.label} label={tab.label} selected={isSelected} onClick={() => handleSelect(tab)} />
        )
      })}
    </Tabs>
  )
}
