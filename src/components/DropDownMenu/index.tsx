import { MenuDropdown, MenuItem } from './styles'

export type RowAction = {
  [key: string]: string
}

type Props = {
  items: RowAction
  actionClickHandler: (key: string) => void
}

export default function DropDownMenu({ actionClickHandler, items }: Props) {
  return (
    <MenuDropdown>
      {Object.entries(items).map(([action, label]) => (
        <MenuItem
          key={action}
          onClick={event => {
            event.stopPropagation()
            actionClickHandler(action)
          }}
        >
          {label}
        </MenuItem>
      ))}
    </MenuDropdown>
  )
}
