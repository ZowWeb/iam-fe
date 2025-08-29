import { Breadcrumbs as MantineBreadcrumbs } from '@mantine/core'
import { useMatches } from '@tanstack/react-router'

import { BreadcrumbsContainer } from './styles'
import Link from '../Link'

const Breadcrumbs = () => {
  const matches = useMatches()

  return (
    <BreadcrumbsContainer>
      <MantineBreadcrumbs aria-label="Breadcrumbs">
        {matches.map(({ pathname, loaderData }) => {
          if (loaderData && 'crumbTitle' in loaderData) {
            const label = loaderData.crumbTitle
            return (
              <Link key={`breadcrumb-${label}`} to={pathname} activeProps={{ className: 'active' }}>
                {label}
              </Link>
            )
          }
          return null
        })}
      </MantineBreadcrumbs>
    </BreadcrumbsContainer>
  )
}

export default Breadcrumbs
