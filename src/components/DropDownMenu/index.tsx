import { IamDropdownMenu, IamMenuItem } from './styles'

export type RowAction = {
  [key: string]: string
}

type Props = {
  items: RowAction
  actionClickHandler: (key: string) => void
}

/**
 * To be used inside Mantine <Menu>
 */
export default function DropDownMenu({ actionClickHandler, items }: Props) {
  return (
    <IamDropdownMenu>
      {Object.entries(items).map(([action, label]) => (
        <IamMenuItem
          key={action}
          onClick={event => {
            event.stopPropagation()
            actionClickHandler(action)
          }}
        >
          {label}
        </IamMenuItem>
      ))}
    </IamDropdownMenu>
  )
}
