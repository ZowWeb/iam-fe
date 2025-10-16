import type { ReactNode } from 'react';
import { MenuDropdown, MenuItem } from './styles';

export type DropDownMenuItem = {
  key: string;
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

type Props = {
  items: DropDownMenuItem[];
  actionClickHandler: (key: string) => void;
};

export default function DropDownMenu({ actionClickHandler, items }: Props) {
  return (
    <MenuDropdown>
      {items.map(({ key, label, leftIcon, rightIcon }) => (
        <MenuItem
          key={key}
          leftSection={leftIcon}
          rightSection={rightIcon}
          onClick={(event) => {
            event.stopPropagation();
            actionClickHandler(key);
          }}
        >
          {label}
        </MenuItem>
      ))}
    </MenuDropdown>
  );
}