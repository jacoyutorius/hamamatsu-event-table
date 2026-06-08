import dayjs from "dayjs"
import { Navbar, Dropdown } from "flowbite-react"
import { useEventList } from "../../hooks/useEventList"

export type NavbarComponentProps = {
  onClick: () => void,
  signOut: any
}

const getSelectableMonths = (month: string) => {
  const baseMonth = dayjs(`${month}01`).startOf("month")

  return Array.from({ length: 15 }, (_, index) => {
    return baseMonth.add(index - 6, "month")
  })
}

const dropdownItems = (month: string, setMonth: any): any => {
  const selectableMonths = getSelectableMonths(month)

  return selectableMonths.map((itemMonth) => {
    return (
      <Dropdown.Item
        key={itemMonth.format('YYYYMM')}
        onClick={() => setMonth(itemMonth.format('YYYYMM')) }>
        <div className="flex min-w-[130px] items-center justify-between gap-4">
          <span>{ itemMonth.format('YYYY年M月') }</span>
          {itemMonth.format("YYYYMM") === month && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
              現在
            </span>
          )}
        </div>
      </Dropdown.Item>  
    )
  })
}

export const NavbarComponent = (props: NavbarComponentProps): JSX.Element => {
  const { month, setMonth } = useEventList()
  const currentMonth = dayjs(`${month}01`)
  const currentMonthLabel = currentMonth.format("YYYY年M月")
  const moveMonth = (value: number) => {
    setMonth(currentMonth.add(value, "month").format("YYYYMM"))
  }

  return (
    <Navbar
      className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 px-3 py-3 backdrop-blur-md md:px-5"
      fluid={true}
      rounded={true}
    >
      <Navbar.Brand href="/" className="items-start gap-3 pr-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f4c81,#1f7abf)] text-sm font-bold text-white shadow-[0_10px_25px_rgba(15,76,129,0.28)]">
          浜
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
            Public Event Calendar
          </p>
          <span className="block self-center text-base font-bold tracking-[0.02em] text-slate-900 sm:text-lg md:text-xl">
            浜松市イベントカレンダー
          </span>
        </div>
      </Navbar.Brand>
      <div className="mt-3 flex w-full items-center gap-2 md:mt-0 md:w-auto md:justify-end md:order-2">
        <div className="w-full rounded-[22px] border border-slate-200 bg-white/90 px-2 py-2 shadow-sm md:w-auto">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Display Month
          </p>
          <div className="mt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => moveMonth(-1)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-lg text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
              aria-label="前の月を表示"
            >
              ‹
            </button>
            <div className="min-w-0 flex-1 md:flex-none">
              <Dropdown
                label={currentMonthLabel}
                inline={true}
                theme={{ inlineWrapper: "inline-flex w-full min-w-0 items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-sky-300 hover:text-sky-700 md:min-w-[136px]" }}
                dismissOnClick={true}
              >
                { dropdownItems(month, setMonth) }
              </Dropdown>
            </div>
            <button
              type="button"
              onClick={() => moveMonth(1)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-lg text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
              aria-label="次の月を表示"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </Navbar>
  )
}
