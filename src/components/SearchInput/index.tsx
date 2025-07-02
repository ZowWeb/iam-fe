import { Icon } from '@vds/icons'

import { ClearIcon, Form, Input, SearchIcon } from './styles'

interface SearchInputProps {
  value: string
  onChange: (query: string) => void
  clearSearch: () => void
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
  showClearSearchIcon?: boolean
  searchPlaceHolderText?: string
}

export interface InputProps {
  variant: 'primary' | 'secondary'
  fullWidth: boolean
}

const SearchInput = ({
  value,
  onChange,
  clearSearch,
  variant = 'primary',
  fullWidth = false,
  showClearSearchIcon = true,
  searchPlaceHolderText = 'Search',
}: SearchInputProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form onSubmit={e => e.preventDefault()}>
      <Input
        placeholder={searchPlaceHolderText}
        id="input"
        type="text"
        value={value}
        onChange={handleInputChange}
        fullWidth={fullWidth}
        variant={variant}
      />

      <SearchIcon>
        <Icon name="search" size={20} color={variant === 'primary' ? 'black' : 'white'} />
      </SearchIcon>
      {showClearSearchIcon && (
        <ClearIcon onClick={clearSearch}>
          <Icon name="close" size={20} color={variant === 'primary' ? 'black' : 'white'} />
        </ClearIcon>
      )}
    </Form>
  )
}

export default SearchInput
