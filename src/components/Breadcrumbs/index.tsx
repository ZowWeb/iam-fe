import { Breadcrumbs as MantineBreadcrumbs } from '@mantine/core'
import { useLocation } from '@tanstack/react-router'

import { BreadcrumbsContainer } from './styles'
import { titleCase } from '~/utils'
import Link from '../Link'

const getLinksFromPages = (pages: string[]) => {
  return pages.map((page, index) => {
    if (page === '') {
      return (
        <Link key="breadcrumb-home" to="/">
          Home / Identity & Access Management
        </Link>
      )
    }

    const isCurrent = index === pages.length - 1
    const title = titleCase(page)

    return isCurrent ? (
      <span key={`breadcrumb-${page}`}>{isCurrent ? <strong>{title}</strong> : title}</span>
    ) : (
      <Link key={`breadcrumb-${page}`} to={`/${page}`}>
        {title}
      </Link>
    )
  })
}

const Breadcrumbs = () => {
  const path = useLocation({ select: location => location.pathname }) // /members
  const pages = path.split('/') // ['', 'members']

  return (
    <BreadcrumbsContainer>
      <MantineBreadcrumbs aria-label="Breadcrumbs">{getLinksFromPages(pages)}</MantineBreadcrumbs>
    </BreadcrumbsContainer>
  )
}

export default Breadcrumbs
