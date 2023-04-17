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

const ModalLink = ({ text, url, category, onClick }: ModalLinkProps): JSX.Element => {
  return (
    <a onClick={onClick}
      className={`${getLabelColor(category)} cursor-pointer text-sm font-medium mr-2 px-2.5 py-0.5 rounded`}
      target="_blank"
      rel="noreferrer">
      {text}
    </a>
  )
}

function getLabelColor(category: string) {
  if (category === "イベント") {
    return "bg-blue-50 text-blue-600"
  }
  else if (category === "おしらせ") {
    return "bg-orange-50 text-orange-600"
  }
  else if (category === "こそだて") {
    return "bg-green-50 text-green-600"
  }
  else if (category === "けんこう") { 
    return "bg-amber-50 text-amber-600"
  }
  else if (category === "そうだん") {
    return "bg-rose-50 text-rose-600"
  }
  else if (category === "おんがく") {
    return "bg-cyan-50 text-cyan-600"
  }
  else if (category === "講座・教室") {
    return "bg-lime-50 text-lime-600"
  }
  else if (category === "スポーツ") {
    return "bg-sky-50 text-sky-600"
  }
  else {
    console.log({category})
    return "bg-gray-50 text-gray-800"
  }
}

function getDateColor(day:any) {
  const date = day.format("d")
  
  if (date === '0') {
    return "bg-red-100"
  }
  else if (date === '6') {
    return "bg-blue-100"
  }
  else {
    return "bg-gray-100"
  }
}

export const CalendarDayComponent = ({ day, isFirstWeek, events, onClick }: CalendarDayComponentProps): JSX.Element => {
  const { setEventKey } = useContext(SelectedEventContext)
  
  const linkComponents = events.map((event: CalendarDayEventProps) => {
    const onModalLinkClick = () => {
      setEventKey(event.key)
      onClick()
    }
  
    return (<div>
      <ModalLink
        onClick={onModalLinkClick}
        text={event.eventName}
        url={event.url || ""}
        category={event.category} />
    </div>)
  })

  const headBgColor = getDateColor(day)

  return (<div className="border border-gray-200 flex flex-col">
    <header className={`flex flex-col items-center ${headBgColor}`}>
      {isFirstWeek && <p className="text-sm mt-1">{day.format("ddd")}</p>}
        <p className={"text-md p-1 my-1 text-center"}>{day.format("D")}</p>
    </header>
    <div className="px-2 h-64 overflow-x-auto">
      { linkComponents }
    </div>
  </div>)
}