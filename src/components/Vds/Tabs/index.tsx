import { Tab, Tabs } from '@vds/tabs'

import { FullWidth } from './styles'

export type TabItem = {
  id: string
  label: string
  selected?: boolean
}

type VdsTabsProps = {
  tabs: TabItem[]
  onClick: (tab: TabItem) => void
  orientation?: 'vertical' | 'horizontal'
  borderLine?: boolean
}

export function VdsTabs({ tabs, onClick, orientation = 'vertical', borderLine = false }: VdsTabsProps) {
  return (
    <FullWidth>
      <Tabs orientation={orientation} indicatorPosition="bottom" borderLine={borderLine} size="large">
        {tabs.map(tab => {
          return (
            <Tab
              key={tab.id}
              uniqueId={tab.id}
              label={tab.label}
              selected={tab.selected || false}
              onClick={() => onClick(tab)}
            />
          )
        })}
      </Tabs>
    </FullWidth>
  )
}
