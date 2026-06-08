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
      <Dropdown.Item
        key={month.format('YYYYMM')}
        onClick={() => setMonth(month.format('YYYYMM')) }>
        { month.format('YYYY/MM') }
      </Dropdown.Item>  
    )
  })
}

export const NavbarComponent = (props: NavbarComponentProps): JSX.Element => {
  const { month, setMonth } = useEventList()
  const currentMonthLabel = dayjs(`${month}01`).format("YYYY / MM")

  return (
    <Navbar
      className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 px-3 py-3 backdrop-blur-md md:px-5"
      fluid={true}
      rounded={true}
    >
      <Navbar.Brand href="/" className="items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f4c81,#1f7abf)] text-sm font-bold text-white shadow-[0_10px_25px_rgba(15,76,129,0.28)]">
          浜
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
            Public Event Calendar
          </p>
          <span className="block self-center whitespace-nowrap text-lg font-bold tracking-[0.02em] text-slate-900 md:text-xl">
            浜松市イベントカレンダー
          </span>
        </div>
      </Navbar.Brand>
      <div className="flex items-center gap-x-2 md:order-2">
        <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-right md:block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Selected Month
          </p>
          <p className="text-sm font-semibold text-slate-800">
            {currentMonthLabel}
          </p>
        </div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Dropdown
          label={currentMonthLabel}
          inline={true}
          theme={{ inlineWrapper: "inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-sky-300 hover:text-sky-700" }}
          dismissOnClick={true}>
          { dropdownItems(setMonth) }
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  )
}
