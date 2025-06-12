/* eslint-disable */
import { Icon } from '@vds/icons'
import classes from './SearchInput.module.scss'
import { clsx } from 'clsx'

export interface SearchInputProps {
  value: string
  onChange: (query: string) => void
  clearSearch: () => void
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
  showClearSearchIcon?: boolean
  searchPlaceHolderText?: string
}

const SearchInput = ({
  value,
  onChange,
  clearSearch,
  variant = 'secondary',
  fullWidth = false,
  showClearSearchIcon = true,
  searchPlaceHolderText = 'Search',
}: SearchInputProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <form onSubmit={e => e.preventDefault()} className={classes.form}>
      <input
        placeholder={searchPlaceHolderText}
        className={clsx(classes.input, {
          [classes.inputWidthFull]: fullWidth,
          [classes.inputWidthFixed]: !fullWidth,
          [classes.inputPrimary]: variant === 'primary',
          [classes.inputSecondary]: variant === 'secondary',
        })}
        id="input"
        type="text"
        value={value}
        onChange={handleInputChange}
      />
      <span className={classes.searchIcon}>
        <Icon name="search" size={20} variant={variant} />
      </span>
      {showClearSearchIcon && (
        <span className={classes.closeIcon} onClick={clearSearch}>
          <Icon name="close" size={20} />
        </span>
      )}
    </form>
  )
}

export default SearchInput
