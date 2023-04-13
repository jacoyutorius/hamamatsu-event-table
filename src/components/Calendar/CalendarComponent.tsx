import React, { useContext } from "react"
import dayjs from "dayjs"
import { CalendarDayComponent } from "./CalendarDayComponent"
import { EventListContext } from "../../hooks/EventListContext"
import { SelectedMonthContext } from "../../hooks/SelectedMonthContext"

export type CalendarComponentProps = {
  calendar: any[]
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month - 1)
  const lastDay = new Date(year, month, 0)

  let list = []
  let next = firstDay;
  while (next.getTime() !== lastDay.getTime()) {
    list.push(next)
    next = new Date(next.getFullYear(), next.getMonth(), next.getDate() + 1)
  }

  return list
}

function getEventListByDay(eventList:any[], month:string) {
  const curYear = Number(month.substring(0, 4))
  const curMonth = Number(month.substring(4, 6))

  const monthDays = getMonthDays(curYear, curMonth)
  const list: any = {}

  monthDays.forEach((day:any) => {
    const yyyymmdd = dayjs(day).format("YYYY-MM-DD")
    let filtered = eventList.filter((event:any) => event?.StartedOn === yyyymmdd)
    list[yyyymmdd] = filtered
  })

  return list
} 

export const CalendarComponent = ({ calendar }: CalendarComponentProps): JSX.Element => { 
  const { eventList } = useContext(EventListContext)
  const { month } = useContext(SelectedMonthContext)
  
  const ret = getEventListByDay(eventList, month)

  return (<div className="flex flex-1">
    <div className="flex-1 grid grid-cols-1 md:grid-cols-7 grid-rows-6">
      {calendar.map((row:any, i:number) => { 
        return (<React.Fragment key={i}>
          {row.map((day: any, j: number) => {
            const dayYYYYMMDD = day.format("YYYY-MM-DD")
            let events = []
            if (ret[dayYYYYMMDD]) {
              events = ret[dayYYYYMMDD].map((row: any) => {
                return {
                  eventName: row.EventName,
                  url: row.Url,
                  category: row.Category
                }
              })
            }

            return (<CalendarDayComponent
              key={j}
              day={day}
              isFirstWeek={i === 0}
              events={ events } />)
          })}
        </React.Fragment>)
      }) } 
    </div>
  </div>)
}