import { useState } from 'react'
import { Tab, Tabs } from '@vds/tabs'

import { getSelectedElement } from './VdsTabsUtils'

export interface VdsTabConfig {
  id: string
  label: string
  selected?: boolean
  link?: string
}

export interface VdsTabsProps {
  config: VdsTabConfig[]
  onSelection: (tab: VdsTabConfig) => void
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export function VdsTabs({ config, onSelection, orientation = 'vertical', className }: VdsTabsProps) {
  const [selected, setSelected] = useState(getSelectedElement(config))
  const handleSelect = (tab: VdsTabConfig) => {
    onSelection(tab)
    setSelected(tab)
  }

  return (
    <div className={className}>
      <Tabs orientation={orientation} indicatorPosition="bottom" borderLine={false} size="large" width="100%">
        {config.map(tab => {
          const isSelected: boolean = tab.label === selected?.label
          return (
            <Tab key={tab.label} label={tab.label} selected={isSelected} onClick={() => handleSelect(tab)} />
          )
        })}
      </Tabs>
    </div>
  )
}
