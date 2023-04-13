export type CalendarDayEventProps = {
  eventName: string,
  url: string | null,
  category: string
}

export type CalendarDayComponentProps = {
  day: any,
  isFirstWeek: boolean,
  events: Array<CalendarDayEventProps>
}

type LinkProps = {
  text: string,
  url: string,
  category: string
}

const Link = ({ text, url, category }: LinkProps): JSX.Element => {
  return (
    <a href={url} className={ `${getLabelColor(category)} text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300` } target="_blank" rel="noreferrer">
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

export const CalendarDayComponent = ({ day, isFirstWeek, events }: CalendarDayComponentProps): JSX.Element => {
  const linkComponents = events.map((event:CalendarDayEventProps) => {
    return (<div>
      <Link text={ event.eventName } url={ event.url || "" } category={ event.category }></Link>
    </div>)
  })

  const headBgColor = getDateColor(day)

  return (<div className="border border-gray-200 flex flex-col">
    <header className={`flex flex-col items-center ${headBgColor}`}>
      {isFirstWeek && <p className="text-sm mt-1">{day.format("ddd")}</p>}
        <p className={"text-md p-1 my-1 text-center"}>{day.format("DD")}</p>
    </header>
    <div className="p-2">
      { linkComponents }
    </div>
  </div>)
}