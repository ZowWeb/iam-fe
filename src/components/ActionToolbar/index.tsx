import { useState } from 'react'
import { ButtonIcon } from '@vds/button-icons'
import { Icon, type IconProps } from '@vds/icons'
import { Button } from '@vds/buttons'

import { Right } from './styles'
import FlexBox from '~/components/FlexBox'
import SearchInput from '~/components/SearchInput'

export type ActionToolbarProps = Partial<{
  onSearch: (data: string) => void
  searchPlaceHolderText?: string
  ctaConfig: {
    label: string
    onClick: () => void
  }
}>

export default function ActionToolbar({
  onSearch = () => {},
  searchPlaceHolderText,
  ctaConfig,
}: ActionToolbarProps) {
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

  const ctaBtn = ctaConfig && (
    <Button size="large" disabled={false} use="secondary" onClick={ctaConfig.onClick}>
      {ctaConfig.label}
    </Button>
  )

  return (
    <FlexBox justifyContent="space-between" alignItems="center" gap="0.5rem">
      {showFilters ? (
        <Right>
          <ButtonIcon
            kind="ghost"
            size="large"
            renderIcon={(props: IconProps) => <Icon name="close" {...props} />}
            onClick={handleCloseFilters}
          />
          {ctaBtn}
        </Right>
      ) : (
        <>
          <FlexBox>
            <ButtonIcon
              kind="lowContrast"
              size="large"
              surfaceType="colorFill"
              renderIcon={(props: IconProps) => <Icon name="customize" {...props} />}
              onClick={handleOpenFilters}
            />
            <SearchInput
              clearSearch={handleClear}
              onChange={value => handleSearchChange(value)}
              value={searchText}
              variant="primary"
              searchPlaceHolderText={searchPlaceHolderText}
            />
          </FlexBox>
          <Right>{ctaBtn}</Right>
        </>
      )}
    </FlexBox>
  )
}
