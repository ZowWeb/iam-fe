import { Tab, Tabs } from '@vds/tabs'
import { useMatchRoute } from '@tanstack/react-router'

import type { FileRoutesByTo } from '~/routeTree.gen'

export interface TabConfig {
  id: string
  label: string
  link: keyof FileRoutesByTo
}

export interface Props {
  tabs: TabConfig[]
  onClick: (tab: TabConfig) => void
  orientation?: 'vertical' | 'horizontal'
}

export function VdsTabs({ tabs, onClick, orientation = 'vertical' }: Props) {
  const matchRoute = useMatchRoute()

  return (
    <Tabs orientation={orientation} indicatorPosition="bottom" borderLine={false} size="large" width="100%">
      {tabs.map(tab => {
        const matchOrFalse = matchRoute({ to: tab.link })

        return (
          <Tab
            key={tab.id}
            uniqueId={tab.id}
            label={tab.label}
            selected={!!matchOrFalse}
            onClick={() => onClick(tab)}
          />
        )
      })}
    </Tabs>
  )
}
