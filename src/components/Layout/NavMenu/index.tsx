import { useMatchRoute } from '@tanstack/react-router'
import { Tab, Tabs } from '@vds/tabs'

import type { FileRoutesByTo } from '~/routeTree.gen'
import { type TabItem } from '../../Vds/Tabs'

export type NavMenuItem = Omit<TabItem, 'selected'> & {
  link: keyof FileRoutesByTo
}

type NavMenuProps = {
  items: NavMenuItem[]
  onClick: (item: NavMenuItem) => void
}

/**
 * Uses VDS Tabs to create the left navigation menu
 */
export default function NavMenu({ items, onClick }: NavMenuProps) {
  const matchRoute = useMatchRoute()

  return (
    <Tabs orientation="vertical" indicatorPosition="bottom" borderLine={false} size="large" width="100%">
      {items.map(item => {
        const matchOrFalse = matchRoute({ to: item.link })

        return (
          <Tab
            key={item.id}
            uniqueId={item.id}
            label={item.label}
            selected={!!matchOrFalse}
            onClick={() => onClick(item)}
          />
        )
      })}
    </Tabs>
  )
}
