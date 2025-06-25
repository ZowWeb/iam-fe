import { Breadcrumbs as MantineBreadcrumbs } from '@mantine/core'
import { Link } from '@tanstack/react-router'

import { BreadcrumbsContainer } from './styles'

const items = [
  { title: 'Home', to: '#' },
  { title: 'Identity & Access Management', to: '#' },
  { title: 'Teamname', to: '#' },
  { title: 'Members', to: '#', isCurrent: true },
].map((item, index) => {
  const LinkOrSpan = item.isCurrent ? 'span' : Link

  return (
    <LinkOrSpan to={item.to} key={index}>
      {item.isCurrent ? <strong>{item.title}</strong> : item.title}
    </LinkOrSpan>
  )
})

const Breadcrumbs = () => {
  return (
    <BreadcrumbsContainer>
      <MantineBreadcrumbs aria-label="Breadcrumbs">{items}</MantineBreadcrumbs>
    </BreadcrumbsContainer>
  )
}

export default Breadcrumbs
