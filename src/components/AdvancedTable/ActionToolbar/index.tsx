import { useState } from 'react'
import { ButtonIcon } from '@vds/button-icons'
import { Icon, type IconProps } from '@vds/icons'
import { Button } from '@vds/buttons'
import classes from './ActionToolbar.module.scss'
import SearchInput from '@/components/SearchInput'

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

  return (
    <div className={classes.container}>
      {showFilters && (
        <div className={classes.closeFiltersButton}>
          <ButtonIcon
            kind="ghost"
            size="large"
            renderIcon={(props: IconProps) => <Icon name="close" {...props} />}
            onClick={handleCloseFilters}
          />
        </div>
      )}

      {!showFilters && (
        <>
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
          <div className={classes.actionButton}>
            <Button size="large" disabled={false} use="secondary" onClick={handleActionBClick}>
              {actionButtonText}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
