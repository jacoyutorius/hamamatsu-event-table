import dayjs from "dayjs"
import { Navbar, Dropdown } from "flowbite-react"
import { useEventList } from "../../hooks/useEventList"

export type NavbarComponentProps = {
  onClick: () => void,
  signOut: any
}

const months = [
  dayjs(new Date(2023, 1, 1)),
  dayjs(new Date(2023, 2, 1)),
  dayjs(new Date(2023, 3, 1)),
  dayjs(new Date(2023, 4, 1)),
  dayjs(new Date(2023, 5, 1)),
  dayjs(new Date(2023, 6, 1)),
  dayjs(new Date(2023, 7, 1)),
  dayjs(new Date(2023, 8, 1)),
  dayjs(new Date(2023, 9, 1)),
  dayjs(new Date(2023, 10, 1)),
  dayjs(new Date(2023, 11, 1)),
  dayjs(new Date(2023, 12, 1)),
]

const dropdownItems = (setMonth: any): any => {
  return months.map(month => {
    return (
      <Dropdown.Item onClick={() => setMonth(month.format('YYYYMM')) }>
        { month.format('YYYY/MM') }
      </Dropdown.Item>  
    )
  })
}

export const NavbarComponent = (props: NavbarComponentProps): JSX.Element => {
  const { month, setMonth } = useEventList()

  return (
    <Navbar
      className="sticky top-0"
      fluid={true}
      rounded={true}
    >
      <Navbar.Brand href="/">
        <img
          src="logo.png"
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          浜松市イベントカレンダー
        </span>
      </Navbar.Brand>
      <div className="flex gap-x-1 md:order-2">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Dropdown
          label={month}
          inline={true}
          theme={{ inlineWrapper: "flex items-center text-base text-gray-800" }}
          dismissOnClick={true}>
          { dropdownItems(setMonth) }
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  )
}