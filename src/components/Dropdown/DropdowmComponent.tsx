import { forwardRef } from "react";
import { Dropdown as FlowbiteDropdown } from "flowbite-react";

// TODO: 要らなくなったので削除する

const Dropdown = forwardRef(({
  arrowIcon = true,
  children,
  floatingArrow = false,
  inline = false,
  label,
  theme,
  ...otherProps
  }:any,
  ref) => {
  return (
    <FlowbiteDropdown
      arrowIcon={arrowIcon}
      floatingArrow={floatingArrow}
      inline={inline}
      label={label}
      theme={{ inlineWrapper: "flex items-center text-gray-700" }}
      ref={ref}
      {...otherProps}>
      {children}
    </FlowbiteDropdown>
  )
})

const DropdownItem = (
  {
    children,
    icon,
    onClick,
    ...otherProps
  }:any
) => {
  return (
    <FlowbiteDropdown.Item
      icon={icon}
      onClick={onClick}
      {...otherProps}>
      {children}
    </FlowbiteDropdown.Item>
  )
}

export const DropdownComponent = Object.assign(Dropdown, {
  Item: DropdownItem
})