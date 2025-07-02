import { useMemo, useState } from 'react'
import { ButtonIcon } from '@vds/button-icons'
import { Icon, type IconProps } from '@vds/icons'
import { Button } from '@vds/buttons'

import { Right } from './styles'
import FlexBox from '~/components/FlexBox'
import SearchInput from '~/components/SearchInput'

export interface ActionToolbarProps {
  onAction: (action: string, data?: string) => void
  searchPlaceHolderText?: string
  actionButtonText: string
}

export default function ActionToolbar({
  onAction,
  searchPlaceHolderText,
  actionButtonText,
}: ActionToolbarProps) {
  const [searchText, setSearchText] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (value: string) => {
    setSearchText(value)
    onAction('search', value)
  }
  const handleClear = () => {
    setSearchText('')
  }
  const handleActionAClick = () => {
    onAction('action-a-click')
    setShowFilters(true)
  }
  const handleActionBClick = () => {
    onAction('action-b-click')
  }
  const handleCloseFilters = () => {
    setShowFilters(false)
  }

  const ActionButton = () =>
    useMemo(
      () => (
        <Button size="large" disabled={false} use="secondary" onClick={handleActionBClick}>
          {actionButtonText}
        </Button>
      ),
      [actionButtonText],
    )

  return (
    <FlexBox customStyle={{ margin: '2.5rem 0 2rem' }}>
      {showFilters && (
        <Right>
          <ButtonIcon
            kind="ghost"
            size="large"
            renderIcon={(props: IconProps) => <Icon name="close" {...props} />}
            onClick={handleCloseFilters}
          />
          <ActionButton />
        </Right>
      )}
      {!showFilters && (
        <>
          <FlexBox>
            <SearchInput
              clearSearch={handleClear}
              onChange={value => handleSearch(value)}
              value={searchText}
              variant="primary"
              searchPlaceHolderText={searchPlaceHolderText}
            />
            <ButtonIcon
              kind="lowContrast"
              size="large"
              surfaceType="colorFill"
              renderIcon={(props: IconProps) => <Icon name="filter" {...props} />}
              onClick={handleActionAClick}
            />
          </FlexBox>
          <Right>
            <ActionButton />
          </Right>
        </>
      )}
    </FlexBox>
  )
}
