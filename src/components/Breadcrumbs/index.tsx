import { Breadcrumbs as MantineBreadcrumbs } from '@mantine/core'
import { useMatches } from '@tanstack/react-router'

import { BreadcrumbsContainer } from './styles'
import { titleCase } from '~/utils'
import Link from '../Link'

const getBreadcrumbsFromItems = (items: { href: string; label?: string }[]) => {
  return items.map(item => {
    const defaultLabel = 'Unspecified'
    const title = titleCase(item.label || item.href.split('/').pop() || defaultLabel)

    return (
      <Link key={`breadcrumb-${item}`} to={item.href} activeProps={{ className: 'active' }}>
        {title}
      </Link>
    )
  })
}

const Breadcrumbs = () => {
  const matches = useMatches()

  const breadcrumbItems = matches
    .filter(({ loaderData }) => loaderData?.crumbTitle)
    .map(({ pathname, loaderData }) => {
      return {
        href: pathname,
        label: loaderData?.crumbTitle,
      }
    })

  return (
    <BreadcrumbsContainer>
      <MantineBreadcrumbs aria-label="Breadcrumbs">
        {getBreadcrumbsFromItems(breadcrumbItems)}
      </MantineBreadcrumbs>
    </BreadcrumbsContainer>
  )
}

export default Breadcrumbs
