import { useMediaQuery as useMantineMediaQuery } from '@mantine/hooks'

import { breakpointsInPx } from '~/styles/breakpoints'

const useMediaQuery = () => {
  const isBelowPhone = useMantineMediaQuery(`(max-width: ${breakpointsInPx.phone}px)`)
  const isBelowTablet = useMantineMediaQuery(`(max-width: ${breakpointsInPx.tablet}px)`)
  const isBelowDesktop = useMantineMediaQuery(`(max-width: ${breakpointsInPx.desktop}px)`)
  const isBelowWide = useMantineMediaQuery(`(max-width: ${breakpointsInPx.wide}px)`)

  const isAbovePhone = !isBelowPhone
  const isAboveTablet = !isBelowTablet
  const isAboveDesktop = !isBelowDesktop
  const isAboveWide = !isBelowWide

  return {
    isBelowPhone,
    isBelowTablet,
    isBelowDesktop,
    isBelowWide,
    isAbovePhone,
    isAboveTablet,
    isAboveDesktop,
    isAboveWide,
  }
}

export default useMediaQuery
