import { useContext } from "react"
import { SelectedEventContext } from "../../hooks/SelectedEventContext"

export type CalendarDayEventProps = {
  key: string,
  eventName: string,
  url: string | null,
  category: string
}

export type CalendarDayComponentProps = {
  day: any,
  isTargetMonth: boolean | false,
  isFirstWeek: boolean,
  events: Array<CalendarDayEventProps>,
  onClick: () => void
}

type ModalLinkProps = {
  text: string,
  url: string,
  category: string,
  onClick: () => void
}

// eslint-disable
const ModalLink = ({ text, url, category, onClick }: ModalLinkProps): JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${getLabelColor(category)} my-1 w-full rounded-2xl border px-2.5 py-2 text-left text-xs font-medium leading-5 transition duration-150 hover:-translate-y-px hover:shadow-sm sm:px-3 sm:text-sm`}>
      {text}
    </button>
  )
}

function getLabelColor(category: string) {
  if (category === "イベント") {
    return "border-blue-200 bg-blue-50 text-blue-700"
  }
  else if (category === "おしらせ") {
    return "border-orange-200 bg-orange-50 text-orange-700"
  }
  else if (category === "こそだて") {
    return "border-green-200 bg-green-50 text-green-700"
  }
  else if (category === "けんこう") { 
    return "border-amber-200 bg-amber-50 text-amber-700"
  }
  else if (category === "そうだん") {
    return "border-rose-200 bg-rose-50 text-rose-700"
  }
  else if (category === "おんがく") {
    return "border-cyan-200 bg-cyan-50 text-cyan-700"
  }
  else if (category === "講座・教室") {
    return "border-lime-200 bg-lime-50 text-lime-700"
  }
  else if (category === "スポーツ") {
    return "border-sky-200 bg-sky-50 text-sky-700"
  }
  else {
    return "border-slate-200 bg-slate-50 text-slate-700"
  }
}

function getDateColor(day:any, isTargetMonth: boolean) {
  const date = day.format("d")
  
  if (date === '0') {
    return isTargetMonth ? "bg-red-50 text-red-700" : "bg-red-50/70 text-red-400"
  }
  else if (date === '6') {
    return isTargetMonth ? "bg-blue-50 text-blue-700" : "bg-blue-50/70 text-blue-400"
  }
  else {
    return isTargetMonth ? "bg-slate-100 text-slate-700" : "bg-slate-100 text-slate-400"
  }
}

export const CalendarDayComponent = ({ day, isTargetMonth, isFirstWeek, events, onClick }: CalendarDayComponentProps): JSX.Element => {
  const { setEventKey } = useContext(SelectedEventContext)
  const isToday = day.format("YYYY-MM-DD") === new Date().toISOString().slice(0, 10)
  
  const linkComponents = events.map((event: CalendarDayEventProps) => {
    const onModalLinkClick = () => {
      setEventKey(event.key)
      onClick()
    }
  
    return (<div key={event.key}>
      <ModalLink
        onClick={onModalLinkClick}
        text={event.eventName}
        url={event.url || ""}
        category={event.category} />
    </div>)
  })

  const headBgColor = getDateColor(day, isTargetMonth)

  return (<div className={ `flex min-h-[150px] flex-col overflow-hidden rounded-[20px] border shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition duration-200 sm:min-h-[180px] ${ isTargetMonth ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-100/90' } ${isToday ? 'ring-2 ring-sky-300 ring-offset-2 ring-offset-white' : ''}` }>
    <header className={`flex flex-col border-b border-slate-200/80 px-2.5 pb-2 pt-2.5 sm:px-3 sm:pt-3 ${headBgColor}`}>
      {isFirstWeek && <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">{day.format("ddd")}</p>}
      <div className="mt-1 flex items-center justify-between">
        <p className={`text-sm font-semibold sm:text-base ${isTargetMonth ? 'text-slate-900' : 'text-slate-500'}`}>{day.format("M/D")}</p>
        {isToday && (
          <span className="rounded-full bg-sky-600 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Today
          </span>
        )}
      </div>
    </header>
    <div className="flex-1 space-y-1 overflow-y-auto px-2 py-2 sm:min-h-[170px] sm:px-2.5 md:min-h-[180px] lg:min-h-[210px]">
      { linkComponents }
    </div>
  </div>)
}
