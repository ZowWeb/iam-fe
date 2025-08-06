import { useState } from 'react'
import { ButtonIcon } from '@vds/button-icons'
import { Icon, type IconProps } from '@vds/icons'

import { Right } from './styles'
import FlexBox from '~/components/FlexBox'
import SearchInput from '~/components/SearchInput'

export type ActionToolbarProps = {
  onSearch: (data: string) => void
  searchPlaceHolderText?: string
  children: React.ReactNode
}

export default function ActionToolbar({ onSearch, searchPlaceHolderText, children }: ActionToolbarProps) {
  const [searchText, setSearchText] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearchText(value)
    onSearch(value)
  }
  const handleClear = () => {
    setSearchText('')
  }
  const handleOpenFilters = () => {
    setShowFilters(true)
  }
  const handleCloseFilters = () => {
    setShowFilters(false)
  }

  return (
    <FlexBox>
      {showFilters && (
        <Right>
          <ButtonIcon
            kind="ghost"
            size="large"
            renderIcon={(props: IconProps) => <Icon name="close" {...props} />}
            onClick={handleCloseFilters}
          />
          {children}
        </Right>
      )}
      {!showFilters && (
        <>
          <FlexBox>
            <SearchInput
              clearSearch={handleClear}
              onChange={value => handleSearchChange(value)}
              value={searchText}
              variant="primary"
              searchPlaceHolderText={searchPlaceHolderText}
            />
            <ButtonIcon
              kind="lowContrast"
              size="large"
              surfaceType="colorFill"
              renderIcon={(props: IconProps) => <Icon name="filter" {...props} />}
              onClick={handleOpenFilters}
            />
          </FlexBox>
          <Right>{children}</Right>
        </>
      )}
    </FlexBox>
  )
}
